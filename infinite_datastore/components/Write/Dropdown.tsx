import { DropdownProps, TfontSizeAndType } from '@/lib/interfaces';
import { cn } from '@/lib/utils';
import { PaintRoller, Table } from 'lucide-react';
import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import { Button } from '../ui/button';
import { FontColorChanger } from './DropDownToolBar/FontColorChanger';
import { FontSizeChanger, calculateSize } from './DropDownToolBar/FontSizeChanger';
import { FontStyleChanger } from './DropDownToolBar/FontStyleChanger';
import { ListTypeChanger } from './DropDownToolBar/ListTypeChanger';



export const Dropdown: React.FC<DropdownProps> = ({ selectOperationType }) => {
    const [fontStyleOpen, setFontStyleOpen] = useState<boolean>(false)
    const [listTypeOpen, setListTypeOpen] = useState<boolean>(false)
    const [colorPaletteOpen, setColorPaletteOpen] = useState<boolean>(false)
    const [fontSizeOpen, setFontSizeOpen] = useState<boolean>(false)
    const [value, setValue] = useState<boolean>(false)
    const [fontSize, setFontSize] = useState<TfontSizeAndType>(calculateSize(1));


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