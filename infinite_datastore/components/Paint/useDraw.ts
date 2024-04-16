import { Draw, Point } from '@/types/typing';
import { useEffect, useRef, useState } from 'react'
export const useDraw = (onDraw: ({ prevPoint, currentPoint, ctx }: Draw) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mouseDown, setMouseDown] = useState(false)
    const prevPoint = useRef<null | Point>(null)
    const onMouseDown = () => setMouseDown(true)
    const clear = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!mouseDown) return
            const currPoint = getCustomPoints(e)
            const ctx = canvasRef.current?.getContext('2d');

            if (!currPoint || !ctx) return;

            onDraw({ ctx, currentPoint: currPoint, prevPoint: prevPoint.current })
            prevPoint.current = currPoint
        }

        const mouseUpHandler = () => {
            setMouseDown(false)
            prevPoint.current = null
        }
        canvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup', mouseUpHandler)

        return () => {
            canvasRef.current?.removeEventListener('mousemove', handler)
            window.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [onDraw])

    const getCustomPoints = (e: MouseEvent) => {
        let canvas = canvasRef.current;
        if (!canvas) return
        let boundary = canvas.getBoundingClientRect()

        let scaleX = canvas.width / boundary.width; // Calculate the scale factor for X
        let scaleY = canvas.height / boundary.height;
        let x = (e.clientX - boundary.left) * scaleX
        let y = (e.clientY - boundary.top) * scaleY
        return { x, y }
    }

    return {
        canvasRef,
        onMouseDown, clear
    }
}