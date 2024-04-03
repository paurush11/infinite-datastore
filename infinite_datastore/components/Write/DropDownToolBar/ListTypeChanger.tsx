import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react'
import { ListChecks } from "lucide-react"
import { cn } from '@/lib/utils';
import { ListTypeChangerProps } from '@/lib/interfaces';


const listypes = [
    {
        value: "numbered",
        label: "1. Numbered",
    },
    {
        value: "bulleted",
        label: "• Bulleted",
    },
    {
        value: "dashed",
        label: "- Dashed",
    },
    {
        value: "star",
        label: "* Star",
    },
]
export const ListTypeChanger: React.FC<ListTypeChangerProps> = ({ listTypeOpen, setListTypeOpen }) => {
    return (
        <DropdownMenu open={listTypeOpen} onOpenChange={setListTypeOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" >
                    <ListChecks className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className=' text-red-500'>List Types</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {listypes && listypes.map((type, idx) => {
                        return (
                            <DropdownMenuItem key={idx} className={cn({
                            })} >
                                {type.label}
                            </DropdownMenuItem >
                        )
                    })}
                    <DropdownMenuSeparator />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>);
}