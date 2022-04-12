import {
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import TimeAgo from "timeago-react";
import { useUser } from "../../../hooks/authUser";


const CommentOther = ({ comment }) => {

    const bg = useColorModeValue("#e5e5e5", "#404040");
    return (
        <Box
            bg={bg}
            className="rounded-2xl pt-1 px-3 w-fit text-left"
        >
            <Text fontSize={"xs"}
            > {comment.text || ""}
            </Text>
            <CommentTimestamp
                timestamp={comment.created_at}
            />
        </Box>
    )
}

const CommentSelf = ({ comment }) => {

    const bg = useColorModeValue("teal.300", "teal.700");
    return (
        <Box
        bg={bg}
        className="rounded-2xl py-1 px-3 w-fit ml-auto text-right"
        >
            <CommnetAuthor author={comment.user_id}></CommnetAuthor>
            <Text
            className=""
            > {comment.text || ""}
            </Text>
            <CommentTimestamp
                timestamp={comment.created_at}
            />
        </Box>
    )
}

const CommentTimestamp = (timestamp) => {

    return (
        <TimeAgo
            className="text-xs px-2 text-neutral-400"
            datetime={timestamp.timestamp}
        />
    )
}

const CommnetAuthor = ({author}) => {

    return (
        <Box>
            <Text>
                {author || "Anonymous"}
            </Text>
        </Box>
    )
}

export const Comment = ({ comment }) => {

    const user = useUser()

    const CommentField = (user?.user.id === comment.user_id) ? CommentSelf : CommentOther;
    // (user?.user.id === comment.user_id)

    return (
        <Box
            className="pt-1"
        >
            <CommentField
                comment={comment}
            >
            </CommentField>
        </Box >
    )
}