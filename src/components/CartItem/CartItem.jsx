//---------------------imports---------------------//
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "@google/model-viewer";
import {
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
} from "@mui/material";
import Model from "../Model/Model";
import "./CartItem.css";

function CartItem({ item, index }) {
  //---------------------local state---------------------//
  // hook to set selected quantity of item
  const [qty, setQty] = useState(item.qty);

  //---------------------imported methods---------------------//
  const dispatch = useDispatch();

  //---------------------on mount---------------------//
  // when there's a change in cart item's quantity (usually from add printer btn), display new qty
  useEffect(() => {
    setQty(item.qty);
  }, [item.qty]);

  //---------------------event handlers---------------------//
  // on click, opens modal to confirm delete from cart action
  const removeItem = (cartID) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: {
        type: "deleteCartItem",
        open: true,
        cart_id: cartID,
        message: "Are you sure you want to remove this design from your cart?",
      },
    });
  };

  // on change, update cart item qty in local state
  const handleChange = (event) => {
    setQty(event.target.value);
  };

  // on click, update cart item quantity in cart item table in database
  const updateCartQty = () => {
    dispatch({
      type: "UPDATE_CART_QTY",
      payload: {
        id: item.id,
        qty: qty,
        message: "Quantity updated",
      },
    });
  };

  const cardStyle = {
    transitionDuration: "2.3s",
    background: "#A9E4EF",
    color: "black",
  };

  //---------------------JSX return---------------------//
  return (
    <>
      <Grid
        container
        key={item.id}
        spacing={4}
        direction="row"
        justifyContent="space-between"
        alignItems="top"
      >
        {/* if item is a printer, show plain image. If it's a lure, show 3D model */}
        {item.design_id === -1 ? (
          <Grid item xs={2}>
            <model-viewer
              style={{ maxWidth: "100%", height: "200px" }}
              src="/model/PrinterImage.glb"
              camera-orbit="45deg 94.69deg auto"
              camera-target="3.445m 15.98m 100m"
              interaction-prompt="none"
              camera-controls
              ar
              ar-modes="webxr scene-viewer quick-look"
            ></model-viewer>
          </Grid>
        ) : (
          <Grid item xs={2}>
            <Model
              texture={item.image}
              reference={"ref" + index}
              model={`/model/lureCart${index}.glb`}
              interaction="none"
            />
          </Grid>
        )}

        <Grid item xs={8} sx={{ mt: 5 }}>
          <Typography variant="body1" p={1}>
            Title: {item.title} <br />
            Description: {item.description}
          </Typography>
          <FormControl size="small">
            <InputLabel>Qty</InputLabel>
            <Select
              labelId="update-quantity-label"
              id="update-qty"
              value={qty}
              label="Quantity"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{ ml: 2 }} onClick={updateCartQty}>
            Update Qty
          </Button>
        </Grid>

        <Grid item xs={2} sx={{ mt: 6 }}>
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              removeItem(item.id);
            }}
          >
            Remove
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CartItem;
