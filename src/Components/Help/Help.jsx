import { Box, Heading, Text } from '@chakra-ui/react';

const Help = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Help
      </Heading>
      <Box>
        <Heading as="h3" size="md" mb={2}>
          Frequently Asked Questions
        </Heading>
        <Text mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fringilla libero sed
          turpis eleifend ullamcorper.
        </Text>
        <Heading as="h3" size="md" mb={2}>
          Contact Us
        </Heading>
        <Text>
          If you have any further questions or need assistance, please feel free to contact our
          support team at support@example.com or call us at 123-456-7890.
        </Text>
      </Box>
    </Box>
  );
};

export default Help;
