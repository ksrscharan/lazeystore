import { Carousel } from '@mantine/carousel'
import { Box, Image } from '@mantine/core'

function ImageCarousel({ product }) {
    return (
        <>
            <Box w={{ xs: '100%', sm: '100%', md: '100%', lg: '50%', xl: '50%' }} h={'100%'}>
                <Carousel
                    height={'100%'}
                    slideGap="md"
                    controlsOffset="xs"
                    controlSize={27}
                    withControls
                    withIndicators
                >
                    {product.imageUrl.map((i, ind) => <Carousel.Slide key={ind}>
                        <Image key={ind} alt={product.title} w={'100%'} src={i} />
                    </Carousel.Slide>)}


                </Carousel>
            </Box>
        </>
    )
}

export default ImageCarousel