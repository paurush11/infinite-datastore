import { defaultSize } from '@/Store/useFontSizeStore';
import { useOperationStore } from '@/Store/useOperationStore';
import { useTextSelectionStore } from '@/Store/useSelectText';
import { cn } from '@/lib/utils';
import { Bold, Cross, Italic, PaintRoller, Table } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FontColorChanger } from './DropDownToolBar/FontColorChanger';
import { FontSizeChanger } from './DropDownToolBar/FontSizeChanger';
import { FontStyleChanger } from './DropDownToolBar/FontStyleChanger';
import { ListTypeChanger } from './DropDownToolBar/ListTypeChanger';
import { DropdownProps, TfontSizeAndType } from '@/types/typing';
import { usePaintStore } from '@/Store/usePaintStore';
import { PaintWidthChanger } from './DropDownToolBar/PaintWidthChanger';



export const Dropdown: React.FC<DropdownProps> = ({ }) => {
    const [fontStyleOpen, setFontStyleOpen] = useState<boolean>(false)
    const [listTypeOpen, setListTypeOpen] = useState<boolean>(false)
    const [colorPaletteOpen, setColorPaletteOpen] = useState<boolean>(false)
    const [paintWidthOpen, setPaintWidthOpen] = useState<boolean>(false)
    const [colorPaletteOpenPaint, setColorPaletteOpenPaint] = useState<boolean>(false)
    const [fontSizeOpen, setFontSizeOpen] = useState<boolean>(false)
    const [value, setValue] = useState<boolean>(false)
    const [fontSize, setFontSize] = useState<TfontSizeAndType>(defaultSize);
    const operationStore = useOperationStore();
    const { isClear, setIsClear } = usePaintStore();
    const { setIsBold, setIsItalics, isBold, isItalics } = useTextSelectionStore()
    return (
        <>
            <div className={cn("flex h-10 rounded-lg items-center p-8 m-10 space-x-2", {
                'hidden': operationStore.operation !== "Write",
            })}

            >
                <FontStyleChanger fontStyleOpen={fontStyleOpen} setFontStyleOpen={setFontStyleOpen}></FontStyleChanger>
                <ListTypeChanger setListTypeOpen={setListTypeOpen} listTypeOpen={listTypeOpen}></ListTypeChanger>
                <Button className='p-2 m-4' variant="outline" size="icon" >
                    <Table className="h-4 w-4" />
                </Button>
                <FontColorChanger isPaint={false} colorPaletteOpen={colorPaletteOpen} setColorPaletteOpen={setColorPaletteOpen} ></FontColorChanger>
                <Button className='p-2 m-4' variant={value ? "custom" : "outline"} onClick={() => setValue(!value)} size="icon" >
                    <PaintRoller className="h-4 w-4" />
                </Button>
                <Button className='p-2 m-4' variant={isItalics ? "custom" : "outline"} onClick={() => {
                    setIsItalics()
                }} size="icon" >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button className='p-2 m-4' variant={isBold ? "custom" : "outline"} onClick={() => {
                    setIsBold()
                }} size="icon" >
                    <Bold className="h-4 w-4" />
                </Button>
                <FontSizeChanger setFontSize={setFontSize} fontSize={fontSize} setFontSizeOpen={setFontSizeOpen} fontSizeOpen={fontSizeOpen} />

            </div>

            <div className={cn("flex h-10 rounded-lg items-center p-8 m-10 space-x-2", {
                'hidden': operationStore.operation !== "Paint",
            })}
            >

                <Button className='p-2 m-4' variant={isClear ? "custom" : "outline"} onClick={() => {
                    setIsClear()
                }} size="icon" >
                    <Cross className="h-4 w-4" />
                </Button>
                <FontColorChanger isPaint={true} colorPaletteOpen={colorPaletteOpenPaint} setColorPaletteOpen={setColorPaletteOpenPaint} ></FontColorChanger>
                <PaintWidthChanger setPaintWidthOpen={setPaintWidthOpen} paintWidthOpen={paintWidthOpen}></PaintWidthChanger>
            </div>
        </>


    );
}