import { Box, Grid, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import { AllRoutes } from './Components/AllRoutes/AllRoutes';
import Topbar from './Components/Topbar/Topbar';

function App() {
  const { isOpen, onToggle } = useDisclosure();
 
  const handleSidebarToggle = () => {
    onToggle();
  };

  return (
    <Box className="App">
      <Heading as="h1" size="2xl" mb={8} textAlign="center">
        Retax CRM System
      </Heading>
      <Box mb={2}>
        <Topbar />
      </Box>
      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={6}>
        <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }}>
          <Sidebar  />
        </Box>

        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton icon={<HamburgerIcon />} variant="ghost" onClick={handleSidebarToggle} />
        </Box>

        <Box display={{ base: 'block', md: 'block' }}>
          <AllRoutes />
        </Box>
      </Grid>
    </Box>
  );
}

export default App;
