import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { Palette } from "lucide-react"
import { cn } from '@/lib/utils';
import { ColorResult, SketchPicker } from 'react-color';

import { useTextColorStore } from '@/Store/useTextColorStore';
import { useTextSelectionStore } from '@/Store/useSelectText';
import { FontColorChangerProps } from '@/types/typing';
import { usePaintStore } from '@/Store/usePaintStore';


export const FontColorChanger: React.FC<FontColorChangerProps> = ({ colorPaletteOpen, setColorPaletteOpen, isPaint }) => {
    const colorStore = useTextColorStore()
    const { update } = usePaintStore();
    const { isTextSelected, setSelectedTextColor } = useTextSelectionStore();
    return (
        <DropdownMenu open={colorPaletteOpen} onOpenChange={setColorPaletteOpen}>
            <DropdownMenuTrigger asChild>
                <Button className='p-2 m-4' variant="outline" size="icon" >
                    <Palette className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className={cn({})} style={{
                    color: colorStore.color.hex
                }}>Color</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SketchPicker
                            color={colorStore.color.rgb}
                            onChange={() => { }}
                            onChangeComplete={(color: ColorResult, event) => {
                                if (isPaint) {
                                    update(color);
                                } else {
                                    if (isTextSelected) {
                                        setSelectedTextColor(color);
                                    } else {
                                        colorStore.update(color);
                                    }
                                }

                            }}
                        />

                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}