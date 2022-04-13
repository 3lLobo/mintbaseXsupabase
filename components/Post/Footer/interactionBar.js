import {
    Box,
    Text,
    Avatar,
    Divider,
    Icon,
    Input,
    IconButton,
    Stack,
    FormControl,
} from "@chakra-ui/react";
import { GiCrownedHeart } from "react-icons/gi";
import { MdOutlineThumbDown, MdOutlineThumbUp, MdOutlineThumbUpAlt, MdOutlineThumbUpOffAlt, MdSend, MdChat } from "react-icons/md"


export const InteractionBar = ({ likes, dislikes, userLike, onLikeClick, onComment, userComment, setUserComment, commentCount }) => {

    // console.log("MyLike:", userLike)

    function updateComment(e) {
        e.preventDefault();
        const val = e.currentTarget.value;
        setUserComment(() => { return val })
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            onComment(e)
        }
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
            <FormControl
                className=" mr-1 flex"
            >
                <Input
                    id="commentInput"
                    w={"100%"}
                    variant='filled'
                    placeholder='Comment'
                    value={userComment}
                    focusBorderColor="gray.400"
                    onChange={(e) => updateComment(e)}
                    onKeyDown={handleKeyDown}
                />
                <IconButton
                    type="submit"
                    ml={3}
                    isRound
                    variant={"ghost"}
                    icon={<MdSend />}
                    onClick={onComment}
                />
            </FormControl>
        </Box>
    )
}