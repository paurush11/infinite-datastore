import { create } from 'zustand'

type State = {
    fontStyleName: fontStyleName
    fontStyle: FontStyleProperties
}
type Actions = {
    update: (fontStyleName: fontStyleName) => void
}
export interface FontStyleProperties {
    fontSize: string;
    fontWeight?: string;
    lineHeight: string;
    fontStyle?: string;
    borderLeft?: string;
    borderColor?: string;
    paddingLeft?: string;
    fontFamily?: string
}
export type fontStyleName = "title" | "heading" | "subheading" | "body" | "monostyled" | "blockquote"


export const fontStylesMap: Record<string, FontStyleProperties> = {
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

export const fontStylesCssMap: Record<string, FontStyleProperties> = {
    title: {
        fontSize: '1.875rem',
        fontWeight: '700',
        lineHeight: '1.25',
        fontStyle: 'normal',
        borderLeft: 'none',
        borderColor: 'inherit',
        paddingLeft: '0',
        fontFamily: 'inherit'
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: '600',
        lineHeight: '1.5',
        fontStyle: 'normal',
        borderLeft: 'none',
        borderColor: 'inherit',
        paddingLeft: '0',
        fontFamily: 'inherit'
    },
    subheading: {
        fontSize: '1.25rem',
        fontWeight: '500',
        lineHeight: '1.75',
        fontStyle: 'normal',
        borderLeft: 'none',
        borderColor: 'inherit',
        paddingLeft: '0',
        fontFamily: 'inherit'
    },
    body: {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5',
        fontStyle: 'normal',
        borderLeft: 'none',
        borderColor: 'inherit',
        paddingLeft: '0',
        fontFamily: 'inherit'
    },
    monostyled: {
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.75',
        fontStyle: 'normal',
        borderLeft: 'none',
        borderColor: 'inherit',
        paddingLeft: '0',
        fontFamily: 'monospace'
    },
    blockquote: {
        fontSize: '1.125rem',
        fontWeight: '300',
        lineHeight: '1.75',
        fontStyle: 'italic',
        borderLeft: '4px solid gray',
        borderColor: 'gray',
        paddingLeft: '1rem',
        fontFamily: 'inherit'
    }
};

export const bodyStyle = fontStylesMap['body'];

export const useFontStyleStore = create<State & Actions>((set) => ({
    fontStyleName: "body",
    fontStyle: bodyStyle,
    update: (style: fontStyleName) => set({ fontStyleName: style, fontStyle: fontStylesMap[style] })
}))
