import {
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import TimeAgo from "timeago-react";
import { useUser } from "../../../hooks/authUser";


const CommentOther = ({ comment }) => {

    const bg = useColorModeValue("gray.300", "gray.700");
    return (
        <Box
            bg={bg}
            className="rounded-2xl pt-1 px-3 w-fit text-left"
        >
            <Text
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
            className="text-xs font-bold font-mono px-2 text-slate-400"
            dateTime={timestamp}
        />
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