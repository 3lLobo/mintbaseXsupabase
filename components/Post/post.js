import {
    Box,
    useColorModeValue,
    Button,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useCustomToast from "../../hooks/useCustomToast";
import TimeAgo from "timeago-react";
import {
    supabaseNftData,
    supabaseInsertNft,
    supabaseInsertLike,
    supabaseInsertComment,
    supabaseDeleteComment,
    supabaseDeleteLike,
    supabaseUpdateLike
} from "../../utils/supabaseFncs";
import { mintbaseNetwork } from '../../utils/initApolloMintbase'
import { useUser } from "../../hooks/authUser";
import { SpinnerContainer } from "../Spinner";
import { InteractionBar } from "./Footer/interactionBar";
import { CommentSection } from "./Footer/commentSection";


export default function Post({ nft }) {
    const postBg = useColorModeValue("#edf2f7", "#171923");
    const user = useUser()
    const [nftData, setNftData] = useState()

    const { data, loading: nftDataLoading, error } = supabaseNftData(nft.thing.id)

    // Get comments and likes from supabase
    const [nftComments, setNftComments] = useState([])
    const [nftLikes, setNftLikes] = useState([])
    // const [nftDislikes, setNftDislikes] = useState([])
    const [userLike, setUserLike] = useState()

    // const [ownLike, setOwnLike] = useState()
    useEffect(() => {
        if (!nftDataLoading) {
            // console.log("NFTData: ", nftData.nftCollection.edges[0])
            if (data.nftCollection.edges.length > 0) {
                const supabaseData = data.nftCollection.edges[0].node;
                console.log(supabaseData)
                setNftData(supabaseData)
                const supaComments = supabaseData.commentCollection.edges;
                console.log("Com", supaComments)
                const supaLikes = supabaseData.likeCollection.edges
                console.log("Likes", supaLikes)
                if (supaComments.length > 0) {setNftComments(() => supaComments.map((edge) => {return edge.node}))}
                if (supaLikes.length > 0) {setNftLikes(() => supaLikes.map((edge) => {return edge.node}))}

                const like = supaLikes.filter((like) => like.node.user_id === user.user.id);
                if (like.length > 0) {
                    setUserLike(like[0].node)
                    // console.log("User has like!", like)
                }
            }
        }
    }, [data, nftDataLoading])
    // console.log(nftLikes)

    // All the supabase hooks.
    const [addNft, { data: addNftData }] = supabaseInsertNft()
    const [delLike, { data: delLikeData }] = supabaseDeleteLike(setUserLike)
    const [addLike, { data: addLikeData }] = supabaseInsertLike(setUserLike)
    const [addComment, { data: addCommentData }] = supabaseInsertComment()
    const [delComment, { data: delCommentData }] = supabaseDeleteComment()
    const [updLike, { }] = supabaseUpdateLike(setUserLike, userLike, addLike,)

    async function onLikeClick(likeStr) {
        // First insert the Nft into the database.
        const like = JSON.parse(likeStr);
        console.log('Like: ', {"value": like})
        if (!nftData) {

            await addNft({
                variables: {
                    "objects": [{
                        "mintbase_thing_id": nft.thing.id,
                        "store_id": nft.thing.store.id,
                        "minter_id": nft.minter,
                        "network": mintbaseNetwork
                    }]
                },
            });
        }

        if (userLike) {
            if (userLike.value !== like) {
                console.log("Not the same:", userLike.value, like)
                await updLike({
                    variables: {
                        "filter": {
                            "nft_id": {
                                "eq": nft.thing.id,
                            },
                            "user_id": {
                                "eq": user.user.id
                            },
                        }
                    }
                })
            } else { 
                console.log("Like is already set:", userLike, like)
                await delLike({
                    variables: {
                        "filter": {
                            "nft_id": {
                                "eq": nft.thing.id,
                            },
                            "user_id": {
                                "eq": user.user.id
                            },
                        }
                    }
                })
                return 
            }
        } else {
            console.log("Adding new like: ", nft, user)
            await addLike({
                variables: {
                    "objects": [{
                        "user_id": user.user.id,
                        "nft_id": nft.thing.id,
                        "value": like
                    }]
                }
            })
        }
    };
    
    useEffect(() => {
        setNftLikes((prev) => {
            let prevFilter = prev.filter((like) => like?.user_id !== user.user.id)
            return [...prevFilter, userLike]
        })
    }, [userLike])

    if (error) {
        console.log("Supabase error:", error)
        return
    }

    return (
        <Box
            className="p-5 rounded-2xl my-6"
            bg={postBg}
        >
            {nftDataLoading
                ? <SpinnerContainer />
                : <Box>
                    <Heading>
                        <Box
                            className="flex"
                        >
                            <Avatar
                                className=" bg-slate-300 hover:cursor-pointer hover:border-slate-300 hover:border-2"
                                bg={postBg}
                                name={nft.minter
                                }
                                src={nft.thing.store.iconBase64}
                                size="sm"
                            // onClick={console.log("Show all NFTs from this store")}
                            />
                            <Button
                                className="mr-auto ml-3"
                                // onClick={console.log("Show all NFTs from this minter!")}
                                my={2}
                            >{nft.minter}
                            </Button>
                            <Button
                                className="ml-3 mr-1"
                            // onClick={console.log("Filter for this media type!")}
                            >
                                {nft.thing.metadata?.media_type}
                            </Button>
                        </Box >
                        <Text
                            className="text-base tracking-wider uppercase font-mono font-extrabold"
                            my={2}
                        >{nft.thing.metadata?.title}</Text>
                        <TimeAgo
                            className={`text-[11px] order-last pr-1 opacity-60`}
                            datetime={nft.createdAt}
                        />
                    </Heading >
                    <Box
                        mb={1}
                        className="flex"
                    >
                        <ChakraImage
                            // onClick="The image should pop up and fill the whole screen"
                            maxH={200}
                            rounded="lg"
                            maxWidth={["100%", "400px", "225px"]}
                            margin="0 auto"
                            src={nft.thing.metadata?.media}
                            alt={"contentNftmedia" + nft.thing.id}
                            objectFit="contain"
                        />
                        <Box
                            p={2}
                            className="overflow-hidden"
                        >
                            {nft.thing.metadata?.description}
                        </Box>
                    </Box>
                    <Divider />
                    <InteractionBar
                        likes={nftLikes.filter((like) => like?.value === true).length || '0'}
                        dislikes={nftLikes.filter((like) => like?.value === false).length || '0'}
                        favorite="0"
                        userLike={userLike}
                        onLikeClick={onLikeClick}
                    // userLike={userLike}
                    />
                    <CommentSection
                        comments={nftComments}
                    />
                </Box>
            }
        </Box >

    )

}