import React from 'react'
import { supabase } from '../utils/initSupabase'
import { Auth, Card, Typography, Space } from '@supabase/ui'
import Head from '../components/Head'
import { Box } from '@chakra-ui/react'
import UAuth from '@uauth/js'
import { loginUser, reset } from '../app/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Header from '../components/Header'
import { ethers } from 'ethers'
import { AuthRedirect } from '../hooks/authUser'


// .env from here https://github.com/unstoppabledomains/uauth/blob/main/examples/nextjs/.env
const uauth = new UAuth({
    clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
    scope: 'openid email wallet',
    // redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
})

const AuthPage = () => {
    AuthRedirect()
    const [svgSrc, setSvgSrc] = React.useState('/unstopSvgButtons/default-large.svg')

    // Login with a popup and save the user
    const handleLogin = async () => {

        let user_id
        if (!uauth) {
            return
        }
        await (
            uauth
                .loginWithPopup()
                .then(() => uauth.user()) // .then((value) => dispatch(setUser({user: value}))))
                .catch((error) => console.log(error))
                .finally((value) => { user_id = value }) //dispatch(loginUser({id: value || '🐈‍⬛'})))
        )
        // dispatch(loginUser({ id: user_id }))


        if (window?.ethereum?.selectedAddress) {
            const evm_address = window.ethereum.selectedAddress
            const sign_msg = ethers.utils.hashMessage("AngryPanda")
            const pswd = await (ethereum
                .request({ "jsonrpc": "2.0", "method": "eth_sign", "params": [evm_address, sign_msg], "id": 1 })
                .then((res) => { return res })
                .catch((error) => {
                    console.error(error);
                    return {}
                })
            )
            // check if user exists
            console.log("🚀 ~ file: auth.js ~ line 60 ~ handleLogin ~ pswd", pswd)
            if (pswd) {
                const evm_email = evm_address + '@angrypanda.nft'
                const { data } = await supabase
                    .from('users')
                    .select('id')
                    .eq('email', evm_email)

                if (data.length > 0) {
                    console.log("loggin in to Supabase.")
                    const { user, session, error } = await supabase.auth.signIn({
                        email: evm_email,
                        password: pswd,
                    },
                        {
                            data: {
                                evm_address
                            }
                        })
                    console.log("🚀 ~ file: auth.js ~ line 67 ~ connectUauth ~ { user, session, error } ", { user, session, error })
                } else {
                    console.log("creating user in Supabase.")
                    const { user, session, error } = await supabase.auth.signUp({
                        email: evm_email,
                        password: pswd,
                    })
                }
            }
        }
    }

    return (
        <div
            className='h-screen w-screen flex flex-col'
        >
            <Head />
            <Box
                w='2xl'
                mx={'auto'}
                my={'auto'}
            >
                <Card>
                    <Space direction="vertical" size={11}>
                        <Box>
                            <Typography.Title level={3}>Welcome</Typography.Title>
                        </Box>
                        <Box
                            w='xl'
                        >
                            <button
                                onMouseEnter={() => setSvgSrc('/unstopSvgButtons/hover-large.svg')}
                                onMouseLeave={() => setSvgSrc('/unstopSvgButtons/default-large.svg')}
                                onClick={handleLogin}
                                className='mx-auto flex flex-grow'
                            >
                                <Image
                                    src={svgSrc}
                                    // layout="fill"
                                    width='555'
                                    height='100%'
                                />
                            </button>
                        </Box>
                        <Auth
                            supabaseClient={supabase}
                            providers={['google']}
                            view={'sign_in'}
                            socialLayout="horizontal"
                            socialButtonSize="xlarge"
                            onlyThirdPartyProviders={true}
                        />
                    </Space>
                </Card>
            </Box>
        </div>
    )
}

export default AuthPage
