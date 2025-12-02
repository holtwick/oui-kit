import type { Component } from 'vue'

export interface OuiSliderOption<K> {
  value: K
  title?: string
  icon?: Component | string
  sliderClass?: string
}

export interface OuiTab<K extends string = string> extends OuiSliderOption<K> {
  content?: any
}

export interface OuiSegmentedOption<K = any> extends OuiSliderOption<K> {
}

export type OuiSegmentedOptions<K = any> = OuiSegmentedOption<K>[]

export interface OuiTableColumn<K = string> {
  name: K
  title?: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  valign?: 'top' | 'middle' | 'bottom'
  footer?: string
  width?: number
  minWidth?: number
  maxWidth?: number
  grow?: boolean
}

// interface OuiDraggablePosition {
//   x: number
//   y: number
// }

export interface OuiDraggableEvent {
  // x: number
  // y: number

  startX: number
  startY: number
  pageX: number
  pageY: number
  deltaX: number
  deltaY: number
  moveX: number
  moveY: number
  timeMS: number
  // page: OuiDraggablePosition
  // delta: OuiDraggablePosition
  // pos: OuiDraggablePosition
  // origin: OuiDraggablePosition
}

export interface OuiSelectItem {
  id: string | number

  /** Title to be presented */
  title: string

  /** Text to be considered in search */
  search?: string

  /** Perform this action on selection */
  action?: (title: string) => void

  /** Is not automatically selected, if other possible selections are available */
  skipSelection?: boolean

  /** HTML/CSS class of item */
  class?: string
}
