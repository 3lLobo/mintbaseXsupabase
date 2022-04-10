import {
    Box,
    Text,
    Avatar,
    Divider,
    Icon,
    Input,
    IconButton,
    Stack,
} from "@chakra-ui/react";
import { GiCrownedHeart } from "react-icons/gi";
import { MdOutlineThumbDown, MdOutlineThumbUp, MdOutlineThumbUpAlt, MdOutlineThumbUpOffAlt, MdSend } from "react-icons/md"


export const InteractionBar = ({ likes, dislikes, favorite, userLike, onLikeClick }) => {

    console.log("MyLike:", userLike)
    return (
        <Box>
            <Box
                p={2}
                className="flex"
            >
                <IconButton
                    className="mr-3"
                    // bg="bg-red-300"
                    colorScheme={(userLike?.value === true) && "green" || "gray"}
                    icon={<MdOutlineThumbUp />}
                    isRound
                    onClick={() => onLikeClick("true")}
                >
                </IconButton>
                <Text>
                    {likes || 0}
                </Text>
                <IconButton
                    className="mr-3 ml-3"
                    colorScheme={(userLike?.value === false) && "red" || "gray"}
                    icon={<MdOutlineThumbDown />}
                    isRound
                    onClick={() => onLikeClick("false")}
                >
                </IconButton>
                <Text>
                    {dislikes || 0}
                </Text>
                <IconButton
                    className="ml-auto h-6 mr-3"
                    icon={<GiCrownedHeart className="fill-red-500" />}
                    isRound
                // onClick={}
                >
                </IconButton>
                <Text>
                    {favorite || 111}
                </Text>
            </Box>
            <Box
                className=" mr-1 flex"
            >
                <Input variant='filled' placeholder='Comment' />
                <IconButton icon={<MdSend />}>Send!</IconButton>
            </Box>
        </Box>
    )
}