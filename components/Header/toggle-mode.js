import { IconButton, useColorMode, DarkMode } from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline, } from "react-icons/io5";
import { BsToggleOn, BsToggleOff } from "react-icons/bs"

export function ToggleMode() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <DarkMode>

            <IconButton
                className="ml-1"
                // bg="blueviolet"
                onClick={toggleColorMode}
                aria-label="Toggle"
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                rounded="full"
                variant={"outline"}
            >
                {colorMode === "light" ? <IoSunnyOutline /> : <IoMoonOutline />}
            </IconButton>
        </DarkMode>
    );
}


export function ToggleNetwork({setNetwork, network}) {

    return (
        <DarkMode>

            <IconButton
                className="ml-1"
                // bg="blueviolet"
                onClick={setNetwork((prev) => {
                    prev === "testnet" ? "mainnet" : "testnet"
                })}
                aria-label="ToggleN"
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                rounded="full"
                variant={"outline"}
            >
                {network === "testnet" ? <BsToggleOff /> : <BsToggleOn />}
            </IconButton>
        </DarkMode>
    );
}

