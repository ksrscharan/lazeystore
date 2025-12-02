import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setProducts } from '../../redux/reducers/productsSlice'
import { setAccessToken } from '../../redux/reducers/accessTokenSlice'
import Navbar from '../../components/navbar/Navbar';
import { Badge, Box, Flex, Image, Text, Tooltip, TooltipFloating } from '@mantine/core';
import { IconArrowBadgeRight, IconFileTypePpt, IconStar, IconStarFilled } from '@tabler/icons-react';
import Link from '../../components/Link';
import { BasicButton, OutlineButton } from '../../components/Buttons';
import { Carousel } from '@mantine/carousel';
import ReactMarkdown from 'react-markdown'
import ImageCarousel from './ImageCarousel';
import ProductDescription from './ProductDescription';


function ProductDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState()
    const token = useSelector(state => state.accessToken.token)
    const { products } = useSelector(state => state.products)
    const [wish, setWish] = useState(false)

    const getNewAccessToken = () => {
        axios.get('http://localhost:3000/auth/createAccessToken', {
            withCredentials: true
        }).then(res => {
            dispatch(setAccessToken(res.data.accessToken));
            navigate('/');
        }).catch(e => {
            console.log('Silent refresh failed:', e.message);
        });
    };

    useEffect(() => {
        axios.get('http://localhost:3000/products/get').then(res => {
            dispatch(setProducts(res.data))
            setProduct(res.data.filter((product) => product._id === id)[0])

        })
    }, [id])

    useEffect(() => {
        if (token === null) {
            getNewAccessToken()
        }
    }, [token])

    return (
        <Flex mih={'100vh'} direction={'column'}>
            <Navbar />
            {product &&

                <Flex
                    h={"100%"}
                    gap={'md'}
                    w={'100%'}
                    mih={'100%'}
                    style={{ flexGrow: 1 }}
                    p={'xl'}
                    direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
                >
                    <ImageCarousel
                        product={product}
                    />
                    <ProductDescription
                        product={product}
                    />
                </Flex >
            }
        </Flex >
    )
}

export default ProductDetails