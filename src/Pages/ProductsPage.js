import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productSelector, HandleGetProducts } from '../Redux/productReducer';
import ProductCard from '../Component/ProductCard';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ProductsPage = () => {
    const { products, loading, error } = useSelector(productSelector);
    const dispatch = useDispatch();
    const [ascending, setAscending] = useState(false);

    useEffect(() => {
        dispatch(HandleGetProducts());
    }, []);

    const toggleSortByPrice = () => {
        setAscending(prev => !prev);
    }

    const filteredProducts = useMemo(() => {
        const productsCopy = [...products];
        return ascending 
            ? productsCopy.sort((a, b) => a.price - b.price) 
            : productsCopy.sort((a, b) => b.price - a.price);
    }, [ascending, products]);

    return (
        <Container maxWidth="lg">
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    marginTop: '70px',
                    padding: '20px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '8px',
                    boxShadow: 3,
                }}
            >
                <Button 
                    onClick={toggleSortByPrice} 
                    variant="contained" 
                    endIcon={ascending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />} 
                    sx={{ mb: 2 }}
                >
                    Sort by Price
                </Button>

                <Stack spacing={2} alignItems="center">
                    {filteredProducts.map((d, index) => (
                        <ProductCard key={d.id} index={index} productData={d} />
                    ))}
                </Stack>
            </Box>

            <Backdrop
                sx={(theme) => ({
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: theme.palette.secondary.main,
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {error && (
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h6" color="error">
                        Error: {error}
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ProductsPage;
