import {
    Box,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Icon,
    Input,
    IconButton,
    Stack,
} from '@chakra-ui/react'
import { Comment } from './comment'

export const CommentSection = ({ comments }) => {
    comments.reverse()

    return (
        <Box>
            {/* <Stack> */}
            {comments.map((cmnt) => {
                return <Comment key={cmnt.id} comment={cmnt} />
            })}
            {/* <Text>Latest Comment</Text>
                <Text>More Comments</Text>
                <Text>Perhaps make an component for Comments.</Text>
                <Text>The comment Author and date also need to fit here.</Text>
                <Text>First Comment</Text> */}
            {/* </Stack> */}
        </Box>
    )
}
