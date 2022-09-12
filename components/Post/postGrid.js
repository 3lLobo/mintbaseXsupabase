import { Box, Button } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

// important ! reduce load time. lazyLoad feeder during fetch
const LazyPosts = dynamic(() => import('../Post/post'), {
    loading: () => (
        <Button isLoading variant="ghost" position="absolute" left="50vw" top="50vh" disabled />
    ),
})

export const PostGrid = ({ unique, mintbaseNetwork, favo }) => {
    return (
        <Box className="p-4 relative sm:px-10 ">
            <Box gap="20px" className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
                {unique?.map((nft) => {
                    return (
                        <div
                            maxW={500}
                            colSpan={1}
                            className="flex flex-col hover:drop-shadow-lg"
                            key={nft.thing.id}
                        >
                            <LazyPosts mintbaseNetwork={mintbaseNetwork} nft={nft} favo={favo} />
                        </div>
                    )
                })}
            </Box>
        </Box>
    )
}
