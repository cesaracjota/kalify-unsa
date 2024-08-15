import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
// import { FaSchool } from "react-icons/fa";

function Layout({ children }) {


    const navigationItems = [
        // {
        //     icon: FaSchool,
        //     label: "Examenes",
        //     path: "/home/institutos"
        // },
    ]

    return (
        <Box
            display="flex"
            flexDirection="column"
            minH="100vh"            
            bg="#f9f9f9"
            _dark={{
                bgColor: "primary.1200",
                color: "white"
            }}
        >
            <Header listItem={navigationItems} />
            <Box
                as="main"
                flex="1"
                _dark={{
                    bg: "primary.1200"
                }}
                px={6}
                transition=".08s ease-out"
                mt={{
                    base: "20",
                    lg: "4"
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
}

export default Layout;
