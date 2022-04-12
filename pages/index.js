import Header from '../components/Header'
import Head from '../components/Head'
import Feed from '../components/Feed'
import { Text, Box, Center, Image, Heading, HStack, Button, useColorModeValue, Show, Hide, Link } from '@chakra-ui/react'
import { useUser } from '../hooks/authUser'
import { graphqlSync } from 'graphql'
import React, { useState } from 'react'




const Index = () => {

  const user = useUser();
  console.log("User", user.user)
  const bg = useColorModeValue("white", "#030406");
  const [mintbaseNetwork, setMintbaseNetwork] = useState("testnet")


  return (
    <Box>
      <Head />
      <Header mintbaseNetwork={mintbaseNetwork} setMintbaseNetwork={setMintbaseNetwork} />
      <main>
        {user.user
        // {true
          ? <Feed mintbaseNetwork={mintbaseNetwork} />
          :
          <HStack bg={bg}>
            <Hide below='md'>
              <Box>
                <Image boxSize='95%' height={"100vh"} objectFit='cover' src='/images/hero-image.jpg' />
              </Box>
            </Hide>
            <Box p={10} m={10}>
              <Heading textAlign={"center"} p={2} as='h1' size={"4xl"} > All <br />your NFTs <br />in one place </Heading>
              <Text align={"center"} m={4} >Dopest NFTs from Mintbase. Collect, Like & Share now!</Text>
              <Center>
                <Link href="/auth">
                  <Button p={5} size={"lg"} color={"blue.100"} bg={'gray.700'}> Login </Button>
                </Link>
              </Center>
            </Box>
          </HStack>
        }
      </main>
    </Box>
  )
}

export default Index
