import AuthUser from '../../hooks/authUser'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import MenuLogado from './menuLogado'
import MenuNotLogado from './menuNotLogado'
import Navigation from './navigation'
import classNames from '../../utils/classsesNames'
import { SignOut, useUser } from '../../hooks/authUser'
import ToggleMode from './toggle-mode'
import { Box, Text, DarkMode, Button, VStack } from '@chakra-ui/react'
import { ToggleNetwork } from "./toggleNetwork"

export default function Header({ mintbaseNetwork, setMintbaseNetwork, openFeed, setOpenFeed }) {


    const { user } = useUser()
    return (
        <Disclosure
            as="nav"
            className="bg-neutral-900 shadow-2xl z-10 opacity-100 sticky top-0 "
        >
            {({ open }) => (
                <>
                    <Box
                        className=" mx-auto px-2 sm:px-6 lg:px-8">
                        <Box className="relative flex items-center justify-between h-16">
                            <Box className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </Box>
                            <Box className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <Box className="flex-shrink-0 flex items-center text-white">
                                    <img
                                        className="h-6 w-auto"
                                        src="https://supabase.com/images/logo-dark.png"
                                        alt="supabase"
                                    />
                                </Box>
                                <Box className="hidden sm:block sm:ml-6">
                                    <DarkMode>
                                        <Box className="flex space-x-4">
                                            <Button
                                                key="feed"
                                                isActive={openFeed}
                                                onClick={() => setOpenFeed(true)}
                                                className={openFeed
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white font-light'
                                                }
                                                aria-current={openFeed ? 'page' : undefined}
                                            >
                                                NFT Feed
                                            </Button>
                                            <Button
                                                key="favos"
                                                isActive={!openFeed}
                                                onClick={() => setOpenFeed(false)}
                                                className={!openFeed
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white font-light'
                                                }
                                                aria-current={!openFeed ? 'page' : undefined}
                                            >
                                                NFT Favos
                                            </Button>
                                            <ToggleNetwork network={mintbaseNetwork} setNetwork={setMintbaseNetwork} />
                                            <Box>
                                                <Text className="mt-2 text-slate-100">
                                                    {mintbaseNetwork.network}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </DarkMode>
                                </Box>
                            </Box>
                            <Box className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/** notifications */}

                                {AuthUser() ? <MenuLogado user={user} /> : <MenuNotLogado />}
                                <ToggleMode />
                            </Box>
                        </Box>
                    </Box>

                    <Disclosure.Panel className="sm:hidden">
                        <Box className="px-2 pt-2 pb-3 space-y-1">
                            <VStack>
                                <DarkMode>
                                    <Button
                                        key="feed"
                                        isActive={openFeed}
                                        onClick={() => setOpenFeed(true)}
                                        className={openFeed
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white font-light'
                                        }
                                        aria-current={openFeed ? 'page' : undefined}
                                    >
                                        NFT Feed
                                    </Button>
                                    <Button
                                        key="favos"
                                        isActive={!openFeed}
                                        onClick={() => setOpenFeed(false)}
                                        className={!openFeed
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white font-light'
                                        }
                                        aria-current={!openFeed ? 'page' : undefined}
                                    >
                                        NFT Favos
                                    </Button>
                                    <Box className='flex'>
                                        <ToggleNetwork network={mintbaseNetwork} setNetwork={setMintbaseNetwork} />
                                        <Text className="mt-2 text-slate-100">
                                            {mintbaseNetwork.network}
                                        </Text>
                                    </Box>
                                </DarkMode>
                            </VStack>
                        </Box>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}
