"use client"
import React from 'react'
import { Button } from './ui/button';
import { Dropdown } from './Write/Dropdown';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <div className="flex p-10 space-x-10 items-center h-14 w-full">
            <Button variant={"outline"}>Github</Button>
            <Button variant={"outline"}>Generate Link</Button>
            <Button variant={"outline"}>Modify Link</Button>
            <div className="flex ml-auto w-full" />
            <Dropdown />
            {/* <Dropdown /> // not responsive */}
            <Button variant={"outline"}>Theme</Button>
        </div>
    );
}