import { Badge, Box, CloseButton, Flex, Image, Input, ScrollArea, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { BasicButton, OutlineButton } from '../buttons/Buttons'
import { IconArrowBadgeRight, IconSearch } from '@tabler/icons-react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts, pushProducts } from '../../redux/reducers/productsSlice'
import Link from '../links/Link'
import { useNavigate } from 'react-router-dom'
import SearchBox from './searchBox'

function Search() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([]); // State to hold search results
    const { products } = useSelector(state => state.products)
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:3000/products/get').then(res => {
            dispatch(setProducts(res.data))

        })
    }, [])
    useEffect(() => {
        if (searchTerm.length >= 3) {
            const results = products.filter((product) => {
                return (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()));
            });
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    useEffect(() => {
    }, [filteredProducts])

    return (
        <Box pos={'relative'} w={'100%'}>
            <Flex justify={"center"} align={'center'} w={'100%'}>
                <Input
                    placeholder='Search for your favourite product here..'
                    w={{ xs: '90%', sm: '90%', md: '90%', lg: "60%", xl: "60%" }}
                    value={searchTerm}
                    rightSectionPointerEvents="all"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    rightSection={
                        <CloseButton
                            aria-label="Clear input"
                            onClick={() => setSearchTerm("")}
                            style={{
                                display: searchTerm ? undefined : 'none',
                            }}
                        />
                    }
                    style={{
                        outline: 'var(--mantine-color-green-0)',
                        '&:focus-within': {
                            outline: '2px solid var(--mantine-color-blue-5)',
                            // borderColor: 'var(--mantine-color-blue-5)',
                        }
                    }}

                />
            </Flex>
            {(filteredProducts && searchTerm.length >= 3) &&
                <Flex
                    bg={'white'}
                    style={{ overflow: "hidden", zIndex: 3, scrollbarWidth: 'thin' }}
                    justify={'flex-start'}
                    direction={'column'}
                    // gap={'xs'}
                    p="md"
                    bd={'1px solid var(--mantine-color-green-0)'}
                    bdrs={'sm'}
                    pos="absolute"
                    top="100%"
                    left={{ lg: 0, xl: 0 }}
                    w={{ xs: "100vw", sm: "100vw", md: '100vw', lg: '100%', xl: '100%' }}
                    h={'50vh'}
                    // h={'fit-content'}

                >
                    {/* 3. Render the filtered products */}
                    {filteredProducts.length > 0 ? (
                        <SearchBox filteredProducts={filteredProducts} navigate={navigate} setSearchTerm={setSearchTerm} />
                    ) : (
                        searchTerm.length >= 3 && <Text ta="center">No products found matching "{searchTerm}"</Text>
                    )}
                </Flex>}
        </Box>
    )
}

export default Search
