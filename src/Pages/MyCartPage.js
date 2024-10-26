import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import CartCard from '../Component/CartCard'
import { useSelector } from 'react-redux'
import { productSelector } from '../Redux/productReducer'

const MyCartPage = () => {
    const { carts } = useSelector(productSelector);
    console.log(carts);

    return (
        <Container>
            <Box marginLeft="20px" marginTop='70px'>
                {carts != "" ? <Stack spacing={2}>
                    {carts.map((d, index) => (
                        <CartCard key={index} index={index} productData={d} />
                    ))}
                </Stack> :
                    <Stack className="flex flex-col items-center justify-center">
                    <img
                        className="w-1/2"
                        src="https://cdn.shopify.com/s/files/1/1708/4041/files/custom_resized_CG_600x600.jpg?v=1668581089"
                        loading="lazy"
                    />
                    <Typography variant='h3' className='text-sky-900 text-center'>
                        No item in cart
                    </Typography>
                </Stack>
                

                }
            </Box>
        </Container>
    )
}

export default MyCartPage