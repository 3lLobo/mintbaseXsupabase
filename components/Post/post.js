import {
    Box,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Icon,
    IconButton,
    Heading,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "@chakra-ui/icons";
import { HiShoppingBag } from "react-icons/hi";
import { useState, useEffect } from "react";
import useCustomToast from "../../hooks/useCustomToast";
import TimeAgo from "timeago-react";


export default function Post({ nft }) {
    const postBg = useColorModeValue("#edf2f7", "#171923");

    const styles = {
        // fontFamily: "poppings",
        backgroundColor: postBg,
        // maxHeight: 430,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        header: {
            height: 64,
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 5,
        },
        // ! prevent too long to read contents from spanning large heights
        // instead turn to scrollable content container
        content: {
            margin: "0 auto",
            overflowY: "auto",
            maxH: 400,
            overflowX: "hidden",
            
        },
        footer: {
            height: 64,
            display: "flex",
            alignItems: "center",
        },
    };

    return (
        <Box style={styles}>
            <Heading
            // style={styles.header}
            >
                <Box
                className="flex"
                >
                <Avatar
                    className=" bg-slate-300 hover:cursor-pointer hover:border-slate-300 hover:border-2"
                    bg={postBg}
                    name={nft.minter}
                    src={nft.thing.store.iconBase64}
                    size="sm"
                    onClick={console.log("Show all NFTs from this store")}
                />
                <Button
                className="ml-auto"
                    onClick={console.log("Show all NFTs from this minter!")}
                    my={2}
                >{nft.minter}
                </Button>
                </Box>
                <Text 
                className="text-base tracking-wider uppercase font-mono font-extrabold"
                my={2}
                >{nft.thing.metadata.title}</Text>
                <TimeAgo
                    className={`text-[11px] order-last pr-1 opacity-60`}
                    datetime={nft.createdAt}
                />
            </Heading>
            <Box mb={1} style={styles.content}>
                <ChakraImage
                    maxH={200}
                    rounded="lg"
                    maxWidth={["100%", "400px", "225px"]}
                    margin="0 auto"
                    src={nft.thing.metadata.media}
                    alt={"contentNftmedia" + nft.thing.id}
                    objectFit="contain"
                />
            </Box>
            <Box p={2} style={styles.content}>
                {nft.thing.metadata.description}
            </Box>
            <Divider />
            <Box p={2} style={styles.footer}>
                <IconButton
                    icon={<StarIcon />}
                    isRound
                    onClick={console.log("Add to favorites")}
                >
                </IconButton>
                <Text> 1 </Text>
                <IconButton
                    icon={<ArrowDownIcon />}
                    isRound
                    onClick={console.log("Dislike NFT")}
                >
                </IconButton>
                <Text> 3 </Text>
                <IconButton
                    icon={<ArrowUpIcon />}
                    isRound
                    onClick={console.log("Like NFT")}
                >
                </IconButton>
                <Text> 111 </Text>
            </Box>
            <Box
                className=" mr-1 flex"
            >
                <Button
                    className="ml-auto mr-1"
                    onClick={console.log("Filter for this media type!")}
                >
                    {nft.thing.metadata.media_type}
                </Button>
            </Box>

        </Box>
    );
}