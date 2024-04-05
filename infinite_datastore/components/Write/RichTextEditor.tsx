import { defaultSize, tailwindClassToPixels, useFontSizeStore } from '@/Store/useFontSizeStore';
import { FontStyleProperties, bodyStyle, useFontStyleStore } from '@/Store/useFontStyleStore';
import { useTextSelectionStore } from '@/Store/useSelectText';
import { defaultColor, useTextColorStore } from '@/Store/useTextColorStore';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'
import { ColorResult } from 'react-color';

interface RichTextEditorProps {

}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ }) => {
    const { setSelectedText, selectedText, isTextSelected, selectedTextRange, setFullRange, selectedTextFontSize, selectedTextColor, selectedTextFontStyle, setSelectedTextColor, setSelectedTextFontSize, setSelectedTextFontStyle, isBold, isItalics } = useTextSelectionStore();
    const textareaRef = useRef<HTMLDivElement>(null);
    const [tempText, setTempText] = useState("Type something...")
    const getFullTextRange = () => {
        const textarea = textareaRef.current;
        if (!textarea) return null;
        const range = document.createRange();
        range.selectNodeContents(textarea);
        return range;
    };
    const getSelectedText = () => {
        const fullRange = getFullTextRange();
        const textarea = textareaRef.current;
        if (!textarea) return;

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            setSelectedText('', null);
            return; // No selection made
        }

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const fullText = fullRange?.toString() || '';

        // Get the non-selected text by subtracting the selected text from the full text
        const startOfSelection = fullText.indexOf(selectedText);
        const endOfSelection = startOfSelection + selectedText.length;

        const nonSelectedTextBefore = fullText.substring(0, startOfSelection);
        const nonSelectedTextAfter = fullText.substring(endOfSelection);

        setSelectedText(selectedText, range);
        setFullRange(fullRange);

    };
    const applyFontStyleToSelectedText = (fontSize?: number, selectedTextColor?: ColorResult, selectedTextFontStyle?: FontStyleProperties) => {
        if (!selectedTextRange) {
            return;
        }
        const span = document.createElement('span');
        /// Apply Styles


        if (fontSize) {
            span.style.fontSize = fontSize + "px";

        }
        if (selectedTextColor) {
            span.style.color = selectedTextColor.hex

        }
        if (selectedTextFontStyle) {
            span.style.borderColor = selectedTextFontStyle.borderColor || 'black';
            span.style.fontSize = selectedTextFontStyle.fontSize
            if (selectedTextFontStyle.fontWeight) {
                span.style.fontWeight = selectedTextFontStyle.fontWeight || "0"
            }
            span.style.fontWeight = selectedTextFontStyle.lineHeight
            span.style.paddingLeft = selectedTextFontStyle.paddingLeft || '0px';
            if (selectedTextFontStyle.fontStyle) {
                span.style.fontStyle = selectedTextFontStyle.fontStyle
            }
            span.style.borderLeft = selectedTextFontStyle.borderLeft || "0px";

        }
        if (isBold) {
            span.style.fontWeight = "bold"
        } else {
            span.style.fontWeight = "normal"
        }

        if (isItalics) {
            span.style.fontStyle = "italic"
            console.log(span.style.fontStyle)
        } else {
            span.style.fontStyle = "none"
        }



        ///After Applying Styles set them back to default ? 
        span.textContent = selectedTextRange.toString();
        const selection = window.getSelection();
        if (selection) {
            selectedTextRange.deleteContents();
            selectedTextRange.insertNode(span);
            selection.removeAllRanges();
            const newRange = document.createRange();
            newRange.selectNodeContents(span);
            selection.addRange(newRange);
        }
    }
    const fontSizeStore = useFontSizeStore();
    const fontStyleStore = useFontStyleStore();
    const textColorStore = useTextColorStore();
    const values = Object.values(fontStyleStore.fontStyle);
    const [fontSize, setFontSize] = useState(fontSizeStore.fontSize.fontSize);
    useEffect(() => {
        applyFontStyleToSelectedText(selectedTextFontSize.fontSize, selectedTextColor, selectedTextFontStyle);
    }, [selectedTextFontSize, selectedTextColor, selectedTextFontStyle, isBold, isItalics])


    return (
        <div
            onClick={() => setTempText("")}
            contentEditable={true}
            suppressContentEditableWarning={true}
            ref={textareaRef}
            onMouseUp={getSelectedText}
            onKeyUpCapture={getSelectedText}
            className={cn('w-full h-full  caret-black rounded bg-inherit p-3 focus:outline-none ', ...values)}
            style={{
                fontSize: fontSize,
                color: textColorStore.color.hex,

            }}

        >
            {tempText}

        </div>
    );
}