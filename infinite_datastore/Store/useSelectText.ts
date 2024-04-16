import { TfontSizeAndType } from '@/types/typing'
import { create } from 'zustand'
import { defaultSize } from './useFontSizeStore'
import { FontStyleProperties, bodyStyle } from './useFontStyleStore'
import { ColorResult } from 'react-color'
import { defaultColor } from './useTextColorStore'
type State = {
    selectedText: string
    selectedTextRange: Range | null
    isTextSelected: boolean
    fullTextRange: Range | null
    selectedTextFontSize: TfontSizeAndType
    selectedTextFontStyle: FontStyleProperties
    selectedTextColor: ColorResult
    isBold: boolean
    isItalics: boolean
    textColorChanged: boolean
    fontSizeChanged: boolean
}
type Actions = {
    setSelectedText: (text: string, range: Range | null) => void;
    setFullRange: (fullTextRange: Range | null) => void
    setSelectedTextFontSize: (selectedTextFontSize: TfontSizeAndType) => void
    setSelectedTextFontStyle: (selectedTextFontStyle: FontStyleProperties) => void
    setSelectedTextColor: (selectedTextColor: ColorResult) => void
    setIsBold: () => void
    setIsItalics: () => void
    resetTextColorChanged: () => void;
    resetFontSizeChanged: () => void;
}

export const useTextSelectionStore = create<State & Actions>((set) => ({
    selectedTextColor: defaultColor,
    selectedTextFontStyle: bodyStyle,
    selectedTextFontSize: defaultSize,
    fullTextRange: null,
    selectedText: '',
    isBold: false,
    isItalics: false,
    textColorChanged: false,
    selectedTextRange: null,
    isTextSelected: false,
    fontSizeChanged: false,
    setSelectedText: (text, range) =>
        set({
            selectedText: text,
            selectedTextRange: range,
            isTextSelected: text.length > 0
        }),
    setFullRange: (fullTextRange: Range | null) => set({ fullTextRange: fullTextRange }),
    setSelectedTextFontSize: (selectedTextFontSize: TfontSizeAndType) => set({ selectedTextFontSize: selectedTextFontSize, fontSizeChanged: true }),
    setSelectedTextFontStyle: (selectedTextFontStyle: FontStyleProperties) => set({ selectedTextFontStyle: selectedTextFontStyle }),
    setSelectedTextColor: (selectedTextColor: ColorResult) => set({ selectedTextColor: selectedTextColor, textColorChanged: true }),
    setIsBold: () => set((state) => ({ isBold: !state.isBold })),
    setIsItalics: () => set((state) => ({ isItalics: !state.isItalics })),
    resetTextColorChanged: () => set({ textColorChanged: false }),
    resetFontSizeChanged: () => set({ fontSizeChanged: false })
}));