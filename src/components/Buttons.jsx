import { Button, Text } from '@mantine/core'
import React from 'react'

function BasicButton({ children, ...props }) {
    return (
        <Button {...props} color='green.0'>
            <Text>{children}</Text>
        </Button>
    )
}

function GradientButton({ fromColor = 'green.0', toColor = 'green.0', deg = 45, children }) {
    return (
        <Button variant='gradient' gradient={{ from: fromColor, to: toColor, deg: deg }}>
            {children}
        </Button>
    )
}

function OutlineButton({ children }) {
    return (
        <Button variant='outline' color='green.0'>
            <Text>{children}</Text>
        </Button>
    )
}

function IconButton({ leftSection, rightSection, children, variant }) {
    return (
        <Button variant={variant} leftSection={leftSection} rightSection={rightSection}>{children}</Button>
    )
}
export { BasicButton, GradientButton, OutlineButton, IconButton }



