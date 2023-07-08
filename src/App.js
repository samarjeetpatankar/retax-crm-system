import { Box, Grid, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion";
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import { AllRoutes } from './Components/AllRoutes/AllRoutes';
import Topbar from './Components/Topbar/Topbar';
import Footer from './Components/Footer/Footer'

function App() {
  const { isOpen, onToggle } = useDisclosure();
 
  const handleSidebarToggle = () => {
    onToggle();
  };
  const text = 'RETAX CRM SYSTEM';
 
  return (
    <Box className="App">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
      >
        <Heading as="h1" size="2xl" mb={8} textAlign="center">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
              style={{ color: 'teal' }}
            >
              {char}
            </motion.span>
          ))}
        </Heading>
      </motion.div>
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
      <Footer/>
    </Box>
  );
}

export default App;
