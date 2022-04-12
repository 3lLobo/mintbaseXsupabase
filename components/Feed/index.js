import { Box, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useQuery, gql } from '@apollo/client';
import { createApolloClient } from "../../utils/initApolloMintbase";
import { useEffect, useState } from 'react';
import { GET_LATEST_NFTS, GET_ALL_STORES } from '../../utils/mintbaseQueries'


export const SpinnerContainer = () => {
    return (
        <Button
            isLoading
            colorScheme='gray'
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

const Feed = ({mintbaseNetwork}) => {


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

    // const mintbaseClient = createApolloClient(mintbaseNetwork);
    console.log(mintbaseNetwork.client)

    const [unique, setUnique] = useState()
    const { loading, error, data } = useQuery(GET_LATEST_NFTS, {
        client: mintbaseNetwork.client,
        variables: {
            "orderBy": [
                {
                    "createdAt": "desc"
                }
            ],
            "limit": 40,
        },
        pollInterval: 900
    });

    useEffect(() => {
        if (error) { console.log(`Error! ${error.message}`) }
        if (!loading) { setUnique(filterDups(data)) }
    }, [data, error, loading])

    return (
        <Box
            className="p-4 relative sm:px-10 "
        >
            <Box
                gap="20px"
                className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 "
            > 
                    {loading
                        ? <SpinnerContainer />
                        : unique?.map((nft) => {
                            return (
                                <div maxW={500} colSpan={1} className="flex flex-col hover:drop-shadow-lg">
                                    <LazyPosts
                                        mintbaseNetwork={mintbaseNetwork}
                                        key={nft.thing.id}
                                        nft={nft}
                                    />
                                </div>
                            )
                        })
                    }
            </Box>
        </Box>
    );
};

export default Feed;
