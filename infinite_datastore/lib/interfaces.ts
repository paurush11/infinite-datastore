import { ColorResult, HSLColor, RGBColor } from "react-color"
const operationType = {
    "Write": "WRITE",
    "Paint": "PAINT",
    "Empty": "EMPTY"
} as const;
export type operationTypeKeys = keyof typeof operationType;
export interface TextAreaProps {
    selectOperationType: operationTypeKeys
    setSelectOperationType: React.Dispatch<React.SetStateAction<operationTypeKeys>>
}

export interface DropdownProps {
    selectOperationType: operationTypeKeys
}

export interface FontColorChangerProps {
    color: ColorResult
    colorPaletteOpen: boolean
    setColorPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>
    setColor: React.Dispatch<React.SetStateAction<ColorResult>>
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