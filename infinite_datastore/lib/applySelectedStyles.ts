import { FontStyleProperties } from "@/Store/useFontStyleStore"
import { ColorResult } from "react-color"
import { SpanStyleParser } from "./stylesParser"


type TapplyStyles = {
    fontSize: number | undefined
    isItalics: boolean
    isBold: boolean
    resetTextColorChanged: () => void
    resetFontSizeChanged: () => void
    selectedTextColor: ColorResult | undefined
    fontSizeChanged: boolean
    textColorChanged: boolean
    selectedTextFontStyle: FontStyleProperties
}

type TapplyStylesToSpan = {
    span: HTMLSpanElement
} & TapplyStyles;

export type TapplyFontStyleToSelectedText = {
    fontSize?: number,
    selectedTextFontStyle?: FontStyleProperties,
    selectedTextRange: Range | null
    textareaRef: React.RefObject<HTMLDivElement>
} & TapplyStyles;


const generateSpanId = () => `span-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const getFullTextRange = (textareaRef: React.RefObject<HTMLDivElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return null;
    const range = document.createRange();
    range.selectNodeContents(textarea);
    return range;
};

export const getSelectedText = (textareaRef: React.RefObject<HTMLDivElement>, setSelectedText: (text: string, range: Range | null) => void, setFullRange: (fullTextRange: Range | null) => void) => {
    const fullRange = getFullTextRange(textareaRef);
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
export const applyStylesToSpan = ({ span, fontSize, isItalics, isBold, resetTextColorChanged, resetFontSizeChanged, selectedTextColor, fontSizeChanged, textColorChanged, selectedTextFontStyle }: TapplyStylesToSpan) => {

    if (selectedTextColor && textColorChanged) {
        span.style.color = selectedTextColor.hex
        resetTextColorChanged();
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
    if (fontSize && fontSizeChanged) {
        span.style.fontSize = fontSize + "px";
        resetFontSizeChanged();
    }
}


export const applyFontStyleToSelectedText = (params: TapplyFontStyleToSelectedText) => {
    const { fontSize, selectedTextColor, resetFontSizeChanged, resetTextColorChanged, isBold, isItalics, fontSizeChanged, textColorChanged, selectedTextRange, textareaRef, selectedTextFontStyle } = params;
    if (!selectedTextRange) {
        return;
    }
    var spans = document.getElementsByTagName('span');
    let span = spans[0];
    // let elements = collectElementsInRange(selectedTextRange);
    if (selectedTextRange.commonAncestorContainer.nodeType === Node.ELEMENT_NODE) {
        let parent_span = selectedTextRange.commonAncestorContainer as HTMLSpanElement;

        let styles = parent_span.outerHTML;

        const spanStyleParser = new SpanStyleParser(styles);

        spanStyleParser.displayStyles();
        let start = selectedTextRange.startContainer as ChildNode;
        let end = selectedTextRange.endContainer as ChildNode;

        let start_node = parent_span.firstChild;
        let end_node = parent_span.firstChild;

        parent_span.childNodes.forEach((item) => {
            if (item === start || item.contains(start)) {
                start_node = item;
            }
            if (item === end || item.contains(end)) {
                end_node = item;
            }
        })
        const elements = [];
        if (parent_span && start_node && end_node) {
            let curr_node = start_node;
            let contentString = "";
            const beforeSpan = document.createElement('span');
            beforeSpan.id = generateSpanId();
            const afterSpan = document.createElement('span')
            afterSpan.id = generateSpanId();
            while (curr_node) {
                const node = spanStyleParser.styles.find(node => {
                    return node.node.isEqualNode(curr_node)
                })
                const docSpan = document.createElement('span');
                docSpan.id = generateSpanId();
                if (curr_node === start_node) {
                    beforeSpan.textContent = curr_node.textContent?.slice(0, selectedTextRange.startOffset) || ""
                    beforeSpan.style.cssText = node?.style || "";
                    let stringToTake = curr_node.textContent?.substring(selectedTextRange.startOffset);
                    contentString += stringToTake;
                    docSpan.textContent = stringToTake || ""

                    docSpan.style.cssText = node?.style || "";
                    applyStylesToSpan({ span: docSpan, fontSize, isItalics, isBold, resetTextColorChanged, resetFontSizeChanged, selectedTextColor, fontSizeChanged, textColorChanged, selectedTextFontStyle })
                    elements.push(docSpan);
                } else if (curr_node === end_node) {
                    afterSpan.textContent = curr_node.textContent?.substring(selectedTextRange.endOffset) || ""
                    afterSpan.style.cssText = node?.style || "";
                    let stringToTake = curr_node.textContent?.slice(0, selectedTextRange.endOffset);
                    contentString += stringToTake;
                    docSpan.textContent = stringToTake || ""
                    docSpan.style.cssText = node?.style || "";
                    applyStylesToSpan({ span: docSpan, fontSize, isItalics, isBold, resetTextColorChanged, resetFontSizeChanged, selectedTextColor, fontSizeChanged, textColorChanged, selectedTextFontStyle })
                    elements.push(docSpan);
                    break; // Stop the loop after processing the end node
                } else {
                    contentString += curr_node.textContent;
                    docSpan.textContent = curr_node.textContent || ""
                    docSpan.style.cssText = node?.style || "";
                    applyStylesToSpan({ span: docSpan, fontSize, isItalics, isBold, resetTextColorChanged, resetFontSizeChanged, selectedTextColor, fontSizeChanged, textColorChanged, selectedTextFontStyle })
                    elements.push(docSpan);
                }
                curr_node = curr_node.nextSibling as ChildNode;
            }


            selectedTextRange.deleteContents();
            elements.reverse().forEach(ele => {
                selectedTextRange.insertNode(ele);
            })
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                const newRange = document.createRange();
                newRange.selectNodeContents(span);
                selection.addRange(newRange);
            }
        }
    } else {
        span = document.createElement('span');
        span.id = generateSpanId();
        applyStylesToSpan({ span, fontSize, isItalics, isBold, resetTextColorChanged, resetFontSizeChanged, selectedTextColor, fontSizeChanged, textColorChanged, selectedTextFontStyle })
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
}
