import { create } from 'zustand'

type State = {
    fontStyleName: fontStyleName
    fontStyle: FontStyleProperties
}
type Actions = {
    update: (fontStyleName: fontStyleName) => void
}
interface FontStyleProperties {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    fontStyle?: string;
    borderLeft?: string;
    borderColor?: string;
    paddingLeft?: string;
}
export type fontStyleName = "title" | "heading" | "subheading" | "body" | "monostyled" | "blockquote"


const fontStylesMap: Record<string, FontStyleProperties> = {
    title: {
        fontSize: 'text-3xl',
        fontWeight: 'font-bold',
        lineHeight: 'leading-tight'
    },
    heading: {
        fontSize: 'text-2xl',
        fontWeight: 'font-semibold',
        lineHeight: 'leading-normal'
    },
    subheading: {
        fontSize: 'text-xl',
        fontWeight: 'font-medium',
        lineHeight: 'leading-relaxed'
    },
    body: {
        fontSize: 'text-base',
        fontWeight: 'font-normal',
        lineHeight: 'leading-normal'
    },
    monostyled: {
        fontSize: 'text-sm',
        fontWeight: 'font-mono',
        lineHeight: 'leading-loose'
    },
    blockquote: {
        fontSize: 'text-lg',
        fontWeight: 'font-light',
        lineHeight: 'leading-loose',
        fontStyle: 'italic',
        borderLeft: 'border-l-4',
        borderColor: 'border-gray-400',
        paddingLeft: 'pl-4'
    },
};
const bodyStyle = fontStylesMap['body'];

export const useFontStyleStore = create<State & Actions>((set) => ({
    fontStyleName: "body",
    fontStyle: bodyStyle,
    update: (style: fontStyleName) => set({ fontStyleName: style, fontStyle: fontStylesMap[style] })
}))
