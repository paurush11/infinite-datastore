import { ColorResult, HSLColor, RGBColor } from "react-color"
const operationType = {
    "Write": "WRITE",
    "Paint": "PAINT",
    "Empty": "EMPTY"
} as const;
type operationTypeKeys = keyof typeof operationType;
type TextAreaProps = {
}
type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
}
type Point = { x: number; y: number }
type DropdownProps = {
}
type PaintAreaProps = {

}
type FontColorChangerProps = {
    colorPaletteOpen: boolean
    setColorPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type TfontSizeAndType = {
    fontSize: number,
    lineHeight: number
}
type FontSizeChangerProps = {
    fontSizeOpen: boolean
    fontSize: TfontSizeAndType
    setFontSize: React.Dispatch<React.SetStateAction<TfontSizeAndType>>
    setFontSizeOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type ListTypeChangerProps = {
    listTypeOpen: boolean
    setListTypeOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type FontStyleChangerProps = {
    fontStyleOpen: boolean
    setFontStyleOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type Color = string | HSLColor | RGBColor;