import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HandleUpdateProduct } from "../Redux/productReducer";

const ProductUpdate = ({ open, handleClose, productData, index }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    rate: "",
    count: "",
  });

  useEffect(() => {
    if (productData) {
      setInput({
        title: productData.title,
        price: productData.price,
        description: productData.description,
        image: productData.image,
        rate: productData.rating.rate,
        count: productData.rating.count,
      });
    }
  }, [productData]);

  const handleSubmit = () => {
    dispatch(
      HandleUpdateProduct({
        productData: {
          id: productData.id,
          title: input.title,
          price: input.price,
          description: input.description,
          image: input.image,
          rating: {
            rate: input.rate,
            count: input.count,
          },
          index: index, // Add index here
        },
      })
    );
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
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
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
            required
          />
          <TextField
            label="Image"
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
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleSubmit()}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductUpdate;
