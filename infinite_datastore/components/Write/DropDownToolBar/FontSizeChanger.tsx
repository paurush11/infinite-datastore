import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { AArrowUp } from "lucide-react"
import { calculateSize, useFontSizeStore } from '@/Store/useFontSizeStore';
import { useTextSelectionStore } from '@/Store/useSelectText';
import { FontSizeChangerProps } from '@/types/typing';


// Base line height for text-sm
const maxTypes = 6;

export const FontSizeChanger: React.FC<FontSizeChangerProps> = ({ fontSizeOpen, setFontSizeOpen, fontSize, setFontSize }) => {
    const items = Array.from({ length: maxTypes }, (_, i) => calculateSize(i));
    const fontStore = useFontSizeStore();
    const { isTextSelected, setSelectedTextFontSize } = useTextSelectionStore();
    return (
        <DropdownMenu open={fontSizeOpen} onOpenChange={setFontSizeOpen}>
            <DropdownMenuTrigger asChild>
                <Button className='p-2 m-4' variant="outline" size="icon" >
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
                                if (isTextSelected) {
                                    setSelectedTextFontSize(val);
                                } else {
                                    fontStore.update(val);
                                }

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

