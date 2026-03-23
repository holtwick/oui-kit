# oui-log

Renders log output from a [`zeed`](https://github.com/holtwick/zeed) `useLog` logger in a scrollable table view. Useful for in-app debugging and development.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `log` | `LogOui` | *(required)* | The log object created with `useLog()` from `zeed`. |
| `showTime` | `boolean` | `true` | Show the timestamp column. |
| `showTag` | `boolean` | `true` | Show the logger tag/name column. |

## Usage

```ts
import { useLog } from 'zeed'
import { setupOuiLog } from 'oui-kit'

const log = useLog('my-module')

// Connect the log to OuiLog
setupOuiLog(log)

log('Hello from oui-log')
log.warn('Something looks off')
```

```vue
<OuiLog :log="log" :show-time="true" :show-tag="false" />
```

## Notes

- Uses `OuiTableview` internally – notes about that component apply here too.
- Log entries are colour-coded by level (info, warn, error, debug).
- Hex dump is rendered for `Uint8Array` / `ArrayBuffer` values.
