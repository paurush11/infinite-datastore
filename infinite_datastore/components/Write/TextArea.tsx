"use client";

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import React from 'react'
import { operationTypeKeys } from '../MainContent';
import { Button } from '../ui/button';
import { Dropdown } from './Dropdown';

interface TextAreaProps {
    selectOperationType: operationTypeKeys
    setSelectOperationType: React.Dispatch<React.SetStateAction<operationTypeKeys>>
}

export const TextArea: React.FC<TextAreaProps> = ({ selectOperationType, setSelectOperationType }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="flex flex-col bg-slate-300  items-center justify-center" style={{
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
                'flex w-full flex-1 h-full p-10': selectOperationType === "Write",
            },)}>
                <textarea
                    placeholder="Type something..."
                    className='w-full h-full text-2xl caret-black rounded bg-inherit p-3 focus:outline-none '></textarea>
            </div>

            <Dropdown selectOperationType={selectOperationType} />
        </div>
    );
}