import { Box, IconButton, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';
import { ArrowBackIcon, BellIcon } from '@chakra-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';

const Topbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;
  const handleGoBack = () => {
    navigate(-1); 
  };
  const [showNotification, setShowNotification] = useState(false);
  const handleNotificationClick = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const {isAuth} = useContext(AuthContext);
  const myEmail = localStorage.getItem('email');

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
      <Box>
        <IconButton
          aria-label="Go Back"
          icon={<ArrowBackIcon />}
          variant="ghost"
          onClick={handleGoBack}
        />
      </Box>
      <Box display="flex" alignItems="center" gap={25}>
        <Box>
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            variant="ghost"
            onClick={handleNotificationClick}
          />
        </Box>
        <Box
          width="100px"
          height="30px"
          borderRadius="full"
          overflow="hidden"
          bg="white"
        >
          {isLoggedIn ? (
            <Image
              src="/path-to-user-image.jpg"
              alt="Profile Image"
              boxSize="full"
              objectFit="cover"
            />
          ) : (
            <Link to="/login">
              <Box
                p={1}
                textAlign="center"
                bg="gray.200"
                color="gray.600"
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                transition="all 0.3s"
                _hover={{ bg: "gray.300", cursor: "pointer" }}
              >
               {isAuth ? myEmail :'Sign in'}
              </Box>
            </Link>
          )}
        </Box>
      </Box>
      <Modal isOpen={showNotification} onClose={handleCloseNotification}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>New Update Available!</Text>
            <Text>You have 10 unread messages!</Text>
            <Text>Your account was created Successfully</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCloseNotification}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Topbar;