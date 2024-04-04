import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { AArrowUp } from "lucide-react"
import { FontSizeChangerProps } from '@/lib/interfaces';
import { calculateSize, useFontSizeStore } from '@/Store/useFontSizeStore';


// Base line height for text-sm
const maxTypes = 6;

export const FontSizeChanger: React.FC<FontSizeChangerProps> = ({ fontSizeOpen, setFontSizeOpen, fontSize, setFontSize }) => {
    const items = Array.from({ length: maxTypes }, (_, i) => calculateSize(i));
    const fontStore = useFontSizeStore();
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
                            return <DropdownMenuItem key={idx} onClick={() => {
                                fontStore.update(val);
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

