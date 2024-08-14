import React from 'react';
import { chakra, Flex, Text } from '@chakra-ui/react';

const Footer = () => {

    return (
        <>
            <Flex
                justifyContent="justify-between"
                alignItems={"center"}
                transition=".08s ease-out"
            >
                <Flex
                    w="full"
                    as="footer"
                    flexDir={{ base: "column", sm: "column", md: "column", lg: "row" }}
                    align="center"
                    justify="space-between"
                    px={6}
                    py={6}
                    bgColor="#f8f9fa"
                    _dark={{
                        bgColor: "primary.1200",
                    }}
                >
                    <Text fontSize="xs" color="gray.700" _dark={{ color: 'gray.200' }}>
                        © {new Date().getFullYear()} <chakra.a fontWeight={'bold'}>agylcode</chakra.a> All rights reserved
                    </Text>

                    <Flex>
                        <Text fontSize="xs" color="gray.700" _dark={{ color: 'gray.200' }}>
                            Made with ❤️ by <chakra.a target={'_blank'} fontWeight={'bold'} href="https://cesaracjota.vercel.app/">AgylCode</chakra.a>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Footer