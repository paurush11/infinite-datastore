"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MainContentProps {

}
const operationType = {
    "Write": "WRITE",
    "Paint": "PAINT",
    "Empty": "EMPTY"
} as const;
type operationTypeKeys = keyof typeof operationType;

export const MainContent: React.FC<MainContentProps> = ({ }) => {
    const [selectOperationType, setSelectOperationType] = useState<operationTypeKeys>("Empty");
    return (
        <div className={cn("flex border-white border-2 flex-1 w-auto ml-10 mr-10 mt-5 border-solid", {
            "bg-slate-300": selectOperationType === "Write",
            "bg-slate-800": selectOperationType === "Paint"
        })}>
            <div className="flex bg-slate-300  items-center justify-center" style={{
                transition: 'flex-grow 0.5s ease',
                flexGrow: (selectOperationType === "Write" || selectOperationType === "Empty") ? 1 : 0,
                height: (selectOperationType === "Paint") ? "5vh" : "auto"
            }}>
                <Button className={cn({
                    'hidden': selectOperationType !== "Empty"
                })}

                    onClick={() => {
                        setSelectOperationType("Write")
                    }}
                >
                    Write
                </Button>
                <Button variant="ghost" size="icon"
                    className={cn({
                        'hidden': selectOperationType === "Empty" || selectOperationType === "Write"
                    })}
                    onClick={() => {
                        setSelectOperationType("Empty")
                    }}>
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <div className={cn('overflow-hidden', {

                    'hidden': selectOperationType !== "Write",
                    'flex flex-1 h-full p-10': selectOperationType === "Write",
                })}>
                    <textarea
                        placeholder="Type something..."
                        className='w-full h-full text-2xl caret-black rounded bg-inherit p-3 focus:outline-none '></textarea>
                </div>
            </div>
            <div className="flex bg-slate-800 items-center justify-center" style={{
                transition: 'flex-grow 0.5s ease',
                flexGrow: (selectOperationType === "Paint" || selectOperationType === "Empty") ? 1 : 0,
                height: (selectOperationType === "Write") ? "5vh" : "auto"
            }}>
                <Button variant={"outline"}
                    className={cn({
                        'hidden': selectOperationType !== "Empty"
                    })}
                    onClick={() => {
                        setSelectOperationType("Paint")
                    }}>
                    Paint
                </Button>
                <Button variant="custom" size="icon"
                    className={cn({
                        'hidden': selectOperationType === "Empty" || selectOperationType === "Paint"
                    })}
                    onClick={() => {
                        setSelectOperationType("Empty")
                    }}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}