import React from 'react'
import AuthUser from '../../hooks/authUser'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import MenuLogado from './menuLogado'
import MenuNotLogado from './menuNotLogado'
import Navigation from './navigation'
import classNames from '../../utils/classsesNames'
import { SignOut, useUser } from '../../hooks/authUser'
import ToggleMode from './toggle-mode'
import { Box, useColorModeValue, DarkMode } from '@chakra-ui/react'

export default function Header() {

    const bg = useColorModeValue("#1a365d", "#2a69ac");
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
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                        <Box className="flex space-x-4">
                                            {Navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </Box>
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
                                {Navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </Box>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
    )
}
