import { useFontSizeStore } from '@/Store/useFontSizeStore';
import { useFontStyleStore } from '@/Store/useFontStyleStore';
import { useTextSelectionStore } from '@/Store/useSelectText';
import { useTextColorStore } from '@/Store/useTextColorStore';
import { applyFontStyleToSelectedText, getSelectedText, } from '@/lib/applySelectedStyles';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {

}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ }) => {
    const { setSelectedText, fullTextRange, selectedTextRange, setFullRange, selectedTextFontSize, selectedTextColor, selectedTextFontStyle, isBold, isItalics, resetTextColorChanged, textColorChanged, fontSizeChanged, resetFontSizeChanged } = useTextSelectionStore();
    const textareaRef = useRef<HTMLDivElement>(null);
    const [tempText, setTempText] = useState("Type something...")


    const fontSizeStore = useFontSizeStore();
    const fontStyleStore = useFontStyleStore();
    const textColorStore = useTextColorStore();
    const values = Object.values(fontStyleStore.fontStyle);
    const [fontSize, setFontSize] = useState(fontSizeStore.fontSize.fontSize);
    useEffect(() => {
        applyFontStyleToSelectedText({ fontSize: selectedTextFontSize.fontSize, selectedTextColor, selectedTextFontStyle, selectedTextRange, isItalics, isBold, resetTextColorChanged, resetFontSizeChanged, fontSizeChanged, textColorChanged, textareaRef });
    }, [selectedTextFontSize, selectedTextColor, selectedTextFontStyle, isBold, isItalics])


    return (
        <div
            onClick={() => setTempText("")}
            contentEditable={true}
            suppressContentEditableWarning={true}
            ref={textareaRef}
            onMouseUp={() => getSelectedText(textareaRef, setSelectedText, setFullRange)}
            onKeyUpCapture={() => getSelectedText(textareaRef, setSelectedText, setFullRange)}
            onKeyDownCapture={() => getSelectedText(textareaRef, setSelectedText, setFullRange)}
            onKeyDown={(event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
                    console.log(fullTextRange?.toString())
                    setSelectedText(fullTextRange?.toString() || "", fullTextRange);
                    setFullRange(fullTextRange);
                }
            }}
            className={cn('w-full h-full rounded bg-inherit p-3 focus:outline-none ')}
            style={{

            }}

        >
            {tempText}

        </div>
    );
}
