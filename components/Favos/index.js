import { Box, Button, Center } from "@chakra-ui/react";
import { useQuery, gql } from '@apollo/client';
import { createApolloClient } from "../../utils/initApolloMintbase";
import { useEffect, useReducer, useRef, useState } from 'react';
import { GET_FAVOS, GET_ALL_STORES } from '../../utils/mintbaseQueries'
import { PostGrid } from "../Post/postGrid";
import { useUser } from "../../hooks/authUser";
import { supabase } from "../../utils/initSupabase";



const Favos = ({ mintbaseNetwork, favo }) => {

    const { user } = useUser();

    // Filter the duplicate tokens
    function filterDups(arr) {
        let uniqueThingIds = [];
        const uniqueArr = arr.token.filter((nft) => {
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
    console.log("FAVO FEED: ", favo[0].toString())

    const { loading, error, data } = useQuery(GET_FAVOS, {
        client: mintbaseNetwork.client,
        variables: {
            "where": {
                "thingId": {
                    "_in": favo[0],
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
        if (!loading && data) {
            console.log(data)
            setUnique(filterDups(data))
        }
    }, [data, error, loading])

    return (
        <Box>
            <PostGrid
                mintbaseNetwork={mintbaseNetwork}
                loading={loading}
                unique={unique}
                favo={favo}
            />
        </Box>
    );
};

export default Favos;
