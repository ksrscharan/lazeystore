import { Box, Flex, Text } from '@mantine/core'
import React from 'react'
import Navbar from '../navbar/Navbar'

function Container({ children }) {
    return (
        <Box p={0} h={'100vh'} w={'100vw'}>
            <Navbar />
            <Box
                p={0}
                h={{
                    xs: '79vh',
                    sm: '79vh',
                    md: '84vh',
                    lg: '89vh',
                    xl: '89vh',
                }}
                w={'100%'}
                style={{
                    overflow: 'hidden'
                }}
            >
                {children}
            </Box>
            <Box
                m={0}
                p={0}
                h={{
                    xs: '3vh',
                    sm: '3vh',
                    md: '3vh',
                    lg: '3vh',
                    xl: '3vh',
                }}
                w={'100%'}
                bg={'green.0'}
            >
                <Flex h={'100%'} align={'center'} justify={'center'}>

                <Text ta={'center'} size='sm'>LazeyStore © 2026 | Contact: support@lazeystore.com
                </Text>
                </Flex>
            </Box>
        </Box>
    )
}

export default Container