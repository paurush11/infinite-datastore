import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { AArrowUp } from "lucide-react"
import { FontSizeChangerProps, TfontSizeAndType } from '@/lib/interfaces';


const baseFontSize = 14; // Base font size for text-sm
const baseLineHeight = 20; // Base line height for text-sm
const maxTypes = 6;

export const calculateSize = (scale: number): TfontSizeAndType => {
    // Assuming each scale step increases font size by 15% and line height by 10%
    return {
        fontSize: Math.round(baseFontSize * Math.pow(1.15, scale)),
        lineHeight: Math.round(baseLineHeight * Math.pow(1.10, scale))
    };
};

export const FontSizeChanger: React.FC<FontSizeChangerProps> = ({ fontSizeOpen, setFontSizeOpen, fontSize, setFontSize }) => {
    const items = Array.from({ length: maxTypes }, (_, i) => calculateSize(i));
    return (
        <DropdownMenu open={fontSizeOpen} onOpenChange={setFontSizeOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <AArrowUp className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className=' text-red-500'>Font Size</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {
                        items && items.map((val, idx) => {
                            return <DropdownMenuItem key={idx} onClick={()=>{
                                
                            }}>
                                {val.fontSize}
                            </DropdownMenuItem>
                        })

                    }

                    <DropdownMenuSeparator />
                </DropdownMenuGroup>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}