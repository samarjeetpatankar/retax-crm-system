import React from 'react';
import { Box, Container, Stack, Text, Link, IconButton } from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={8}>
      <Container maxW="container.xl">
        <Stack direction="row" spacing={4} justify="center" mb={4}>
          <IconButton
            as={Link}
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter />}
            colorScheme="white"
            variant="ghost"
            size="lg"
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="YouTube"
            icon={<FaYoutube />}
            colorScheme="white"
            variant="ghost"
            size="lg"
          />
          <IconButton
            as={Link}
            href="#"
            aria-label="Instagram"
            icon={<FaInstagram />}
            colorScheme="white"
            variant="ghost"
            size="lg"
          />
        </Stack>
        <Stack direction="row" spacing={8} justify="center" align="center">
          <Link href="#">About</Link>
          <Link href="#">Services</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Privacy Policy</Link>
        </Stack>
        <Text mt={4} textAlign="center" fontSize="sm">
          © 2023 Your Website. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
