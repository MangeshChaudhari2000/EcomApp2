import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  Typography,
  Collapse,
  Button,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { HandleAddCart, HandleDeleteProduct } from "../Redux/productReducer";
import ProductUpdate from "./ProductUpdate";
import ProductDetails from "./productDetails";

const ProductCard = ({ productData, index }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [detailsPageModal, setDetailsPageModal] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {openModal && (
        <ProductUpdate
          open={openModal}
          handleClose={() => setOpenModal(false)}
          productData={productData}
          index={index}
        />
      )}
      {detailsPageModal && (
        <ProductDetails
          open={detailsPageModal}
          handleClose={() => setDetailsPageModal(false)}
          productData={productData}
        />
      )}
      <Card
        className="bg-slate-800"
        sx={{ maxWidth: 900, display: "flex", p: 2, bgcolor: "White" }}
      >
        <CardMedia
          onClick={() => setDetailsPageModal(true)}
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
            <Typography variant="body2">{productData.description}</Typography>
          </Collapse>
          <Button onClick={handleExpandClick} size="small">
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={() => setOpenModal(true)} aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              dispatch(
                HandleDeleteProduct({ productId: productData.id, index })
              )
            }
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Button
          onClick={() => dispatch(HandleAddCart(productData))}
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
          aria-label="Add to Cart"
          sx={{ marginTop: 2 }} // Adjusted color and margin
        >
          Add to Cart
        </Button>
      </Card>
    </>
  );
};

export default ProductCard;
