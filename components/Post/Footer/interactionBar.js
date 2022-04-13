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
import { MdOutlineThumbDown, MdOutlineThumbUp, MdOutlineThumbUpAlt, MdOutlineThumbUpOffAlt, MdSend, MdChat } from "react-icons/md"


export const InteractionBar = ({ likes, dislikes, favorite, userLike, onLikeClick, onComment, setUserComment, commentCount }) => {

    // console.log("MyLike:", userLike)

    function updateComment(e) {
        e.preventDefault();
        const val = e.currentTarget.value;
        setUserComment(() => { return val })
    }

    return (
        <Box>
            <Box
                py={2}
                className="flex"
            >
                <IconButton
                    className="mr-1"
                    variant={"ghost"}
                    colorScheme={(userLike?.value === true) && "green" || "gray"}
                    icon={<MdOutlineThumbUp />}
                    isRound
                    onClick={() => onLikeClick("true")}
                >
                </IconButton>
                <Text py={2}>
                    {likes || 0}
                </Text>
                <IconButton
                    className="mr-1 ml-3"
                    variant={"ghost"}
                    colorScheme={(userLike?.value === false) && "red" || "gray"}
                    icon={<MdOutlineThumbDown />}
                    isRound
                    onClick={() => onLikeClick("false")}
                >
                </IconButton>
                <Text py={2}>
                    {dislikes || 0}
                </Text>
                <IconButton 
                    variant={"ghost"}
                    className="ml-auto h-6 mr-1"
                    icon={<MdChat />}
                    isRound
                />
                <Text className="my-2" >
                    {commentCount}
                </Text>
            </Box>
            <Box
                className=" mr-1 flex"
            >
                <Input
                    w={"100%"}
                    variant='filled'
                    placeholder='Comment'
                    focusBorderColor="gray.400"
                    onChange={(e) => updateComment(e)}
                />
                <IconButton
                    ml={3}
                    isRound
                    variant={"ghost"}
                    icon={<MdSend />}
                    onClick={onComment}
                />
            </Box>
        </Box>
    )
}