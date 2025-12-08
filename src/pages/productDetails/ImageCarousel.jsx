import { Carousel } from '@mantine/carousel';
import { Box, Image } from '@mantine/core';

function ImageCarousel({ product }) {
  return (
    <>
      <Box
        h={'100%'}
        w={{
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '50%',
          xl: '50%'
}}
      >
        <Carousel
          controlSize={27}
          controlsOffset="xs"
          height={'100%'}
          slideGap="md"
          withControls
          withIndicators
        >
          {product.imageUrl.map((i, ind) => (
            <Carousel.Slide key={ind}>
              <Image loading='lazy' alt={product.title} key={ind} src={i} w={'100%'} />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </>
  );
}

export default ImageCarousel;
