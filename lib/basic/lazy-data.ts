import type { Reactive } from 'vue'
import type { LoggerInterface } from 'zeed'
import { reactive } from 'vue'
import { arrayEmptyInPlace, createArray, Logger } from 'zeed'

const log: LoggerInterface = Logger('lazy-data')

interface Config<T> {
  onFetch: (from: number, length: number) => Promise<T[]>
  chunkSize?: number
  margin?: number
  size?: number
  data?: Reactive<T[]>
}

enum ChunkStatus {
  Loading = 1,
  Loaded,
  Error,
}

export function useLazyData<T>(opt: Config<T>) {
  const { chunkSize = 10, margin = 5, onFetch, size = 0 } = opt

  let iteration = 0
  let dataSize = 0
  const data = opt.data ?? reactive<(T | null)[]>([])
  let chunks: Record<number, ChunkStatus | undefined> = {}

  let currentOffset = 0
  let currentLength = 0

  function setup() {
    iteration++
    arrayEmptyInPlace(data)
    const newData = createArray(dataSize) as (T | null)[]
    data.push(...newData as any)
    chunks = {}
  }

  function setSize(size: number) {
    dataSize = size
    setup()
  }

  if (size > 0)
    setSize(size)

  function setVisible(fromPos: number, length: number) {
    currentOffset = fromPos
    currentLength = length

    const toPos = fromPos + length
    const fromIndex = Math.max(0, fromPos - margin)
    const toIndex = Math.min(dataSize, toPos + margin)
    const fromChunk = Math.floor(fromIndex / chunkSize)
    const toChunk = Math.floor(toIndex / chunkSize)

    let nextChunksToLoad: number[] = []

    function flush() {
      // Make a copy of the chunks to load
      if (nextChunksToLoad.length === 0)
        return
      const loading = [...nextChunksToLoad]
      nextChunksToLoad = []

      const fromIndex = loading[0] * chunkSize
      const itemCount = (loading.at(-1)! - loading[0] + 1) * chunkSize

      const currentIteration = iteration

      onFetch(fromIndex, itemCount).then((values) => {
        log('Loaded', fromIndex, itemCount, values)

        // Still the same context?
        if (iteration !== currentIteration)
          return

        // Apply the values
        loading.forEach(i => chunks[i] = ChunkStatus.Loaded)
        for (let i = 0; i < itemCount; i++) {
          data[fromIndex + i] = values[i] as any
        }
      }).catch((e) => {
        log.error('Failed to load chunks', loading, e)
      })
    }

    for (let i = fromChunk; i <= toChunk; i++) {
      const chunk = chunks[i]
      if (chunk == null) {
        chunks[i] = ChunkStatus.Loading
        nextChunksToLoad.push(i)
      }
      else {
        flush()
      }
    }

    flush()
  }

  function reload() {
    setup()
    setVisible(currentOffset, currentLength)
  }

  return {
    setSize,
    getSize: () => dataSize,
    setVisible,
    reload,
    data,
  }
}
