import { Box, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { FaQuestionCircle } from 'react-icons/fa';

const Help = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Nulla fringilla libero sed turpis eleifend ullamcorper.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Fusce eu odio eu felis vulputate fringilla.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'Maecenas cursus, lectus in bibendum ullamcorper, mauris neque semper tortor, eu sodales lorem urna vitae nisl.',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'Sed auctor lectus nec tellus aliquet, id pretium ipsum ultricies.',
    },
    {
      question: 'Do you have a loyalty program?',
      answer: 'Integer non dolor tempor, malesuada nibh at, volutpat mi.',
    },
  ];

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>
        Help
      </Heading>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Heading as="h3" size="md" mb={4}>
          Frequently Asked Questions
        </Heading>
        <Accordion allowToggle>
          {faqs.map((faq, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <FaQuestionCircle size={18} style={{ marginRight: '8px' }} />
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>{faq.answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <Heading as="h3" size="md" mt={8} mb={2}>
        Contact Us
      </Heading>
      <Text>
        If you have any further questions or need assistance, please feel free to contact our support team at support@example.com or call us at 123-456-7890.
      </Text>
    </Box>
  );
};

export default Help;
