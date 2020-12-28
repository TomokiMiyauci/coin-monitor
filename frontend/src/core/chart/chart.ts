type Width = { width: number }
type Height = { height: number }

type PaddingLeft = { paddingLeft: number }
type PaddingRight = { paddingRight: number }
type PaddingTop = { paddingTop: number }
type PaddingBottom = { paddingBottom: number }

type ViewBox = {
  x: number
  y: number
} & Width &
  Height
const DEFAULT_VIEW_BOX: ViewBox = { x: 0, y: 0, width: 300, height: 300 }
export const viewBox = (params?: Partial<ViewBox>): string => {
  const { x, y, width, height } = { ...DEFAULT_VIEW_BOX, ...params }
  return `${x} ${y} ${width} ${height}`
}

type ChartWidth = Width & PaddingLeft & PaddingRight
type ChartHeight = Height & PaddingTop & PaddingBottom
export const chartWidth = ({
  width,
  paddingLeft,
  paddingRight,
}: ChartWidth): number => width - (paddingLeft + paddingRight)

export const chartHeight = ({
  height,
  paddingBottom,
  paddingTop,
}: ChartHeight): number => height - paddingTop - paddingBottom
