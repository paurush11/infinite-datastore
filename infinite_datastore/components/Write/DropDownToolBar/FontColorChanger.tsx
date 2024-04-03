import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { Palette } from "lucide-react"
import { cn } from '@/lib/utils';
import { ColorResult, SketchPicker } from 'react-color';
import { FontColorChangerProps } from '@/lib/interfaces';


export const FontColorChanger: React.FC<FontColorChangerProps> = ({ color, colorPaletteOpen, setColorPaletteOpen, setColor }) => {
    return (
        <DropdownMenu open={colorPaletteOpen} onOpenChange={setColorPaletteOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <Palette className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className={cn({})} style={{
                    color: color.hex
                }}>Color</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SketchPicker
                            color={color.rgb}
                            onChange={(color: ColorResult, event) => {
                                setColor(color)
                            }}
                        />

                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}