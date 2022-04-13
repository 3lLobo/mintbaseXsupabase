import {
    Box,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import TimeAgo from "timeago-react";
import { useUser } from "../../../hooks/authUser";
import { supabase } from "../../../utils/initSupabase";
import { useState, useEffect } from "react"

const CommentOther = ({ comment }) => {

    const bg = useColorModeValue("pink.100", "pink.800");
    return (
        <Box
            bg={bg}
            className="rounded-2xl pt-1 px-2 w-fit text-left"
        >
            <Box className="flex">
                <CommentAuthor comment={comment}></CommentAuthor>
                <Text className="text-s font-semibold px-3 mt-1"
                > {comment.text || ""}
                </Text>
            </Box>
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
            <CommentAuthor comment={comment}></CommentAuthor>
            <Text
                className=""
            > {comment.text || ""}
            </Text>
        </Box>
    )
}

const CommentTimestamp = (timestamp) => {

    return (
        <TimeAgo
            className="text-xs  text-neutral-400"
            datetime={timestamp.timestamp}
        />
    )
}

const CommentAuthor = ({ comment }) => {

    const [author, setAuthor] = useState("Anonymous")

    useEffect(() => {
        async function getAuthor() {
            const { error, data } = await supabase.from('users').select('full_name').eq('id', comment.user_id)
            // console.log(data)
            if (data.length > 0) {
                setAuthor(data[0].full_name)
            }
        }
        var atr = getAuthor()
    }, [author, comment.user_id])

    const className = useColorModeValue("text-xs text-neutral-600 font-semibold", "text-xs text-neutral-300 font-light")


    return (
        <Box className={className}>
            <Text>
                {author || "Anonymous"}
            </Text>
            <CommentTimestamp timestamp={comment.created_at} />

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