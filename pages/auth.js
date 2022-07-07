import React from 'react'
import { AuthRedirect } from '../hooks/authUser'
import { supabase } from '../utils/initSupabase'
import { Auth, Card, Typography, Space } from '@supabase/ui'
import Head from '../components/Head'
import Header from '../components/Header'
import { Box } from '@chakra-ui/react'

const AuthPage = () => {
    AuthRedirect()

    return (
        <>
            <Head />
            {/* <Header /> */}
            <Box className="authcontainer">
                <Card>
                    <Space direction="vertical" size={8}>
                        <Box>
                            <Typography.Title level={3}>Welcome</Typography.Title>
                        </Box>
                        <Auth
                            supabaseClient={supabase}
                            providers={['google']}
                            view={'sign_in'}
                            socialLayout="horizontal"
                            socialButtonSize="xlarge"
                        />
                    </Space>
                </Card>
            </Box>
        </>
    )
}

export default AuthPage
