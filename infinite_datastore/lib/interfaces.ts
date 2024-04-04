import { ColorResult, HSLColor, RGBColor } from "react-color"
const operationType = {
    "Write": "WRITE",
    "Paint": "PAINT",
    "Empty": "EMPTY"
} as const;
export type operationTypeKeys = keyof typeof operationType;
export interface TextAreaProps {
}

export interface DropdownProps {
}
export interface PaintAreaProps {

}
export interface FontColorChangerProps {
    colorPaletteOpen: boolean
    setColorPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type TfontSizeAndType = {
    fontSize: number,
    lineHeight: number
}
export interface FontSizeChangerProps {
    fontSizeOpen: boolean
    fontSize: TfontSizeAndType
    setFontSize: React.Dispatch<React.SetStateAction<TfontSizeAndType>>
    setFontSizeOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export interface ListTypeChangerProps {
    listTypeOpen: boolean
    setListTypeOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export interface FontStyleChangerProps {
    fontStyleOpen: boolean
    setFontStyleOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export type Color = string | HSLColor | RGBColor;