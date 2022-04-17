import { Box, Button, Center } from "@chakra-ui/react";
import { useQuery, gql } from '@apollo/client';
import { createApolloClient } from "../../utils/initApolloMintbase";
import { useEffect, useReducer, useRef, useState } from 'react';
import { GET_FAVOS, GET_ALL_STORES } from '../../utils/mintbaseQueries'
import { PostGrid } from "../Post/postGrid";
import { useUser } from "../../hooks/authUser";



const Favos = ({ mintbaseNetwork }) => {

    const { user } = useUser();

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

    // TODO make a new query!
    const [unique, setUnique] = useState()
    const { loading, error, data } = useQuery(GET_FAVOS, {
        client: mintbaseNetwork.client,
        variables: {
            "where": {
                "thingId": {
                    "_in": ["SnhecOqJGXbDz5vuvr6p-TES6AWMNtfsokDSzmBWetM:voiceoftheoceans.mintbase1.near", "ZQRxncZRoJC1i0cC1XsOA3BxOoW2bH7BJNVbcwZHTzg:nftlysea.mintbase1.near", "l0TLdWR1c6FP1B_5RFNfirfptuF-quNX-lwcGVlXoQTQ:theflat.mintbase1.near", "t4NGg36Vqj3MzVXQayZ8fCuDtX_EGPU1vNIEhMYc7D0:xtalola.mintspace2.testnet"]
                }
            },
            "orderBy": [
                {
                    "createdAt": "desc"
                }
            ]
        },
        pollInterval: 900
    });

    useEffect(() => {
        if (error) { console.log(`Error! ${error.message}`) }
        if (!loading) {
            setUnique(filterDups(data))
        }
    }, [data, error, loading])

    return (
        <Box>
            <PostGrid
                mintbaseNetwork={mintbaseNetwork}
                loading={loading}
                unique={unique}
            />
        </Box>
    );
};

export default Favos;
