import React from 'react'
import { operationTypeKeys } from '../MainContent';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

interface PaintAreaProps {
    selectOperationType: operationTypeKeys
    setSelectOperationType: React.Dispatch<React.SetStateAction<operationTypeKeys>>
}

export const PaintArea: React.FC<PaintAreaProps> = ({ selectOperationType, setSelectOperationType }) => {
    return (
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
    );
}