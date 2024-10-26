import { Update } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
    products: [],
    carts: [],
    loading: false,
    error: null,
};

// Asynchronous thunk action to fetch products
export const HandleGetProducts = createAsyncThunk("products/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://my-json-server.typicode.com/MangeshChaudhari2000/EcomApp2/Products');
            if (response.status !== 200) { // Check for status code
                throw new Error('Network response was not ok');
            }
            return response.data; // Return the data directly
        } catch (error) {
            toast.error("Error fetching products: " + error.message);
            return rejectWithValue("Error fetching products: " + error.message);
        }
    }
);

export const HandleDeleteProduct = createAsyncThunk("products/HandleDeleteProduct",
    async ({ productId, index }, { rejectWithValue, dispatch }) => {
        try {
            if (productId <= 10) {
                const response = await axios.delete(`https://my-json-server.typicode.com/MangeshChaudhari2000/EcomApp2/Products/${productId}`);
                if (response.status !== 200) { // Check for status code
                    throw new Error('Network response was not ok');
                }
            }
            dispatch(productAction.deleteProduct(productId)) // Return the data directly
            toast.success("Deleted Product Successfully")
        } catch (error) {
            toast.error("Error removing product: " + error.message);
            return rejectWithValue("Error removing product: " + error.message);
        }
    }
);

export const HandleUpdateProduct = createAsyncThunk("products/HandleUpdateProduct",
    async ({ productData }, { rejectWithValue, dispatch }) => {
        try {
            var response = null;
            if (productData.id <= 10) {
                response = await axios.put(`https://my-json-server.typicode.com/MangeshChaudhari2000/EcomApp2/Products/${productData.id}`, productData);

                if (response.status !== 200) { // Check for status code
                    throw new Error('Network response was not ok');
                }
            }

            // console.log("HandleUpdateProduct called:"+ productData.title+productData.index);

            dispatch(productAction.updateProduct({ productData, index: productData.index }))
            toast.success("updated Product successfully")
        } catch (error) {
            toast.error("Error updating product: " + error.message);
            return rejectWithValue("Error updating product: " + error.message);
        }
    }
);

export const HandleAddProduct = createAsyncThunk("products/HandleAddProduct",
    async ({ productData }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`https://my-json-server.typicode.com/MangeshChaudhari2000/EcomApp2/Products/`, productData);

            if (response.status !== 201) { // Check for status code for created resource
                throw new Error('Network response was not ok');
            }
            console.log("HandleAddProduct called:" + productData.title);
            console.log("addProduct response:" + response.data); // Log the data from the response

            // Dispatch action with the newly added product
            dispatch(productAction.addProduct(response.data)); // Use response.data instead of response
            toast.success("Added product successfully")
        } catch (error) {
            toast.error("Error adding product: " + error.message);
            return rejectWithValue("Error adding product: " + error.message);
        }
    }
);

export const HandleAddCart = createAsyncThunk("products/HandleAddCart",
    async (productData, { rejectWithValue, dispatch }) => {
        try {
            console.log("handleAdd acrt" + productData);

            // Dispatch action with the product data
            dispatch(productAction.AddCart(productData));
            // toast.success("Added Cart successfully");
        } catch (error) {
            toast.error("Error adding cart: " + error.message);
            return rejectWithValue("Error adding cart: " + error.message);
        }
    }
);



// Create a slice of state for products
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload;

        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((data) => data.id != action.payload)
        },
        updateProduct: (state, action) => {
            const { productData, index } = action.payload; // Destructure productData and index from action.payload
            state.loading = false;
            // state.products[index] = productData;
            const index1 = state.products.findIndex((data) => data.id === productData.id);
            console.log("productData index insie updateProduct: " + index1);
            state.products[index1] = productData;
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        AddCart: (state, action) => {
            // Find the index of the product in the cart
            const index = state.carts.findIndex((item) => item.id === action.payload.id);

            // Check if the product already exists in the cart
            if (index !== -1) {
                // If it exists, increase the quantity
                state.carts[index].Qty += 1;
                toast.success("Quantity increased by 1") // Corrected the assignment of Qty
            } else {
                // If it does not exist, add the product with Qty set to 1
                state.carts.push({ ...action.payload, Qty: 1 });  // Spread action.payload and add Qty property
                toast.success("Product Added into Cart") // Corrected the assignment of Qty


            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(HandleGetProducts.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error
            })
            .addCase(HandleGetProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(HandleGetProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(HandleAddProduct.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error
            })
            .addCase(HandleAddProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(HandleUpdateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});

export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;
export const productSelector = (state) => state.productReducer;
