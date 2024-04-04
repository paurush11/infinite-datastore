import { TfontSizeAndType } from '@/lib/interfaces'
import { create } from 'zustand'

type State = {
    fontSize: TfontSizeAndType
}
type Actions = {
    update: (size: TfontSizeAndType) => void
}
const baseFontSize = 14; // Base font size for text-sm
const baseLineHeight = 20;
const fontSizeMap: Record<string, number> = {
    'text-xs': 12,
    'text-sm': 14,
    'text-base': 16,
    'text-lg': 18,
    'text-xl': 20,
    'text-2xl': 24,
    'text-3xl': 30,
};
const lineHeightMap : Record<string, number> = {

}

// Function to convert a Tailwind font size class to its numeric value
export function tailwindClassToPixels(tailwindClass: string): number {
    return fontSizeMap[tailwindClass] || baseFontSize; // default to baseFontSize if class not found
}



export const calculateSize = (scale: number): TfontSizeAndType => {
    // Assuming each scale step increases font size by 15% and line height by 10%
    return {
        fontSize: Math.round(baseFontSize * Math.pow(1.15, scale)),
        lineHeight: Math.round(baseLineHeight * Math.pow(1.10, scale))
    };
};
export const defaultSize = calculateSize(1);
export const useFontSizeStore = create<State & Actions>((set) => ({
    fontSize: defaultSize,
    update: (size: TfontSizeAndType) => set({ fontSize: size })
}))
