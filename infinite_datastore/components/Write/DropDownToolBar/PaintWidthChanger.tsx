import { usePaintStore } from '@/Store/usePaintStore';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PaintWidthChangerProps } from '@/types/typing';
import { AArrowUp } from 'lucide-react';
import React from 'react'

export const PaintWidthChanger: React.FC<PaintWidthChangerProps> = ({ paintWidthOpen, setPaintWidthOpen }) => {
    const generateBox = (thickness: number) => {
        return <div className="flex bg-black w-full" style={{
            padding: thickness * 1.5,
            height: 3
        }}>
        </div>
    }
    const items = Array.from({ length: 6 }, (_, i) => {
        return generateBox(i);
    })

    const generateBrushSize = (idx: number) => idx !== 0 ? idx * 1.15 : 1;

    const { setPaintWidth } = usePaintStore();
    return (
        <DropdownMenu open={paintWidthOpen} onOpenChange={setPaintWidthOpen}>
            <DropdownMenuTrigger asChild>
                <Button className='p-2 m-4' variant="outline" size="icon" >
                    <AArrowUp className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className=' text-red-500'>Brush Size</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {
                        items && items.map((val, idx) => {
                            return <DropdownMenuItem key={idx} onClick={() => {
                                setPaintWidth(generateBrushSize(idx));
                            }}>
                                {val}
                            </DropdownMenuItem>
                        })

                    }

                    <DropdownMenuSeparator />
                </DropdownMenuGroup>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}