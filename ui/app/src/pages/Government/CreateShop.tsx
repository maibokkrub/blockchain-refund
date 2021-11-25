import { useState } from "react";
import { Stack, Input, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useContractMethod } from "../../utils/hooks";

function CreateShop() {
    const { state: createShopState, send: createShop } =
        useContractMethod("createShop");

    const [country, setCountry] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopAddress, setShopAddress] = useState("");

    const handleCreateShop = () => createShop(shopAddress, shopName, country);

    return (
        <VStack
            w="full"
            m="4"
            bg="white"
            paddingBottom="45px"
            borderRadius="10px"
        >
            <Center>
                <Text
                    fontSize="28px"
                    as="b"
                    paddingTop="27px"
                    paddingBottom="18px"
                    color="#1a202c"
                >
                    Create Shop
                </Text>
            </Center>
            <Stack spacing={3}>
                <Input
                    onChange={(e) => setShopAddress(e.target.value)}
                    placeholder="Shop Address"
                    _placeholder={{ color: "#1a202c" }}
                    size="md"
                    variant="filled"
                    bg="#90cdf4"
                    color="#1a202c"
                    value={shopAddress}
                />
                <Input
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    _placeholder={{ color: "#1a202c" }}
                    size="md"
                    variant="filled"
                    bg="#90cdf4"
                    color="#1a202c"
                    value={country}
                />
                <Input
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Shop Name"
                    _placeholder={{ color: "#1a202c" }}
                    size="md"
                    variant="filled"
                    bg="#90cdf4"
                    color="#1a202c"
                    value={shopName}
                />
            </Stack>

            <VStack>
                <Button onClick={handleCreateShop} bg="#1a202c">
                    Create Shop
                </Button>
                <Text color="black">{createShopState.status}</Text>
                <Text color="red">{createShopState.errorMessage}</Text>
            </VStack>
        </VStack>
    );
}

export default CreateShop;
