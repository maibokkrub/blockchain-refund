import { useContext } from "react";
import { Container, Flex, Spacer, Text, Button } from "@chakra-ui/react";
import Table from "../../components/Table/Table";
import {
    useContractMethod,
    useOrder,
    useRefundAmount,
} from "../../utils/hooks";
import { useEthers } from "@usedapp/core";
import { Order, OrderView, _orderTransformer } from "../../utils/getter";
import { utils } from "ethers";
import { useAdmin, useShop } from "../../utils/hooks";
import { DataContext } from "../../components/DataContext/DataContext";

function TouristPage() {
    const data = useContext(DataContext);

    const { state: claimRefundState, send: claimRefund } =
        useContractMethod("refund");

    const { account } = useEthers();
    useAdmin(account);
    useShop(account);

    const orders = useOrder();

    const countries = [
        ...new Set(orders?.map((x: Order) => x.shop.country)),
    ] as string[];

    // Todo: add more countries
    const refund = useRefundAmount(account, countries);
    const handleClaimRefund = () => claimRefund(countries);

    // All Table Definitions
    const tableColumns = [
        { title: "Country", field: "country" },
        { title: "Name", field: "itemName" },
        { title: "Shop", field: "shopName" },
        {
            title: "Amount",
            field: "itemAmount",
            type: "numeric",
            filtering: false,
        },
        {
            title: "Price",
            field: "itemPrice",
            type: "numeric",
            filtering: false,
        },
        {
            title: "Total",
            field: "itemTotal",
            type: "numeric",
            filtering: false,
        },
        { title: "Status", field: "status", type: "numeric" },
    ];

    const allOrders = orders?.map((x: Order) => _orderTransformer(x));
    const _ordersSum = allOrders
        ?.filter((x: OrderView) => x.status !== "REFUNDED")
        .map((x: OrderView) => x.itemTotal)
        .reduce((x: number, sum: number) => x + sum, 0);
    // const _ordersSum = 0;

    return (
        <Container maxW="1300px" h="calc(100vh - 64px - 3rem)">
            {!data.isShop && !data.isAdmin ? (
                <>
                    <Flex wrap="wrap-reverse" direction="row">
                        <Flex w="100%" direction="column">
                            <Flex
                                direction="row"
                                alignItems="center"
                                mx="3rem"
                                p="3"
                                px="3rem"
                                bg="blackAlpha.400"
                                borderRadius="10px"
                            >
                                <Flex direction="column" textAlign="left">
                                    <Text fontSize="1.25rem">
                                        Pending Orders
                                    </Text>
                                    <Text fontSize="1.75rem" fontWeight="bold">
                                        {_ordersSum} ETH
                                    </Text>
                                </Flex>
                                <Spacer />
                                <Flex direction="row" alignItems="center">
                                    <Flex
                                        direction="column"
                                        textAlign="right"
                                        color="teal.100"
                                        pl="5rem"
                                    >
                                        <Text fontSize="1.25rem">
                                            Total Refundable Amount
                                        </Text>
                                        <Text
                                            fontSize="1.75rem"
                                            fontWeight="bold"
                                        >
                                            {refund?._isBigNumber
                                                ? utils.formatEther(refund)
                                                : "Loading.."}{" "}
                                            ETH
                                        </Text>
                                        <Text
                                            fontSize="0.75rem"
                                            color="red.300"
                                        >
                                            {claimRefundState.errorMessage}
                                        </Text>
                                    </Flex>
                                    <Button
                                        ml="6"
                                        px="5"
                                        colorScheme="teal"
                                        onClick={() => handleClaimRefund()}
                                        isLoading={
                                            claimRefundState.status === "Mining"
                                        }
                                    >
                                        Claim
                                    </Button>
                                </Flex>
                            </Flex>
                            <Flex mx="3rem">
                                <Table
                                    title="All Order"
                                    data={allOrders}
                                    columns={tableColumns}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
}

export default TouristPage;
