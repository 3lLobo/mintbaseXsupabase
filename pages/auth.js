import React, { useEffect } from 'react'
import { supabase } from '../utils/initSupabase'
import { Auth, Card, Typography, Space } from '@supabase/ui'
import Head from '../components/Head'
import { Box, Image } from '@chakra-ui/react'
import UAuth from '@uauth/js'
import { loginUser, reset } from '../app/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { ethers } from 'ethers'
import { AuthRedirect } from '../hooks/authUser'


// .env from here https://github.com/unstoppabledomains/uauth/blob/main/examples/nextjs/.env
const uauth = new UAuth({
    clientID: "eb6179b7-3b34-4299-9a13-5e11d85ca74a",
    // clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirectUri: "https://nftea-base.netlify.app/auth",
    scope: 'openid email wallet',
})

const AuthPage = () => {
    AuthRedirect()
    const [svgSrc, setSvgSrc] = React.useState('/unstopSvgButtons/default-large.svg')
    const dispatch = useDispatch()

    useEffect(() => {
        document?.documentElement.classList.add('dark')
    })

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
                .finally((value) => { 
                    user_id = value
                    dispatch(loginUser({id: value || '🐈‍⬛'}))
                }) //dispatch(loginUser({id: value || '🐈‍⬛'})))
        )
        // dispatch(loginUser({ id: user_id }))

        const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
        const eth_addresses = (await provider.send("eth_requestAccounts", []))
        const signer = provider.getSigner()

        if (eth_addresses.length > 0) {
            const evm_address = eth_addresses[0]
            const msg = "AngryPandaPassword"
            const signature = (await signer.signMessage(msg))

            if (signature) {
                const evm_email = evm_address + '@angrypanda.nft'
                console.log("log in to Supabase.")
                const { error: loginError } = await supabase.auth.signIn({
                    email: evm_email,
                    password: signature,
                })
                if (loginError) {
                    console.log("creating user in Supabase.")
                    const { user, session, error } = await supabase.auth.signUp({
                        email: evm_email,
                        password: signature,
                    })
                }
            }
        }
    }

    return (
        <div
        // className='h-screen w-screen flex flex-col'
        >
            <Head />
            <Box
                className="authcontainer"
            // w='2xl'
            // mx={'auto'}
            // my={'auto'}
            >
                <Card>
                    <Space direction="vertical" size={8}>
                        <Box>
                            <Typography.Title level={3}>Welcome</Typography.Title>
                        </Box>
                        <Auth
                            supabaseClient={supabase}
                            providers={['google',]}
                            view={'sign_in'}
                            socialLayout="horizontal"
                            socialButtonSize="xlarge"
                            onlyThirdPartyProviders={true}
                        />
                        <Box
                        >
                            <button
                                onMouseEnter={() => setSvgSrc('/unstopSvgButtons/hover-large.svg')}
                                onMouseLeave={() => setSvgSrc('/unstopSvgButtons/default-large.svg')}
                                onClick={handleLogin}
                                className='mx-auto'
                            >
                                <Image
                                    src={svgSrc}
                                // layout="fill"
                                // height='100%'
                                />
                            </button>
                        </Box>
                    </Space>
                </Card>
            </Box>
        </div>
    )
}

export default AuthPage
