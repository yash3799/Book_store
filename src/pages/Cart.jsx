import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import DeleteIcon from '@mui/icons-material/Delete';
import orderService from '../service/order.service';
import cartService from '../service/cart.service';
import { toast } from 'react-toastify';
import { useGlobalContext } from "../context/userContext";
import { useCartContext } from '../context/cart';
import { useNavigate, Link } from 'react-router-dom'

export default function Cart() {
  const authContext = useGlobalContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        toast.success("deleted successfully...");
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }

    try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (itemsInCart === 0) {
      toast.error("Your cart is empty");
    }
    else {
      if (authContext.user.id===0) {
        toast.error("Please Login!...");
      }
      else {
        const userCart = await cartService.getList(authContext.user.id);
        if (userCart.length) {
          try {
            let cartIds = userCart.map((element) => element.id);
            const newOrder = {
              userId: authContext.user.id,
              cartIds,
            };
            const res = await orderService.placeOrder(newOrder);
            if (res) {
              cartContext.updateCart();
              navigate("/");
              toast.success("order successfully");
            }
          } catch (error) {
            toast.error(`Order cannot be placed ${error}`);
          }
        }
      }
    }
  };

  return (
    <div>
      <Nav />
      <section className="h-100 h-custom" style={{ backgroundColor: "#eeee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: 15 }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 className="mb-0 text-muted">{itemsInCart} items</h6>
                        </div>
                        <hr className="my-4" />
                        {itemsInCart === 0 ?
                          <div className="d-flex justify-content-center bg-body-tertiary ">
                            <h6 className="fw-bold display-1">
                              NO ITEMS
                            </h6>
                          </div>
                          :
                          cartList.map((e) => {
                            return (
                              <div className="row mb-4 d-flex justify-content-between align-items-center" key={e.id}>
                                <div className="col-md-2 col-lg-2 col-xl-2">
                                  <Link to={`/bookdetail/${e.book.id}`} className="nav-link active">
                                    <img
                                      src={e.book.base64image}
                                      className="img-fluid rounded-3"
                                      alt="Cotton T-shirt"
                                    />
                                  </Link>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-3">
                                  <h6 className="text-muted">{e.book.name.slice(0, 30)}</h6>
                                  <h6 className="text-black mb-0">{e.book.description.slice(0, 65)}</h6>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                  <Button
                                    className="btn btn-dark btn-block"
                                    onClick={() => updateQuantity(e, true)}
                                  >
                                    +
                                  </Button>
                                  <span className="mx-2">{e.quantity}</span>
                                  <Button
                                    className="btn btn-dark btn-block"
                                    onClick={() => updateQuantity(e, false)}
                                  >
                                    -
                                  </Button>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                  <h6 className="mb-0">${e.book.price}</h6>
                                </div>
                                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                  <DeleteIcon onClick={() => { removeItem(e.id) }} />
                                </div>
                                <hr className="my-4" />
                              </div>
                            )
                          })}
                        <hr className="my-4" />
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link rel="stylesheet" to="/" className="nav-link active">
                              <i className="fas fa-long-arrow-alt-left me-2" />
                              Back to shop
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">items {itemsInCart}</h5>
                          <h5>$ {totalPrice}</h5>
                        </div>
                        <h5 className="text-uppercase mb-3">Shipping</h5>
                        <div className="mb-4 pb-2">
                          <select className="ropdown-menu dropdown-menu-dark btn btn-dark select">
                            <option value={1}>Standard-Delivery- $5.00</option>
                            <option value={2}>Two Days</option>
                            <option value={3}>Three Days</option>
                            <option value={4}>Four Days</option>
                          </select>
                        </div>
                        <h5 className="text-uppercase mb-3">Give code</h5>
                        <div className="mb-5">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Examplea2"
                              className="form-control form-control-lg"
                            />
                            <label className="form-label" htmlFor="form3Examplea2">
                              Enter your code
                            </label>
                          </div>
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>$ {totalPrice}</h5>
                        </div>
                        <button
                          type="button"
                          className="btn btn-dark btn-block btn-lg"
                          data-mdb-ripple-color="dark"
                          onClick={placeOrder}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
