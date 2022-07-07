import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/outline'
import classNames from '../../utils/classsesNames'
import { SignOut } from '../../hooks/authUser'
import { Box, Text, DarkMode, Avatar } from '@chakra-ui/react'
import { supabase } from '../../utils/initSupabase'
import { useSelector, useDispatch } from 'react-redux'

const MenuLogado = ({ user, handleLogout }) => {

    // const store = useSelector((state) => state.user)
    // const user = store.user

    useEffect(() => {
        async function updateUsername() {
            // console.log("Upadte User name: ", user.user_metadata.full_name)
            const { data, error } = await supabase
                .from('users')
                .update({ full_name: user.user_metadata?.full_name })
                .eq('id', user.id)

            if (error) {
                console.log('SupaError: ', error)
            }
        }

        if (user.user_metadata?.full_name) {
            updateUsername()
        }
    }, [user, supabase])

    return (
        <Menu as="div" className="ml-3 relative">
            {({ open }) => (
                <Box>
                    <Box className="flex">
                        <DarkMode>
                            <Text className="mr-3 mt-0.5 color-white text-slate-50 decoration-4">
                                {user.user_metadata.full_name || 'AngryPanda'}
                            </Text>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                {user.avatar ?
                                    <Avatar
                                        h={8}
                                        w={8}
                                        src={user.avatar}
                                        borderColor='slateblue'
                                        showBorder={true}
                                    />
                                    : <UserCircleIcon className="h-8 w-8 text-white" />
                            }
                            </Menu.Button>
                        </DarkMode>
                    </Box>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        // href="/profile"
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        Your Profile
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/#"
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        Settings
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/#"
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        <button onClick={handleLogout}>Sign out</button>
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Box>
            )}
        </Menu>
    )
}

export default MenuLogado
