import Feed from "../components/Feed";
import { Box } from "@chakra-ui/react";
import Header from '../components/Header'
import Head from '../components/Head'
import { useUser, RequireAuth, AuthUser } from '../hooks/authUser'


const FeedPage = () => {
    // RequireAuth()
    const user = useUser()

    return (
        <Box>
            <Head />
            <Header />
            <Box>
                <Feed />
            </Box>
        </Box>

    );
};

export default FeedPage;
