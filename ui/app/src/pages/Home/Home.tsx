import { Container } from "@chakra-ui/react";

import { Navigate } from "react-router-dom";
function HomePage() {
    return (
        <Container
            minWidth={{ base: "100vw", lg: "80vw" }}
            h="calc(100vh - 64px - 3rem)"
            bg="gray"
        >
            <Navigate to="/tourist" />
        </Container>
    );
}

export default HomePage;
