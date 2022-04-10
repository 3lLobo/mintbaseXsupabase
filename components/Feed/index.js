import { Box, useColorModeValue, Grid, Button, } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_LATEST_NFTS, GET_ALL_STORES } from '../../utils/mintbaseQueries'


export const SpinnerContainer = () => {
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

    // Filter the duplicate tokens
    function filterDups(arr) {
        let uniqueThingIds = [];
        const uniqueArr = arr.token?.filter((nft) => {
            if (nft.thing) {
                if (!uniqueThingIds.includes(nft.thing.id)) {
                    uniqueThingIds.push(nft.thing.id);
                    return nft
                }
            }
        })
        return uniqueArr
    }

    const [unique, setUnique] = useState()
    const { loading, error, data } = useQuery(GET_LATEST_NFTS, {
        variables: {
            "orderBy": [
                {
                    "createdAt": "desc"
                }
            ],
            "limit": 36,
        },
        pollInterval: 900
    });

    useEffect(() => {
        if (error) { console.log(`Error! ${error.message}`) }
        if (!loading) { setUnique(filterDups(data)) }
    }, [data, error, loading])

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
                        : unique?.map((nft) => {
                            return (
                                <LazyPosts
                                    key={nft.thing.id}
                                    nft={nft}
                                />
                            )
                        })
                    }
                </Box>
            </Grid>
        </Box>
    );
};

export default Feed;
