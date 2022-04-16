import {Box } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { SpinnerContainer } from "../spinnerContainer";


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


export const PostGrid = ({loading, unique, mintbaseNetwork}) => {



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
    )
}
