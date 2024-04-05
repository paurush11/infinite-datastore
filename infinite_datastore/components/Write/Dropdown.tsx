import { defaultSize } from '@/Store/useFontSizeStore';
import { useOperationStore } from '@/Store/useOperationStore';
import { useTextSelectionStore } from '@/Store/useSelectText';
import { DropdownProps, TfontSizeAndType } from '@/lib/interfaces';
import { cn } from '@/lib/utils';
import { Bold, Italic, PaintRoller, Table } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FontColorChanger } from './DropDownToolBar/FontColorChanger';
import { FontSizeChanger } from './DropDownToolBar/FontSizeChanger';
import { FontStyleChanger } from './DropDownToolBar/FontStyleChanger';
import { ListTypeChanger } from './DropDownToolBar/ListTypeChanger';



export const Dropdown: React.FC<DropdownProps> = ({ }) => {
    const [fontStyleOpen, setFontStyleOpen] = useState<boolean>(false)
    const [listTypeOpen, setListTypeOpen] = useState<boolean>(false)
    const [colorPaletteOpen, setColorPaletteOpen] = useState<boolean>(false)
    const [fontSizeOpen, setFontSizeOpen] = useState<boolean>(false)
    const [value, setValue] = useState<boolean>(false)
    const [boldValue, setBoldValue] = useState<boolean>(false)
    const [italicsValue, setItalicsValue] = useState<boolean>(false)
    const [fontSize, setFontSize] = useState<TfontSizeAndType>(defaultSize);
    const operationStore = useOperationStore();
    const { isTextSelected, setSelectedTextFontStyle, setIsBold, setIsItalics } = useTextSelectionStore()
    return (
        <div className={cn("flex h-10 rounded-lg items-center p-8 m-10 space-x-2", {
            'hidden': operationStore.operation !== "Write",
        })}

        >
            <FontStyleChanger fontStyleOpen={fontStyleOpen} setFontStyleOpen={setFontStyleOpen}></FontStyleChanger>
            <ListTypeChanger setListTypeOpen={setListTypeOpen} listTypeOpen={listTypeOpen}></ListTypeChanger>
            <Button className='p-2 m-4' variant="outline" size="icon" >
                <Table className="h-4 w-4" />
            </Button>
            <FontColorChanger colorPaletteOpen={colorPaletteOpen} setColorPaletteOpen={setColorPaletteOpen} ></FontColorChanger>
            <Button className='p-2 m-4' variant={value ? "custom" : "outline"} onClick={() => setValue(!value)} size="icon" >
                <PaintRoller className="h-4 w-4" />
            </Button>
            <Button className='p-2 m-4' variant={italicsValue ? "custom" : "outline"} onClick={() => {
                if (isTextSelected) {
                    setIsItalics()
                    setItalicsValue(!italicsValue);
                } else {
                    if (italicsValue) setItalicsValue(!italicsValue);
                }

            }} size="icon" >
                <Italic className="h-4 w-4" />
            </Button>
            <Button className='p-2 m-4' variant={boldValue ? "custom" : "outline"} onClick={() => {
                if (isTextSelected) {
                    setIsBold()
                    setBoldValue(!boldValue);
                } else {
                    if (boldValue) {
                        setBoldValue(!boldValue);
                    }
                }


            }} size="icon" >
                <Bold className="h-4 w-4" />
            </Button>
            <FontSizeChanger setFontSize={setFontSize} fontSize={fontSize} setFontSizeOpen={setFontSizeOpen} fontSizeOpen={fontSizeOpen} />

        </div>
    );
}