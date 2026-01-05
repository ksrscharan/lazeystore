import { Stack, Title, Text, Button, Center, ThemeIcon, Box } from '@mantine/core';
import { IconHeartSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { BasicButton } from '../buttons/Buttons';

const CART_MESSAGES = [
  "Your cart is lighter than air. Let's add some gravity to it!",
  "A cart this empty is a fashion emergency. Time for a quick rescue mission!",
  "Looks like you're practicing extreme minimalism. How about a little treat instead?",
  "Your cart is currently a ghost town. Let's turn it into a party!",
  "Don't be lazy today! Your future self is waiting for these goodies.",
  "Your cart is at a perfect 0kg. We recommend adding at least a few kilos of joy.",
  "Hungry for deals? Your cart is starving. Feed it some favorites!"
];

function EmptyCart() {
  const navigate = useNavigate();
  
  const randomMessage = CART_MESSAGES[Math.floor(Math.random() * CART_MESSAGES.length)];

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
          <Text c="dimmed" fz="lg" mt="xs" fw={500} italic>
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

export default EmptyCart;