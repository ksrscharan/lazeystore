import { Stack, Title, Text, Button, Center, ThemeIcon, Box } from '@mantine/core';
import { IconHeartSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../buttons/Buttons';

const WISHLIST_MESSAGES = [
  "Your wishlist is a blank canvas. Start painting it with your favorite finds!",
  "It's a bit lonely in here. Give your future self something to smile about!",
  "A curated collection starts with a single click. What's caught your eye?",
  "Too lazy to decide? Just heart everything and choose later. We won't tell!",
  "Your 'Treat Yourself' list is currently empty. Let's change that.",
  "Your style is unique—your wishlist should be too. Start exploring!"
];

function EmptyWishlist() {
  const navigate = useNavigate();
  
  const randomMessage = WISHLIST_MESSAGES[Math.floor(Math.random() * WISHLIST_MESSAGES.length)];

  return (
    <Center h={500} w="100%">
      <Stack align="center" gap="md">
        <ThemeIcon 
          variant="light" 
          size={80} 
          radius="xl" 
          color="green.0"
        >
          <IconHeartSearch size={45} stroke={1.2} />
        </ThemeIcon>

        <Box ta="center">
          <Title order={2} fw={800} lts={-0.5}>
            Nothing to see here... yet.
          </Title>
          <Text c="dimmed" fz="lg" mt="xs" fw={500} italic={true}>
            "{randomMessage}"
          </Text>
        </Box>

        <BasicButton 
          variant="filled" 
          color="black" 
          size="md" 
          radius="xl"
          mt="lg"
          onClick={() => navigate('/')}
          rightSection={<IconHeartSearch size={18} />}
        >
          Explore the Collection
        </BasicButton>
      </Stack>
    </Center>
  );
}

export default EmptyWishlist;