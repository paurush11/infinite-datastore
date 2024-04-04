"use client";

import { TextAreaProps } from '@/lib/interfaces';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dropdown } from './Dropdown';
import { tailwindClassToPixels, useFontSizeStore } from '@/Store/useFontSizeStore';
import { useFontStyleStore } from '@/Store/useFontStyleStore';
import { useTextColorStore } from '@/Store/useTextColorStore';
import { useOperationStore } from '@/Store/useOperationStore';



export const TextArea: React.FC<TextAreaProps> = ({ }) => {
    const [open, setOpen] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const textareaRef = useRef<HTMLDivElement>(null);
    const getSelectedText = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const selection = window.getSelection();
        if (!selection?.rangeCount) return ''; // No selection made
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        setSelectedText(selectedText);
    };
    const fontSizeStore = useFontSizeStore();
    const fontStyleStore = useFontStyleStore();
    const textColorStore = useTextColorStore();
    const operationStore = useOperationStore();
    const values = Object.values(fontStyleStore.fontStyle);
    const [fontSize, setFontSize] = useState(fontSizeStore.fontSize.fontSize);
    useEffect(() => {
        const numericFontSize = tailwindClassToPixels(fontStyleStore.fontStyle.fontSize);
        setFontSize(numericFontSize)
    }, [fontStyleStore])
    useEffect(() => {
        setFontSize(fontSizeStore.fontSize.fontSize)
    }, [fontSizeStore])

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
                <div
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    ref={textareaRef}
                    onMouseUp={getSelectedText}
                    onKeyUpCapture={getSelectedText}
                    className={cn('w-full h-full caret-black rounded bg-inherit p-3 focus:outline-none ', ...values)}
                    style={{
                        fontSize: fontSize,
                        color: textColorStore.color.hex
                    }}
                >
                    "Type something..."
                </div>
            </div>
        </div>
    );
}