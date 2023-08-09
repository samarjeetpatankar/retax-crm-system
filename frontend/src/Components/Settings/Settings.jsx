import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <Box p={8} textAlign="center" bg="gray.100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading color={'red.300'} as="h2" size="xl" mb={4}>
          Will be Available Soon...
        </Heading>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Box fontSize="lg" color="red.500">
            Stay tuned for updates!
          </Box>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ height: "4px", background: "gray.300" }}
      ></motion.div>
    </Box>
  );
};

export default Settings;
