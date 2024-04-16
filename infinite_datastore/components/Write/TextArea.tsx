import { useOperationStore } from '@/Store/useOperationStore';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { RichTextEditor } from './RichTextEditor';
import { TextAreaProps } from '@/types/typing';


export const TextArea: React.FC<TextAreaProps> = ({ }) => {

    const operationStore = useOperationStore();
    return (
        <div className="flex flex-col bg-slate-300  items-center justify-center" style={{
            transition: 'flex-grow 0.5s ease',
            flexGrow: (operationStore.operation === "Write" || operationStore.operation === "Empty") ? 1 : 0,
            height: (operationStore.operation === "Paint") ? "5vh" : "auto"
        }}>
            <Button className={cn({
                'hidden': operationStore.operation !== "Empty"
            })}
                onClick={() => {
                    operationStore.update("Write");
                }}
            >
                Write
            </Button>
            <Button variant="ghost" size="icon"
                className={cn({
                    'hidden': operationStore.operation === "Empty" || operationStore.operation === "Write"
                })}
                onClick={() => {
                    operationStore.update("Empty");

                }}>
                <ChevronRight className="h-4 w-4" />
            </Button>

            <div className={cn('overflow-hidden', {
                'hidden': operationStore.operation !== "Write",
                'flex w-full flex-1 h-full p-10': operationStore.operation === "Write",
            },)}>
                <RichTextEditor />
            </div>
        </div>
    );
}