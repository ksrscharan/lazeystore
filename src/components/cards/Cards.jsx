import { Card, Group, Badge, Flex, Image, Text, CardSection } from '@mantine/core'
import React from 'react'
import './cards.css'
import { GradientButton, OutlineButton } from '../Buttons'
import { IconShoppingCartPlus } from '@tabler/icons-react'

function BasicCard() {
    return (
        <Card shadow="sm" padding="sm" radius="md" withBorder className='basic-card' color='green'>
            <Card.Section>
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>
            <Card.Section px="sm">
                <Group justify='space-between' position="apart" mt="sm" mb="sm">
                    <Badge color="gree.0" variant="light">
                        Deal
                    </Badge>
                    <Text weight={700} ta={'center'}>Norway Fjord Adventures</Text>
                </Group>
                <Text size="sm" c="dimmed" fw={500} ta={'left'}>
                    With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                    activities on and around the fjords of Norway
                </Text>
            </Card.Section>
            <Card.Section px="sm" pb="sm">

                <Group mt="md" spacing="xs" align='center' direction='row' justify='space-evenly'>
                    <GradientButton color="blue" fullWidth mt="md" radius="md" w="70%">
                        <Text c={'black'} fw={700}>Buy Now</Text>
                    </GradientButton>
                    <OutlineButton fullWidth mt="md" radius="md">
                        <IconShoppingCartPlus />
                    </OutlineButton>
                </Group>
            </Card.Section>
        </Card>
    )
}

function CardWithRatings() {
    return (
        <div>CardWithRatings</div>
    )
}

function BuyCards() {
    return (
        <div>BuyCards</div>
    )
}

export { BuyCards, CardWithRatings, BasicCard }