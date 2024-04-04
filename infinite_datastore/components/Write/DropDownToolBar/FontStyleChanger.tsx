import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { CaseSensitive } from "lucide-react"
import { cn } from '@/lib/utils';
import { FontStyleChangerProps } from '@/lib/interfaces';
import { fontStyleName, useFontStyleStore } from '@/Store/useFontStyleStore';


const fontTypes = [
    {
        value: "title",
        label: "Title",
    },
    {
        value: "heading",
        label: "Heading",
    },
    {
        value: "subheading",
        label: "SubHeading",
    },
    {
        value: "body",
        label: "Body",
    },
    {
        value: "monostyled",
        label: "Monostyled",
    },
    {
        value: "blockquote",
        label: "| Block Quote",
    },
]
export const FontStyleChanger: React.FC<FontStyleChangerProps> = ({ fontStyleOpen, setFontStyleOpen }) => {
    const fontStore = useFontStyleStore();
    return (
        <DropdownMenu open={fontStyleOpen} onOpenChange={setFontStyleOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <CaseSensitive className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className=' text-red-500'>Font Types</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {fontTypes && fontTypes.map((type, idx) => {
                        return (
                            <DropdownMenuItem key={idx}
                                onClick={() => fontStore.update(type.value as fontStyleName)}
                                className={cn({
                                    "text-xl": type.value === "heading",
                                    "text-2xl": type.value === "title",
                                    "text-lg": type.value === "subheading",
                                    "text-sm": type.value === "body",
                                    "font-mono": type.value === "monostyled"
                                })} >
                                {type.label}
                            </DropdownMenuItem >
                        )
                    })}
                    <DropdownMenuSeparator />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}