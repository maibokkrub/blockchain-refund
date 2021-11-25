import { useContext } from "react";
import { Container, HStack } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { useAdmin, useShop } from "../../utils/hooks";
import ApproveOrder from "./ApproveOrder";
import ConfirmOrder from "./ConfirmOrder";
import RejectOrder from "./RejectOrder";
import SearchBuyer from "./SearchBuyer";
import CreateShop from "./CreateShop";
import { DataContext } from "../../components/DataContext/DataContext";

function GovernmentPage() {
    const { account } = useEthers();
    useAdmin(account);
    useShop(account);
    const data = useContext(DataContext);

    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)">
            {data.isAdmin ? (
                <>
                    <HStack w="full">
                        <CreateShop />
                    </HStack>
                    <HStack w="full">
                        <ApproveOrder />
                        <RejectOrder />
                        <ConfirmOrder />
                    </HStack>
                    <SearchBuyer />
                </>
            ) : (
                <></>
            )}
        </Container>
    );
}

export default GovernmentPage;
