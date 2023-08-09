import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Calendar } from 'antd';

const Calendar1 = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  // Get the current day
  const currentDay = new Date().getDate();

  // Determine the color based on the day
  const backgroundColor = currentDay % 2 === 0 ? 'rgba(255, 255, 153, 0.3)' : 'rgba(255, 192, 203, 0.3)';

  // Set the image URL for the background
  const backgroundImage = 'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICAgHBwcHBwcHCA0HBwcHBw8ICQcKFREWFiARExMYHSggGBolJx8TITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw0NDy0ZFRkrKzcrLS0rKysrKystKysrKzcrKystKysrKy0rNysrKystKysrKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAABAgADBAf/xAAZEAEBAQEBAQAAAAAAAAAAAAAAARESAhP/xAAXAQEBAQEAAAAAAAAAAAAAAAABAgAF/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAEREgL/2gAMAwEAAhEDEQA/APpJgMdNxTCIYCS0MSTDBFQKhhgiomqK4mKC4qKiYqJqoqGJikrVCkgkhmJYMzMzBmappFIFTTU0xFTU1VTVRNTUqqapFTU1VTVIqQpNKQCFAUGghjAYzGGAwFRghiVKhghgVFGCKiVQxQhgVFRUTClUVCIUqUwZipgzMWDMxDBmYVhWZqmmilNTU1VTVRFTUqqapNTRTRVRNTU1VFKEg0KgFBoKWMBjEqiVRJJgVAqGKiVQVUMVExUSqKhghCoqEQpUVJMBJBBYhgSGZmYEEMK1BDJpopAqaaKpNTU1VTTE1NFNFVE1NFNFKE0GhUCazViloYxgJMBgJVEmBSoqJhgqoqKiYYlS4YlUBKokpUqGJhClFOkEszMzMwZiG0MwZhaQKGCktU01NKRRTU0poqaqpqk0UU0UpTRTQoCg0EEwQwMYYIqBTGNDATCIQqGKSUlUKTKCuFBlClnUaRh1bJ062HVa2p1tGHVa2p1tbG0tqdbTg06lhpGlNrWgpZNIIFTTRSBQaCkUUgpTQqpIApFUDCmFmUYmKiSqFMVAowwQwKMLRklizMTpSwZWnU62sdXranW1sbV62o1tGHV62o1tbG1WtqdbSNOjRrMzaGYhgWYJCgWCapNKaAU0pFFNCoACCGIZmVDExQJVEmBS4YmGJMXDEyqiVE4IqAhsVjYxxGNi8blmxzZfLctrYhlctywxLK5blmxJVy3LacTjYvGxtbE42KwM2JwKTWAFNTaqAUVqKUgVhVJANBAZmIZgWYwggkpIKoqJhBVKqIipRVRcqo5yqlSqOkU5yrlTVRWHGlVErieW4dIqQaccuG4duTzB0eXDhuHfmDlum5ceBy7WJp0Y54LF1FpiU0VrU2qia1RabU2qxNapta1Kk1qKwpSAQoCgghgQwaFmYtCCzFgYCqFMIKjEmAqVKghTpKqVylVqcMrrKuenCelT0LFSvRPSp6eaez2nlc9PVPR6eXs/RPJ6enoX08/0HZ5bp3vpF9OV9i+jyOnS+kWovoX0qRFqrUWjRTida0MFJapNBAFIIFBoIYNWIYEMzEMzEgszGCGAmEMCphCxUwIJOhgTraGZj03SQ2Nq+27c2ONrp23TmzY2unTagjGVrBmYhmZgGYgAikBmBDAhgKzUUhmZmZ//2Q==)';

  return (
    <Box position="relative">
      <Flex
        ml={{ base: 0, md: 0 }}
        px={{ base: 4, md: 4 }}
        pt={0}
        pb={0}
        height="60px"
        alignItems="center"
        bg="transparent" // Set the background to transparent
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        // justifyContent={{ base: 'center', md: 'center' }}
        textAlign="center"
        fontFamily="Courier"
        style={{
          backgroundColor,
          backgroundImage,
          backgroundSize: '100% 100%', // Set the background size to cover the entire element
          backgroundRepeat: 'no-repeat', // Prevent repeating the background image
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Heading size="md">Calendar</Heading>
      </Flex>
      <Calendar onPanelChange={onPanelChange} style={{ background: 'transparent' }} /> 
    </Box>
  );
};

export default Calendar1;
