import {
    Box,
    Text,
} from "@chakra-ui/react";


export const Comment = ({ comment }) => {

    return (
        <Box>
            <Text> {comment || ""} </Text>
        </Box>
    )
}