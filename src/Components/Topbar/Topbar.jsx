import { Box, IconButton, Image } from '@chakra-ui/react';
import { ArrowBackIcon, BellIcon } from '@chakra-ui/icons';

const Topbar = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      bg="gray.100"
      height={30}
      borderRadius={20}
    >
      <IconButton
        aria-label="Go Back"
        icon={<ArrowBackIcon />}
        variant="ghost"
      />
      <Box display="flex"
      alignItems="center"
      gap={25}>
      <Box>
      <IconButton aria-label="Notifications" icon={<BellIcon />} variant="ghost" />
      </Box>
      <Box
        width="30px"
        height="30px"
        borderRadius="full"
        overflow="hidden"
        bg="white"
      >
        <Image
          src="" 
          alt="Profile Image"
          boxSize="full"
          objectFit="cover"
        />
      </Box>
      </Box>
    </Box>
  );
};

export default Topbar ;
