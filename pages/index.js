import Header from '../components/Header'
import Head from '../components/Head'
import { Text, Box, Center, Image, Heading, HStack, Button } from '@chakra-ui/react'


const Index = () => {
  
  return (
    <Box>
      <Head />
      <Header />
      {/* <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"> */}
      <main>
        <HStack bg={"#030406"}>
          <Box>
            <Image boxSize='95%' height={"100vh"} objectFit='cover' src='/images/hero-image.jpg' />
          </Box>
          <Box>
            <Heading textAlign={"center"} p={2} as='h1' size={"4xl"} > All your NFTs <br />in one place </Heading>
            <Text align={"center"} m={4}>Dopest NFTs from Mintbase. Collect, Like & Share now !</Text>
            <Center>
              <Button p={5} size={"lg"} color={"blue.200"} > Login </Button>
            </Center>
            
          </Box>
        </HStack>
        {/* <Box className="align-center ">
          <Center>
            <Text className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:via-yellow-300 p-6  rounded-full shadow-2xl">
              Login to see the dopest NFTs!
            </Text>
          </Center>
        </Box> */}
      </main>
    </Box>
  )
}

export default Index
