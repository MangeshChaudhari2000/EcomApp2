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
} from "@mui/material";
import React, { useState } from "react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { HandleAddCart } from "../Redux/productReducer";

const CartCard = ({ productData }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("carts prodData: " + productData);

  return (
    <>
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
          <Typography variant="h6" marginBottom={1}>Qty: {productData.Qty}</Typography>
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
      </Card>
    </>
  );
};

export default CartCard;
