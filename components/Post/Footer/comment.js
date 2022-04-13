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

    const bg = useColorModeValue("#e5e5e5", "#404040");
    return (
        <Box
            bg={bg}
            className="rounded-2xl pt-1 px-3 w-fit text-left"
        >
            <CommentAuthor comment={comment}></CommentAuthor>
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
            <CommentAuthor comment={comment}></CommentAuthor>
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


    return (
        <Box className="text-xs px-2 text-neutral-400">
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