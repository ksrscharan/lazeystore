import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectProductsByCollection } from '../../redux/selectors/productsSelector';
import { fetchListedProducts } from '../../redux/thunk/products';
import { BackgroundImage, Box, Center, Flex, Modal, Pagination, Select, Text } from '@mantine/core';
import Navbar from '../navbar/Navbar';
import ProductListCards from '../../pages/productsList/ProductListCards';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';
import ProductFilters from './ProductFilters';
import { useDisclosure } from '@mantine/hooks';
import { OutlineButton } from '../buttons/Buttons';
import Container from '../container/Container';


function ProductsList({ collectionKey, endpoint, params }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const sortBy = searchParams.get('sortBy') || "createdAt"
    const sortOrder = searchParams.get('sortOrder') || "desc"
    const { products, meta } = useSelector(selectProductsByCollection(collectionKey));
    const categories = useSelector(state => state.products.categories)
    const subCategories = useSelector(state => state.products.subCategories)
    const [sortOrderData, setSortOrderData] = useState(["Ascending", "Descending"])
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        dispatch(fetchListedProducts({
            collectionKey: collectionKey,
            endpoint: endpoint,
            params: { page: page, limit: limit, sortBy: sortBy, sortOrder: sortOrder }
        }))
        switch (sortBy) {
            case "Title":
                setSortOrderData(["Ascending", "Descending"])
                break;
            case "Price":
                setSortOrderData(["Low to High", "High to Low"])
                break;
            case "Arrival":
                setSortOrderData(["Oldest to Latest", "Latest to Oldest"])
                break;
            case "Category":
                setSortOrderData(["Ascending", "Descending"])
                break;
        }
    }, [page, limit, sortBy, sortOrder])

    const handleSortByChange = (e) => {
        switch (e) {
            case "Title":
                searchParams.set("sortBy", "title")
                setSearchParams(searchParams)
                setSortOrderData(["Ascending", "Descending"])
                break;
            case "Price":
                searchParams.set("sortBy", "salePrice")
                setSearchParams(searchParams)
                setSortOrderData(["Low to High", "High to Low"])

                break;
            case "Arrival":
                searchParams.set("sortBy", "createdAt")
                setSearchParams(searchParams)
                setSortOrderData(["Oldest to Latest", "Latest to Oldest"])
                break;
        }
    }
    return (
            <Container>

            {(collectionKey !== "All" && categories.includes(collectionKey)) ? (
                <>
                    <Text
                        mx={{ xs: 'auto', sm: 'auto', md: 'sm', lg: 'sm', xl: 'sm' }}
                        size={{ xs: 'sm', sm: 'sm', md: 'sm', lg: 'lg', xl: 'lg' }}
                        ta={{ xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' }}
                    >Browse by Popular Niches under {collectionKey}</Text>

                    <Carousel
                        slideSize="70%"
                        emblaOptions={{
                            loop: true,
                            dragFree: true,
                            align: 'center'
                        }}
                    >

                        {subCategories[collectionKey]?.map(scat => {
                            return (

                                <BackgroundImage
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                    src='https://img.freepik.com/free-vector/abstract-background-green-texture-grainy_474888-7026.jpg'
                                    mx={'lg'}
                                    bdrs={'lg'}
                                    w={'250px'}
                                    miw={'250px'}
                                    mih={'70px'}
                                    onClick={() => { navigate(`/products/category/${encodeURIComponent(collectionKey)}/${encodeURIComponent(scat)}?page=1&limit=10&sortBy=createdAt&sortOrder=desc`,) }}
                                >
                                    <Box h={'100%'} w={'100%'}>
                                        <Center h={'100%'} w={'100%'}>

                                            <Text size='xl' c={'white'} ta={'center'}>{scat}</Text>
                                        </Center>
                                    </Box>
                                </BackgroundImage>
                            )
                        })}
                    </Carousel>
                </>
            ) : (
                <>
                    <Text
                        m={'sm'}
                        mx={{ xs: 'auto', sm: 'auto', md: 'sm', lg: 'sm', xl: 'sm' }}
                        size={{ xs: 'sm', sm: 'sm', md: 'sm', lg: 'lg', xl: 'lg' }}
                    >
                        Browse by Popular Categories
                    </Text>

                    <Carousel
                        slideSize="70%"
                        emblaOptions={{
                            loop: true,
                            dragFree: true,
                            align: 'center'
                        }}
                    >

                        {categories?.map((cat, idx) => {
                            return (

                                <BackgroundImage
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                    onClick={() => navigate(`/products/category/${encodeURI(cat)}?page=1&limit=10&sortBy=createdAt&sortOrder=desc`)}
                                    src='https://img.freepik.com/free-vector/abstract-background-green-texture-grainy_474888-7026.jpg'
                                    mx={'lg'}
                                    bdrs={'lg'}
                                    miw={'250px'}
                                    w={'250px'}
                                    mih={'70px'}
                                    key={idx}

                                >
                                    <Box h={'100%'} w={'100%'}>
                                        <Center h={'100%'} w={'100%'}>
                                            <Text size='xl' c={'white'} ta={'center'}>{cat}</Text>
                                        </Center>
                                    </Box>
                                </BackgroundImage>
                            )
                        })}
                    </Carousel>
                </>
            )
            }
            <Flex
                direction={'column'}
                w={'100%'}
                justify={'center'}
                align={'flex-start'}
                visibleFrom='lg'
            >
                <Text
                    w={'100%'}
                    size='sm'
                    ta={{ xs: 'center', sm: 'center', md: 'left', lg: 'left', xl: 'left' }}
                >
                    Showing Results {meta?.currentPage} of {meta?.totalPages} Pages - {meta?.productsPerPage} products per page
                </Text>
            </Flex>
            <Flex direction={'column'} w={'100%'} justify={'center'} align={'center'} >

                <Box w={{ xs: '100%', sm: '100%', md: '100%', lg: '60%', xl: '60%' }}>
                    <Box
                        visibleFrom='lg'
                    >
                        <ProductFilters searchParams={searchParams} setSearchParams={setSearchParams} meta={meta} handleSortByChange={handleSortByChange} />
                    </Box>
                    <Modal opened={opened} onClose={close} title="Filters">
                        <ProductFilters searchParams={searchParams} setSearchParams={setSearchParams} meta={meta} handleSortByChange={handleSortByChange} />
                    </Modal>
                    <Flex display={{xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none'}} px={'lg'} pt={'sm'} w={'100%'} justify={'space-between'} align={'center'}>

                        <OutlineButton onClick={open}>
                            Filters
                        </OutlineButton>
                        {meta?.totalPages > 1 &&
                            <Pagination value={meta?.currentPage} p={'md'} color={'green.0'} onChange={(e) => {
                                searchParams.set("page", e)
                                setSearchParams(searchParams)
                                console.log(e)
                            }} total={meta?.totalPages} />

                        }
                    </Flex>
                    <Flex w={'100%'} h={{ xs: '60vh', sm: '60vh', md: '70vh', lg: '70vh', xl: '70vh' }} style={{ overflow: 'hidden' }} direction={'column'}>
                        <ProductListCards products={products} navigate={navigate} />
                    </Flex>
                </Box>
            </Flex>
            </Container>

    )
}

export default ProductsList