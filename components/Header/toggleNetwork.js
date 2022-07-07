import { IconButton, DarkMode, Text, Box } from '@chakra-ui/react'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'

export function ToggleNetwork({ setNetwork, network }) {
    console.log('NETWORQ : ', network)

    function onToggle() {
        const newN = network.network === 'testnet' ? 'mainnet' : 'testnet'
        setNetwork(newN)
    }

    return (
        <DarkMode>
            <Box className="flex">
                <IconButton
                    className="ml-1"
                    // bg="blueviolet"
                    onClick={onToggle}
                    aria-label="ToggleN"
                    _hover={{ bg: 'none' }}
                    _active={{ bg: 'none' }}
                    rounded="full"
                    variant={'outline'}
                >
                    {network.network === 'testnet' ? <BsToggleOff /> : <BsToggleOn />}
                </IconButton>
            </Box>
        </DarkMode>
    )
}
