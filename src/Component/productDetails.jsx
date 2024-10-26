import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  Collapse,
  Button,
  Grid,
  DialogTitle,
} from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HandleAddCart } from "../Redux/productReducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductDetails = ({ open, handleClose, productData }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const toggleAddCart = () => {
    dispatch(HandleAddCart(productData));
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ alignItems: "center" }}>Product details</DialogTitle>
        <DialogContent>
          <Card
            className="bg-slate-800"
            sx={{ maxWidth: 900, display: "flex", p: 2, bgcolor: "White" }}
          >
            <CardMedia
              component="img"
              sx={{ width: 180, height: 180, objectFit: "contain" }} // Adjust size as necessary
              image={productData.image}
              alt="Product Image"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{productData.title}</Typography>
              <Badge
                sx={{ marginLeft: "auto" }}
                badgeContent={productData.rating.count}
                color="warning"
              >
                <Stack spacing={1}>
                  <Rating
                    name="rating"
                    value={productData.rating.rate}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </Badge>

              <Typography
                variant="h6"
                marginBottom={1}
              >{`$${productData.price}`}</Typography>
              {expanded ? null : (
                <Typography variant="body2">
                  {productData.description.substring(0, 100)}...
                </Typography>
              )}

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2">
                  {productData.description}
                </Typography>
              </Collapse>
              <Button onClick={handleExpandClick} size="small" marginBottom={2}>
                {expanded ? "Show Less" : "Show More"}
              </Button>
              <Button
                onClick={() => toggleAddCart()}
                variant="contained"
                endIcon={<AddShoppingCartIcon />}
                aria-label="Add to Cart"
                sx={{ marginTop: 2 }} // Adjusted color and margin
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
