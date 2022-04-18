import {
    Box,
    useColorModeValue,
    Button,
    Image as ChakraImage,
    Heading,
    Avatar,
    VStack,
    Tag,
    Divider,
    Text,
    Link,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Lorem
} from '@chakra-ui/react'
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
    supabaseUpdateLike,
    supabaseInsertFavo,
    supabaseDeleteFavo
} from "../../utils/supabaseFncs";
import { mintbaseNetwork } from '../../utils/initApolloMintbase'
import { useUser } from "../../hooks/authUser";
import { SpinnerContainer } from "../Spinner";
import { InteractionBar } from "./Footer/interactionBar";
import { CommentSection } from "./Footer/commentSection";
import { BsBookmarkHeartFill } from "react-icons/bs"


const Post = ({ nft, mintbaseNetwork, favo }) => {

    const postBg = useColorModeValue("#fafafa", "lightblack");
    const { user } = useUser()
    const [nftData, setNftData] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data, loading: nftDataLoading, error } = supabaseNftData(nft.thing.id)

    // Get comments and likes from supabase
    const [nftComments, setNftComments] = useState([])
    const [nftLikes, setNftLikes] = useState([])
    const [userLike, setUserLike] = useState()
    const [userComment, setUserComment] = useState("")
    const [userFavo, setUserFavo] = favo;
    const [addFavo, { data: addFavoData }] = supabaseInsertFavo(setUserFavo)
    const [delFavo, { data: delFavoData }] = supabaseDeleteFavo(setUserFavo)
    const [isFavo, setIsFavo] = useState()

    // Chack if nft is in users favos
    useEffect(() => {
        if (userFavo.includes(nft.thing.id)) {
            setIsFavo(() => true)
        } else {
            setIsFavo(() => false)
        }
    }, [nft.thing.id, userFavo])

    console.log("is Favo? ", isFavo)
    //  Click on the favorite button
    async function onFavo(event) {
        await isSupaNft()
        console.log("UserFavo: ", userFavo)
        if (isFavo) {
            await delFavo({
                variables: {
                    "filter": {
                        "id": {
                            "eq": nft.thing.id
                        },
                        "user_id": {
                            "eq": user.id
                        }
                    }
                }
            })
            console.log("Deleted Favo: ", userFavo)
        } else {
            await addFavo({
                variables: {
                    "objects": [{
                        "id": nft.thing.id,
                        "user_id": user.id,
                        "mainnet": (mintbaseNetwork === 'mainnet'),
                    }]
                }
            })
            console.log("Insterted Favo: ", userFavo)
        }
    }


    useEffect(() => {
        if (!nftDataLoading) {
            if (data.nftCollection.edges.length > 0) {
                const supabaseData = data.nftCollection.edges[0].node;
                setNftData(supabaseData)
                const supaComments = supabaseData.commentCollection.edges;
                const supaLikes = supabaseData.likeCollection.edges
                if (supaComments.length > 0) { setNftComments(() => supaComments.map((edge) => { return edge.node })) }
                if (supaLikes.length > 0) { setNftLikes(() => supaLikes.map((edge) => { return edge.node })) }

                const like = supaLikes.filter((like) => like.node.user_id === user.id);
                if (like.length > 0) {
                    setUserLike(like[0].node)
                }
            }
        }
    }, [data, nftDataLoading])

    // All the supabase hooks.
    const [addNft, { data: addNftData }] = supabaseInsertNft()
    const [delLike, { data: delLikeData }] = supabaseDeleteLike(setUserLike)
    const [addLike, { data: addLikeData }] = supabaseInsertLike(setUserLike)
    const [addComment, { data: addCommentData }] = supabaseInsertComment(setNftComments)
    const [delComment, { data: delCommentData }] = supabaseDeleteComment()
    const [updLike, { }] = supabaseUpdateLike(setUserLike, userLike, addLike,)

    async function onComment(event) {
        event.preventDefault()
        await isSupaNft()

        if (userComment.length > 0) {
            await addComment({
                variables: {
                    "objects": [{
                        "text": userComment,
                        "nft_id": nft.thing.id,
                        "user_id": user.id
                    }]
                }
            })
            setUserComment("")
        }
    }

    async function isSupaNft() {
        if (!nftData) {
            // First insert the Nft into the database.
            await addNft({
                variables: {
                    "objects": [{
                        "mintbase_thing_id": nft.thing.id,
                        "store_id": nft.thing.store.id,
                        "minter_id": nft.minter,
                        "network": mintbaseNetwork.network
                    }]
                },
            });
        }
    }

    async function onLikeClick(likeStr) {
        const like = JSON.parse(likeStr);
        await isSupaNft()

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
                                "eq": user.id
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
                                "eq": user.id
                            },
                        }
                    }
                })
                return
            }
        } else {
            console.log("Adding new like: ", nft, user, like)
            await addLike({
                variables: {
                    "objects": [{
                        "user_id": user.id,
                        "nft_id": nft.thing.id,
                        "value": like
                    }]
                }
            })
        }
    };

    useEffect(() => {
        setNftLikes((prev) => {
            let prevFilter = prev.filter((like) => like?.user_id !== user.id)
            return [...prevFilter, userLike]
        })
    }, [userLike])

    if (error) {
        console.log("Supabase error:", error)
        return
    }

    // format the mintbase StoreUrl
    const storeUrl = () => {
        let url = "https://" + mintbaseNetwork + ".mintbase.io/store/" + nft.thing.store.id;
        return url
    }

    return (
        <>
            <Box
                className="p-5 rounded-2xl my-6"
                bg={postBg}
            >
                {nftDataLoading
                    ? <SpinnerContainer />
                    : <Box>
                        <Box
                            className="flex"
                        >
                            <Link href={storeUrl()}>
                                <Avatar
                                    className=" bg-slate-300 hover:cursor-pointer hover:border-gray-400 hover:border-2"
                                    bg={postBg}
                                    name={nft.minter}
                                    src={nft.thing.store.iconBase64}
                                    size="sm"
                                // onClick={console.log("Show all NFTs from this store")}
                                />
                            </Link>
                            <Text
                                fontSize="sm"
                                className="mr-auto ml-3"
                                // onClick={console.log("Show all NFTs from this minter!")}
                                my={2}
                            >{nft.minter}
                            </Text>
                            <TimeAgo
                                className="text-xs  text-neutral-400 text-right"
                                datetime={nft.createdAt}
                            />
                        </Box >
                        <Box m={3} className="flex">
                            <ChakraImage
                                onClick={onOpen}
                                maxH={200}
                                rounded="lg"
                                maxWidth={["100%", "400px", "225px"]}
                                margin="0 auto"
                                src={nft.thing.metadata?.media}
                                alt={"contentNftmedia" + nft.thing.id}
                                objectFit="cover"
                                className="hover:cursor-pointer"
                            />
                        </Box>
                        <Divider />
                        <InteractionBar
                            likes={nftLikes.filter((like) => like?.value === true).length || '0'}
                            dislikes={nftLikes.filter((like) => like?.value === false).length || '0'}
                            favorite="0"
                            userLike={userLike}
                            onLikeClick={onLikeClick}
                            onComment={onComment}
                            userComment={userComment}
                            setUserComment={setUserComment}
                            commentCount={nftComments.length || '0'}
                            onOpen={onOpen}
                        />
                    </Box>
                }
            </Box >
            <EnlargedPost
                nft={nft}
                nftLikes={nftLikes}
                userLike={userLike}
                postBg={postBg}
                nftComments={nftComments}
                onLikeClick={onLikeClick}
                onComment={onComment}
                userComment={userComment}
                setUserComment={setUserComment}
                onFavo={onFavo}
                isFavo={isFavo}
                state={[isOpen, onClose]}
            />
        </>
    );
};


