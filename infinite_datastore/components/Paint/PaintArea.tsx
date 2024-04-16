import { useOperationStore } from '@/Store/useOperationStore';
import { cn } from '@/lib/utils';
import { ChevronLeft, Cross } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDraw } from './useDraw';
import { Draw, PaintAreaProps } from '@/types/typing';
import { defaultColor } from '@/Store/useTextColorStore';
import { usePaintStore } from '@/Store/usePaintStore';


export const PaintArea: React.FC<PaintAreaProps> = ({ }) => {
    const [color, setColor] = useState(defaultColor.hex)
    const operationStore = useOperationStore();
    
    const drawLine = ({ prevPoint, currentPoint, ctx }: Draw) => {
        const { x: currX, y: currY } = currentPoint
        const lineColor = color
        const lineWidth = 1

        let startPoint = prevPoint ?? currentPoint
        ctx.beginPath()
        ctx.lineWidth = lineWidth

        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(currX, currY)
        ctx.strokeStyle = lineColor
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
        ctx.fill()
    }
    const { isClear, setIsClear } = usePaintStore();

    const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

    useEffect(() => {
        if (isClear === true) {
            clear();
            setIsClear();
            console.log("here")
        }
    }, [isClear])
    return (
        <div className="flex bg-slate-800 items-center justify-center" style={{
            transition: 'flex-grow 0.5s ease',
            flexGrow: (operationStore.operation === "Paint" || operationStore.operation === "Empty") ? 1 : 0,
            height: (operationStore.operation === "Write") ? "5vh" : "auto"
        }}>
            <Button variant={"outline"}
                className={cn({
                    'hidden': operationStore.operation !== "Empty"
                })}
                onClick={() => {
                    operationStore.update("Paint");
                }}>
                Paint
            </Button>
            <Button variant="custom" size="icon"
                className={cn({
                    'hidden': operationStore.operation === "Empty" || operationStore.operation === "Paint"
                })}
                onClick={() => {
                    operationStore.update("Empty");
                }}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="custom" size="icon"
                className={cn({
                    'hidden': operationStore.operation === "Empty" || operationStore.operation === "Write"
                })}
                onClick={() => {

                }}>

            </Button>
            <div className={cn('overflow-hidden', {
                'hidden': operationStore.operation !== "Paint",
                'flex w-full flex̦-1 h-full p-10': operationStore.operation === "Paint",
            },)}>
                <canvas
                    width={'1184'}
                    height={'593'}
                    ref={canvasRef}
                    onMouseDown={onMouseDown}
                    className='bg-slate-50 border border-black rounded-md'
                >

                </canvas>
            </div>
        </div>
    );
}