import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Cases = () => {
  return (
    <Box p={8} textAlign="center" bg="teal.500" color="white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="xl" mb={4}>
          We are working on it
        </Heading>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Box fontSize="lg" color="teal.100">
            and will get back to you soon.
          </Box>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ height: "4px", background: "rgba(255, 255, 255, 0.2)" }}
      ></motion.div>
    </Box>
  );
};

export default Cases;
