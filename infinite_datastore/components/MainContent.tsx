"use client"
import { useOperationStore } from '@/Store/useOperationStore';
import { cn } from '@/lib/utils';
import { operationTypeKeys } from '@/types/typing';
import React, { useState } from 'react';
import { PaintArea } from './Paint/PaintArea';
import { TextArea } from './Write/TextArea';


interface MainContentProps {

}


export const MainContent: React.FC<MainContentProps> = ({ }) => {
    const [selectOperationType, setSelectOperationType] = useState<operationTypeKeys>("Empty");
    const operationStore = useOperationStore();
    return (
        <div className={cn("flex border-white border-2 flex-1 w-auto ml-10 mr-10 mt-5 border-solid", {
            "bg-slate-300": operationStore.operation === "Write",
            "bg-slate-800": operationStore.operation === "Paint"
        })}>
            <TextArea />
            <PaintArea />
        </div>
    );
}