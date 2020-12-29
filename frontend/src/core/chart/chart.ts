type Width = { width: number }
type Height = { height: number }

type PaddingLeft = { paddingLeft: number }
type PaddingRight = { paddingRight: number }
type PaddingTop = { paddingTop: number }
type PaddingBottom = { paddingBottom: number }
export type Padding = {
  top: number
  left: number
  bottom: number
  right: number
}
export type ViewBox = {
  x: number
  y: number
} & Width &
  Height

export const DEFAULT_VIEW_BOX: ViewBox = {
  x: 0,
  y: 0,
  width: 1140,
  height: 640,
}
export const DEFAULT_PADDING: Padding = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
}
export const viewBox = (
  params?: Partial<ViewBox>
): ViewBox & { toString: () => string } => {
  const { x, y, width, height } = { ...DEFAULT_VIEW_BOX, ...params }

  const toString = (): string => `${x} ${y} ${width} ${height}`
  return {
    x,
    y,
    width,
    height,
    toString,
  }
}

type ChartWidth = Width & PaddingLeft & PaddingRight
type ChartHeight = Height & PaddingTop & PaddingBottom
export const chartWidth = ({
  width,
  paddingLeft,
  paddingRight,
}: ChartWidth): number => width - (paddingLeft + paddingRight) / 2

export const chartHeight = ({
  height,
  paddingBottom,
  paddingTop,
}: ChartHeight): number => height - (paddingTop + paddingBottom) / 2
