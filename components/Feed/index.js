import { Box, useColorModeValue, Grid, Button, } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useQuery, gql } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { GET_LATEST_NFTS, GET_ALL_STORES } from '../../utils/mintbaseQueries'


const SpinnerContainer = () => {
    return (
        <Button
            isLoading
            colorScheme='blue'
        >
        </Button>
    )
}

// important ! reduce load time. lazyLoad feeder during fetch
const LazyPosts = dynamic(() => import("../Post/post"), {
    loading: () => (
        <Button
            isLoading
            variant="ghost"
            position="absolute"
            left="50vw"
            top="50vh"
            disabled
        />
    ),
});

const Feed = () => {
    const picBg = useColorModeValue("gray.200", "gray.700");
    const postBg = useColorModeValue("gray.100", "gray.900");

    function filterDups(arr) {
        const tokenIds = [... new Set(arr.map((nft) => { return nft.thing.id }))]

        console.log(tokenIds)
        return tokenIds
    }

    const { loading, error, data } = useQuery(GET_LATEST_NFTS, {
        variables: {
            "orderBy": [
                {
                    "createdAt": "desc"
                }
            ],
            "limit": 69,
        },
        pollInterval: 900
    });

    // const uniqueTokens = useMemo(() => filterDups(data?.token || []), [data])

    useEffect(() => {
        if (error) { console.log(`Error! ${error.message}`) }
        console.log(data)

    }, [data, error, loading])

    let uniqueToken = [];
    return (
        <Box
            className="p-4 z-10 relative md:px-10 "
        >
            <Grid
                // templateColumns={["repeat(100%)", "20vw calc(100% - 25vw)"]}
                gap="20px"
            >

                <Box maxW={640}
                    className="place-content-center place-self-center"
                >
                    {loading
                        ? <SpinnerContainer />
                        : data.token?.map((nft) => {
                            if (!uniqueToken.includes(nft.thing.id)) {
                                uniqueToken.push(nft.thing.id)
                                return (
                                    <LazyPosts
                                        key={nft.thing.id}
                                        nft={nft}
                                    />
                                );
                            }
                        })}
                </Box>
            </Grid>
        </Box>
    );
};

export default Feed;