//Modal which opens on clicking over a post 

const EnlargedPost = ({ nft, postBg, nftLikes, nftComments, onLikeClick, onComment, userComment, setUserComment, userLike, state, onFavo, isFavo }) => {
    const [isOpen, onClose] = state;

    return (
        <Modal
            isOpen={isOpen}
            size={"5xl"}
            onClose={onClose}
            >
            <ModalOverlay
            />
            <ModalContent
                bg={postBg}
            >
                <ModalHeader>
                    <Box
                        className="flex rounded-full"
                    >
                        <Avatar
                            className=" bg-slate-300 hover:cursor-pointer hover:border-gray-400 hover:border-2"
                            bg={postBg}
                            name={nft.minter
                            }
                            src={nft.thing.store.iconBase64}
                            size="sm"
                        // onClick={console.log("Show all NFTs from this store")}
                        />
                        <Text
                            fontSize="sm"
                            className="mr-auto ml-3"
                            // onClick={console.log("Show all NFTs from this minter!")}
                            my={2}
                        >{nft.minter}
                        </Text>
                        {/* <BsBookmarkHeartFill
                        // size="sm"
                            className={"mr-auto " + (isFavo ? "fill-red-500 " : "fill-green-500 ")}
                        // className='bg-red-500'
                        // color='#666666'
                        /> */}
                        <Box
                            // variant={"ghost"}
                            // size="lg"
                            // colorScheme={isFavo ? "red" : "gray"}
                            // colorScheme="red"
                            className="mr-auto w-9 mr-3 cursor-pointer"
                            // icon={ }
                            isRound
                            onClick={onFavo}
                        >
                                <BsBookmarkHeartFill
                                size="lg"
                                className={" " + (isFavo ? "fill-red-600" : "")} 
                                // className='bg-red-500'
                                // color='#666666'
                                /> 
                        </Box>
                        <TimeAgo
                            className="text-xs  text-neutral-400 mr-6 text-right"
                            datetime={nft.createdAt}
                        />
                    </Box >
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box m={3} className="flex">
                        <VStack>
                            <ChakraImage
                                h={[["100%", "500px", "325px"]]}
                                rounded="lg"
                                width={"100%"}
                                margin="0px"
                                src={nft.thing.metadata?.media}
                                alt={"contentNftmedia" + nft.thing.id}
                                objectFit="cover"
                            />
                            <Tag
                                color="gray.400"
                                className="ml-3 mr-1"
                                size={"sm"}
                            >
                                {nft.thing.metadata?.media_type}
                            </Tag>
                            <Divider />
                            <Box width={"100%"}>
                                <InteractionBar
                                    likes={nftLikes.filter((like) => like?.value === true).length || '0'}
                                    dislikes={nftLikes.filter((like) => like?.value === false).length || '0'}
                                    favorite="0"
                                    userLike={userLike}
                                    onLikeClick={onLikeClick}
                                    onComment={onComment}
                                    userComment={userComment}
                                    setUserComment={setUserComment}
                                    isOpen={isOpen}
                                    commentCount={nftComments.length || "0"}
                                />
                            </Box>
                        </VStack>
                        <VStack className=" m-5">
                            <HStack >
                                <Text>
                                    Title:
                                </Text>
                                <Text
                                    className="font-extrabold"
                                    my={2}
                                >{nft.thing.metadata?.title}
                                </Text>
                            </HStack>
                            <Divider />
                            <HStack>

                                <Text>
                                    Description:
                                </Text>
                                <Box p={2} className="overflow-hidden">
                                    <Text align={"center"} className="font-semibold">
                                        {nft.thing.metadata?.description}
                                    </Text>
                                </Box>
                            </HStack>
                            <CommentSection
                                comments={nftComments}
                            />
                        </VStack>
                    </Box>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Post;