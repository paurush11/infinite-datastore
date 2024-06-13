import { useOperationStore } from '@/Store/useOperationStore';
import { cn } from '@/lib/utils';
import { ChevronLeft, Cross } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDraw } from './useDraw';
import { Draw, PaintAreaProps } from '@/types/typing';
import { defaultColor } from '@/Store/useTextColorStore';
import { usePaintStore } from '@/Store/usePaintStore';
import { io } from "socket.io-client"
import { drawLine } from './Logic';

export const PaintArea: React.FC<PaintAreaProps> = ({ }) => {
    const { isClear, setIsClear, color, paintWidth } = usePaintStore();
    const operationStore = useOperationStore();
    const socket = io('http://localhost:3001')

    const createLine = ({ prevPoint, currentPoint, ctx }: Draw) => {
        socket.emit("draw-line", ({ prevPoint, currentPoint, color, paintWidth }))
        drawLine({ prevPoint, currentPoint, ctx, color, paintWidth });
    }



    const { canvasRef, onMouseDown, clear } = useDraw(createLine)
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d')

        socket.emit("client-ready")

        socket.on("get-canvas-state", () => {
            if (!canvasRef.current?.toDataURL()) return;
            socket.emit("canvas-state", canvasRef.current.toDataURL())
        })

        socket.on("canvas-state-from-server", (state) => {
            const img = new Image();
            img.src = state;
            img.onload = () => {
                ctx?.drawImage(img, 0, 0);
            }
        })

        socket.on("draw-line", ({ prevPoint, currentPoint, color, paintWidth }) => {
            if (!ctx) return;
            drawLine({ prevPoint, currentPoint, ctx, color, paintWidth });
        })

        socket.on("clear", clear);

        return () => {
            socket.off("get-canvas-state")
            socket.off("canvas-state-from-server")
            socket.off("draw-line")
            socket.off("clear")
        }

    }, [canvasRef])
    useEffect(() => {
        if (isClear === true) {
            socket.emit("clear")
            clear();
            setIsClear();
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