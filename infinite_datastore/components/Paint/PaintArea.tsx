import { useOperationStore } from '@/Store/useOperationStore';
import { PaintAreaProps } from '@/lib/interfaces';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';


export const PaintArea: React.FC<PaintAreaProps> = ({ }) => {
    const operationStore = useOperationStore();
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
        </div>
    );
}