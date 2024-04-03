import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { operationTypeKeys } from '../MainContent';
import { Button } from '../ui/button';
import { AArrowUp, CaseSensitive, ListChecks, PaintRoller, Palette, Table } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { HSLColor, RGBColor, ColorResult, SketchPicker, SliderPicker } from 'react-color';
import { FontColorChanger } from './DropDownToolBar/FontColorChanger';
import { ListTypeChanger } from './DropDownToolBar/ListTypeChanger';
import { FontStyleChanger } from './DropDownToolBar/FontStyleChanger';
import { FontSizeChanger, TfontSizeAndType, calculateSize } from './DropDownToolBar/FontSizeChanger';

interface DropdownProps {
    selectOperationType: operationTypeKeys
}



export type Color = string | HSLColor | RGBColor;
export const Dropdown: React.FC<DropdownProps> = ({ selectOperationType }) => {
    const [fontStyleOpen, setFontStyleOpen] = React.useState(false)
    const [listTypeOpen, setListTypeOpen] = React.useState(false)
    const [colorPaletteOpen, setColorPaletteOpen] = React.useState(false)
    const [fontSizeOpen, setFontSizeOpen] = React.useState(false)
    const [value, setValue] = React.useState(false)
    const [fontSize, setFontSize] = React.useState<TfontSizeAndType>(calculateSize(1));


    const [color, setColor] = useState<ColorResult>({
        hex: '#000000',
        rgb: { r: 255, g: 255, b: 255, a: 1 },
        hsl: { h: 0, s: 0, l: 1, a: 1 }
    });

    return (
        <div className={cn("flex w-96 h-10  rounded-lg bg-slate-900 items-center p-8 m-10 space-x-4", {
            'hidden': selectOperationType !== "Write",
        })}>
            <FontStyleChanger fontStyleOpen={fontStyleOpen} setFontStyleOpen={setFontStyleOpen}></FontStyleChanger>
            <ListTypeChanger setListTypeOpen={setListTypeOpen} listTypeOpen={listTypeOpen}></ListTypeChanger>
            <Button variant="outline" size="icon" >
                <Table className="h-4 w-4" />
            </Button>
            <FontColorChanger color={color} colorPaletteOpen={colorPaletteOpen} setColorPaletteOpen={setColorPaletteOpen} setColor={setColor}></FontColorChanger>
            <Button variant={value ? "custom" : "outline"} onClick={() => setValue(!value)} size="icon" >
                <PaintRoller className="h-4 w-4" />
            </Button>
            <FontSizeChanger setFontSize={setFontSize} fontSize={fontSize} setFontSizeOpen={setFontSizeOpen} fontSizeOpen={fontSizeOpen} />

        </div>
    );
}