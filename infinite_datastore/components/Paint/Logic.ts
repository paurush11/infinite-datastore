import { Draw } from "@/types/typing"
import { ColorResult } from "react-color"

type DrawLine = Draw & {
    color: ColorResult
    paintWidth: number
}

const drawLine = ({ prevPoint, currentPoint, ctx, color, paintWidth }: DrawLine) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color.hex
    const lineWidth = paintWidth

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth

    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = lineColor
    ctx.stroke()

    ctx.beginPath()
    // ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
}


export { drawLine }