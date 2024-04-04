import { DropdownProps, TfontSizeAndType } from '@/lib/interfaces';
import { cn } from '@/lib/utils';
import { PaintRoller, Table } from 'lucide-react';
import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import { Button } from '../ui/button';
import { FontColorChanger } from './DropDownToolBar/FontColorChanger';
import { FontSizeChanger } from './DropDownToolBar/FontSizeChanger';
import { FontStyleChanger } from './DropDownToolBar/FontStyleChanger';
import { ListTypeChanger } from './DropDownToolBar/ListTypeChanger';
import { defaultSize } from '@/Store/useFontSizeStore';
import { defaultColor } from '@/Store/useTextColorStore';
import { useOperationStore } from '@/Store/useOperationStore';



export const Dropdown: React.FC<DropdownProps> = ({ }) => {
    const [fontStyleOpen, setFontStyleOpen] = useState<boolean>(false)
    const [listTypeOpen, setListTypeOpen] = useState<boolean>(false)
    const [colorPaletteOpen, setColorPaletteOpen] = useState<boolean>(false)
    const [fontSizeOpen, setFontSizeOpen] = useState<boolean>(false)
    const [value, setValue] = useState<boolean>(false)
    const [fontSize, setFontSize] = useState<TfontSizeAndType>(defaultSize);
    const [color, setColor] = useState<ColorResult>(defaultColor);
    const operationStore = useOperationStore();
    console.log(operationStore.operation)
    return (
        <div className={cn("flex w-96 h-10  rounded-lg bg-slate-900 items-center p-8 m-10 space-x-4", {
            'hidden': operationStore.operation !== "Write",
        })}>
            <FontStyleChanger fontStyleOpen={fontStyleOpen} setFontStyleOpen={setFontStyleOpen}></FontStyleChanger>
            <ListTypeChanger setListTypeOpen={setListTypeOpen} listTypeOpen={listTypeOpen}></ListTypeChanger>
            <Button variant="outline" size="icon" >
                <Table className="h-4 w-4" />
            </Button>
            <FontColorChanger colorPaletteOpen={colorPaletteOpen} setColorPaletteOpen={setColorPaletteOpen} ></FontColorChanger>
            <Button variant={value ? "custom" : "outline"} onClick={() => setValue(!value)} size="icon" >
                <PaintRoller className="h-4 w-4" />
            </Button>
            <FontSizeChanger setFontSize={setFontSize} fontSize={fontSize} setFontSizeOpen={setFontSizeOpen} fontSizeOpen={fontSizeOpen} />

        </div>
    );
}