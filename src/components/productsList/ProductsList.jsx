import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectProductsByCollection } from '../../redux/selectors/productsSelector';
import { fetchListedProducts } from '../../redux/thunk/products';
import { BackgroundImage, Box, Center, Flex, Pagination, ScrollArea, Select, Text } from '@mantine/core';
import Navbar from '../navbar/Navbar';
import ProductListCards from '../../pages/productsList/ProductListCards';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';


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

    // useEffect(() => {
        // console.log(page);
        // if (page === null && limit === null && sortBy === null && sortOrder === null) {
        //     searchParams.set('page', "1")
        //     searchParams.set('limit', "10")
        //     searchParams.set('sortBy', "createdAt")
        //     searchParams.set('sortOrder', "desc")
        //     setSearchParams(searchParams)
        // }
        // if (limit === null) {
        //     searchParams.set('limit', "10")
        // }
        // if (sortBy === null) {
        //     searchParams.set('sortBy', "createdAt")
        // }
        // if (sortOrder === null) {
        //     searchParams.set('sortOrder', "desc")
        // }
        //     setSearchParams(searchParams)

    // }, [page, limit, sortBy, sortOrder])
    const handleSortByChange = (e) => {
        // console.log(e);
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
        <Box mah={'100vh'} maw={'100vw'} style={{ overflow: 'hidden' }} >
            <Navbar />
            {(collectionKey !== "All" && categories.includes(collectionKey)) ? (
                <>
                    <Text  m={'sm'} size='lg'>Browse by Popular Niches under {collectionKey}</Text>

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
                                    onClick={() => { navigate(`/products/category/${encodeURIComponent(collectionKey)}/${encodeURIComponent(scat)}?page=1&limit=10&sortBy=createdAt&sortOrder=desc`, ) }}
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
                    <Text m={'sm'} size='lg'>Browse by Popular Categories</Text>

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
            <Flex direction={'column'} w={'100%'} justify={'center'} align={'flex-start'}>
                <Text size='sm'> Showing Results {meta?.currentPage} of {meta?.totalPages} Pages - {meta?.productsPerPage} products per page</Text>
            </Flex>
            <Flex direction={'column'} w={'100%'} justify={'center'} align={'center'} >

                <Box w={'60%'}>
                    <Flex w={'100%'} justify={'space-between'} align={'center'}>
                        <>
                            <Flex justify={'center'} align={'center'} gap={'md'}>

                                <Select withAlignedLabels placeholder="Sort By" data={["Price", "Title", "Arrival"]} onChange={handleSortByChange} />

                                {searchParams.get("sortOrder") === "asc" &&
                                    <IconSortAscending2
                                        onClick={() => {
                                            searchParams.set("sortOrder", "desc")
                                            setSearchParams(searchParams)
                                        }}
                                        style={{ cursor: 'pointer', userSelect: 'none' }}

                                    />}
                                {searchParams.get("sortOrder") === "desc" &&
                                    <IconSortDescending2
                                        onClick={() => {
                                            searchParams.set("sortOrder", "asc")
                                            setSearchParams(searchParams)
                                        }}
                                        style={{ cursor: 'pointer', userSelect: 'none' }}

                                    />}
                            </Flex>

                            {meta?.totalPages > 1 &&
                                <Pagination value={meta?.currentPage} p={'md'} color={'green.0'} onChange={(e) => {
                                    searchParams.set("page", e)
                                    setSearchParams(searchParams)
                                    console.log(e)
                                }} total={meta?.totalPages} />

                            }
                            <Select withAlignedLabels placeholder='Products per Page' data={[5, 10, 15, meta?.totalProducts].filter(Boolean).map(String)} onChange={(e) => {
                                searchParams.set("limit", Number(e))
                                setSearchParams(searchParams)
                                console.log(Number(e));

                            }} />
                        </>
                    </Flex>
                    <Flex w={'100%'} h={'70vh'} style={{ overflow: 'hidden' }} direction={'column'}>
                        <ProductListCards products={products} navigate={navigate} />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}

export default ProductsList