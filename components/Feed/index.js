import { Box, Button, Center } from '@chakra-ui/react'
import { useQuery, gql } from '@apollo/client'
import { createApolloClient } from '../../utils/initApolloMintbase'
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { GET_LATEST_NFTS, GET_ALL_STORES } from '../../utils/mintbaseQueries'
import { PostGrid } from '../Post/postGrid'

const LOAD_LIMIT = 11

const Feed = ({ mintbaseNetwork, favo }) => {
    // Filter the duplicate tokens
    function filterDups(arr) {
        let uniqueThingIds = []
        const uniqueArr = arr.token?.filter((nft) => {
            if (nft.thing) {
                if (!uniqueThingIds.includes(nft.thing.id)) {
                    uniqueThingIds.push(nft.thing.id)
                    return nft
                }
            }
        })
        return uniqueArr
    }

    function loadReducer(load, action) {
        switch (action) {
            case 'load more':
                setScrollDown(true)
                return { limit: load.limit + LOAD_LIMIT }
            case 'load less':
                setScrollDown(true)
                if (load.limit - LOAD_LIMIT < 1) {
                    return { limit: 1 }
                } else {
                    return { limit: load.limit - LOAD_LIMIT }
                }
        }
    }
    const endRef = useRef()
    const [scrollDown, setScrollDown] = useState(false)
    const [load, setLoad] = useReducer(loadReducer, { limit: LOAD_LIMIT })
    const [target, setTarget] = useState(LOAD_LIMIT)
    const [loadMore, setLoadMore] = useState(true)

    const [unique, setUnique] = useState([])
    const { loading, error, data } = useQuery(GET_LATEST_NFTS, {
        client: mintbaseNetwork.client,
        variables: {
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
            limit: load.limit,
        },
        pollInterval: 900,
    })

    useLayoutEffect(() => {
        // Print Errors from gql query
        if (error) {
            console.log(`Error! ${error.message}`)
        }
        // Handle new data
        if (data && !loading) {
            // Filter data
            const uniqueData = filterDups(data)
            const newUniqueLength = uniqueData.length

            // Append new data
            if (newUniqueLength > unique.length) {
                setUnique(() => uniqueData)

                // Scroll down to last viewed item
                if (scrollDown) {
                    endRef.current.scrollIntoView({ behavior: 'smooth', alignToTop: true })
                }
            }

            // Check if enough data length meets taget, otherwise load more
            console.log(`loading more nfts. target:${target}  vs Loaded:${newUniqueLength} `)
            if (newUniqueLength < target && loadMore) {
                setTimeout(() => {
                    setLoad('load more')
                }, 1000)
            } else {
                setLoadMore(() => false)
            }
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
            {!loading && (
                <Box className="relative flex mb-11 drop-shadow-lg">
                    <Button
                        ref={endRef}
                        variant="solid"
                        colorScheme="teal"
                        className="mx-auto font-bold"
                        onClick={() => {
                            setLoad('load more')
                            setLoadMore(() => true)
                            setTarget((prev) => {
                                prev + LOAD_LIMIT
                            })
                        }}
                    >
                        {'Load more ...'}
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Feed
