import {
    Flex,
    Spacer,
    IconButton,
    Icon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Text,
    Stack,
    useColorModeValue,
    HStack,
    Link,
    Image,
    Heading,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../theme/ColorModeSwitcher";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import '@fontsource/smooch';
import logo from '../../assets/logo.png';

function Header({ listItem }) {

    const sidebar = useDisclosure();

    const activeLinkcolor = useColorModeValue("primary.600", "primary.600");
    const bgActiveLinkColor = useColorModeValue("#f2f2f2", "#2d323a");

    return (
        <Flex
            as="header"
            _dark={{
                bgColor: "rgba(19,22,28, 0.9)",
                color: "primary.100",
                backdropBlur: "blur(50px)"
            }}
            bg={'white'}
            backdropFilter="blur(10px)"
            position={{
                base: "fixed",
                lg: "sticky"
            }}
            top="0"
            left="0"
            right="0"
            zIndex="sticky"
            px={6}
            py={3}
            align="center"
            justify="space-between"
            transition=".08s ease-out"
            boxShadow={'base'}
        >
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
                size="xs"
            >
                <DrawerOverlay
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <DrawerContent
                    bg={useColorModeValue("white", "primary.1100")}
                    display="flex"
                    w="full"
                    h="full"
                    overflowY="auto"
                >
                    <Flex
                        direction="column"
                        as="nav"
                        fontSize="15px"
                        px={4}
                        py={2}
                        aria-label="Main Navigation"
                        justify="space-between"
                        h="100%"
                    >
                        <Flex justify={'center'} py={2} mb={6}>
                            <Image
                                w="50px"
                                src={logo}
                                alt="logo"
                                alignSelf={'center'}
                                objectFit="cover"
                                mr={2}
                            />
                        </Flex>
                        {
                            listItem?.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        as={NavLink}
                                        to={item.path}
                                        fontSize={'14px'}
                                        mb={2}
                                        color={'gray.700'}
                                        _activeLink={{
                                            color: activeLinkcolor,
                                            bg: bgActiveLinkColor,
                                            fontWeight: '600',
                                            borderRadius: 'xl'
                                        }}
                                        _dark={{
                                            color: '#ffffff',
                                            _activeLink: {
                                                color: 'white',
                                            }
                                        }}
                                        _hover={{ textDecoration: 'none' }}
                                    >
                                        <Flex
                                            justifyContent={'flex-start'}
                                            display={'flex'}
                                            py="12px"
                                            cursor="pointer"
                                            _hover={{
                                                bg: bgActiveLinkColor,
                                                borderRadius: 'xl'
                                            }}
                                            role="group"
                                            px={2}
                                        >
                                            {item.icon && (
                                                <Icon
                                                    mx="5"
                                                    fontSize="22px"
                                                    as={item.icon}
                                                    alignItems={'center'}
                                                />

                                            )}
                                            {item.label}
                                        </Flex>
                                    </Link>
                                )
                            })
                        }

                        <Spacer />

                        <Stack
                            bottom={0}
                            direction="column"
                            as="nav"
                            fontSize="12px"
                            px={8}
                            py={6}
                            aria-label="Main Navigation"
                            color={'black'}
                            _dark={{
                                color: '#ffffff'
                            }}
                            alignContent={'center'}
                        >
                            <Text textAlign={'center'} fontSize={'12px'} as="span">© 2023 AgylCode LLC</Text>
                        </Stack>
                    </Flex>
                </DrawerContent>
            </Drawer>

            <Stack direction={'row'} spacing={4} display={'flex'} w="full" alignSelf={'center'}>
                <IconButton
                    aria-label="Menu"
                    display={{ base: "flex", lg: "none" }}
                    onClick={sidebar.onOpen}
                    fontSize="xl"
                    size={'md'}
                    rounded={'lg'}
                    variant="outline"
                    colorScheme="gray"
                    icon={<Icon fontSize={24} as={HamburgerIcon} />}
                />
                <HStack spacing={2} as={NavLink} to={'/'} mr={4} display={{ base: "none", lg: "flex" }}>
                    <Image src={logo} maxW={'40px'} />
                    <Heading size={'md'} alignSelf={'center'} color={'primary.900'} _dark={{ color: 'white' }} >
                        KalifyUNSA
                    </Heading>
                </HStack>
                <HStack spacing={8} display={'flex'} alignSelf={'center'}>
                    {
                        listItem?.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    as={NavLink}
                                    to={item.path}
                                    color={'gray'}
                                    fontWeight={'600'}
                                    fontSize={'sm'}
                                    display={{ base: 'none', lg: 'block' }}
                                    _activeLink={{
                                        color: activeLinkcolor
                                    }}
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <Flex
                                        _hover={{
                                            color: activeLinkcolor,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {item.label}
                                    </Flex>
                                </Link>
                            )
                        })
                    }
                </HStack>
            </Stack>

            <HStack spacing={4} justify={'flex-end'} w="full">
                <Stack spacing={3} direction={'row'}>
                    <ColorModeSwitcher />
                    {/* <LoginModal /> */}
                    {/* <Divider orientation='vertical' h="8" alignSelf={'center'} /> */}
                    {/* <RegisterModal /> */}
                </Stack>
            </HStack>
        </Flex>
    );
}

export default Header;