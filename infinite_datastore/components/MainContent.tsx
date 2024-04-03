"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PaintArea } from './Paint/PaintArea';
import { TextArea } from './Write/TextArea';
import { operationTypeKeys } from '@/lib/interfaces';


interface MainContentProps {

}


export const MainContent: React.FC<MainContentProps> = ({ }) => {
    const [selectOperationType, setSelectOperationType] = useState<operationTypeKeys>("Empty");
    return (
        <div className={cn("flex border-white border-2 flex-1 w-auto ml-10 mr-10 mt-5 border-solid", {
            "bg-slate-300": selectOperationType === "Write",
            "bg-slate-800": selectOperationType === "Paint"
        })}>

            <TextArea selectOperationType={selectOperationType} setSelectOperationType={setSelectOperationType} />
            <PaintArea selectOperationType={selectOperationType} setSelectOperationType={setSelectOperationType} />
        </div>
    );
}