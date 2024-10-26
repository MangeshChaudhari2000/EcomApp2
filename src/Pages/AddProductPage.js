import { Box, Button, Stack, TextField, Grid, Typography, Card, Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HandleAddProduct, productSelector } from '../Redux/productReducer';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
const AddProductPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(productSelector)
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
        rate: "",
        count: "",
    });

    const handleSubmit = () => {
        // e.preventDefault(); // Prevent default form submission
        console.log("handleSubmit called");
        console.log({
            title: input.title,
            price: input.price,
            description: input.description,
            image: input.image,
            rating: {
                rate: input.rate,
                count: input.count,
            }
        });

        dispatch(
            HandleAddProduct({
                productData: {
                    title: input.title,
                    price: parseInt(input.price),
                    description: input.description,
                    image: input.image,
                    rating: {
                        rate: parseInt(input.rate),
                        count: parseInt(input.count),
                    }
                },
            })
        );
        //  Clear the form after submission
        setInput({
            title: "",
            price: "",
            description: "",
            image: "",
            rate: "",
            count: "",
        });
        // Optionally navigate to another page
        navigate('/'); // Redirect to products page after adding
    };

    const handleCancel = () => {
        navigate('/'); // Redirect to the products page or wherever needed
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{marginTop:"80px"}} >
                <Card sx={{
                    maxWidth: "700px", width: "100%", p: 4, m: "auto", boxShadow: 3, borderRadius: '8px'
                }}>
                    <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                        Add New Product
                    </Typography>
                    <Box onSubmit={() => handleSubmit()} style={{ maxWidth: 700, width: "100%", margin: 'auto' }}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={input.title}
                            onChange={(e) => setInput({ ...input, title: e.target.value })}
                            required
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number" // Set type to number
                            value={input.price}
                            onChange={(e) => setInput({ ...input, price: e.target.value })}
                            required
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={input.description}
                            onChange={(e) => setInput({ ...input, description: e.target.value })}
                            required
                        />
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={input.image}
                            onChange={(e) => setInput({ ...input, image: e.target.value })}
                            required
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Rate"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number" // Set type to number
                                    value={input.rate}
                                    onChange={(e) => {
                                        const value = parseFloat(e.target.value); // Convert the input value to a float
                                        if (value >= 0 && value <= 5) { // Check if the value is within the range
                                            setInput({ ...input, rate: value }); // Update state only if it's in the range
                                        }
                                    }}
                                    inputProps={{ min: 0, max: 5 }} // Set min and max attributes for the input
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Count"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number" // Set type to number
                                    value={input.count}
                                    onChange={(e) => setInput({ ...input, count: e.target.value })}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                            <Button variant="outlined" color="secondary" onClick={() => handleCancel()}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                                Add Product
                            </Button>
                        </Stack>
                    </Box>
                </Card>
                <Backdrop
                    sx={(theme) => ({
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency (0.0 to 1.0)
                        color: 'transparent', // This should be 'transparent' instead of 'transperent'
                        zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={loading}
                >
                    <CircularProgress color="secondary" />
                </Backdrop>
            </Box>
        </Container>
    );
};

export default AddProductPage;
