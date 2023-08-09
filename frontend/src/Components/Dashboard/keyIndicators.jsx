import { Box, GridItem, Text } from "@chakra-ui/react";

const KeyIndicators = ({ name, value }) => {
  return (
    <GridItem
      p={4}
      bgGradient="linear(to-r, teal.300, teal.500)"
      borderRadius="md"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontWeight="bold" fontSize="xl" mb={2} color="white">
        {name}
      </Text>
      <Text fontSize="3xl" color="white">
        {value}
      </Text>
    </GridItem>
  );
};

export { KeyIndicators };
