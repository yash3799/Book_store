import React, { useEffect } from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import bookService from "../service/book.service"
import { useGlobalContext } from "../context/userContext";
import { useCartContext } from '../context/cart';
import { useNavigate } from 'react-router-dom'
import cartService from "../service/cart.service";
import { toast } from 'react-toastify';

export default function Bookdetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authContext = useGlobalContext();
  const cartContext = useCartContext();
  const [bookdetail, setBookdetail] = useState([]);

  const findBook = async (e) => {
    bookService.getById(Number(id)).then((res) => {
      setBookdetail(res);
    });
  }
  useEffect(() => {
    findBook();
  }, [setBookdetail])

  const addToCart = async (book, id) => {
    return cartService
      .add({
        userId: id,
        bookId: book.id,
        quantity: 1,
      })
      .then((res) => {
        return { error: false, message: "Item added in cart" };
      })
      .catch((e) => {
        // if (e.status === 500)
        //   return { error: true, message: "Item already in the cart" };
        // else return { error: true, message: "something went w  rong" };
      });
  };

  const addcartitem = () => {
    addToCart(bookdetail, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } 
      else {
        toast.success(res.message);
        cartContext.updateCart();
        navigate('/cart')
      }
    });
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="card m-3">
          <div className="card-body">
            <h3 className="card-title mb-2">{bookdetail.name}</h3>
            <h6 className="card-subtitle mb-2">Type - {bookdetail.category} </h6>
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-6 ">
                <div className="white-box text-center">
                  <img
                    src={bookdetail.base64image}
                    className="card-img-top rounded" alt="img"
                  />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-6 px-4">
                <h4 className="box-title mt-5">Product description</h4>
                <p>
                  {bookdetail.description}
                </p>
                <h2 className="mt-5">
                  ${bookdetail.price}<small className="text-success">(36%off)</small>
                </h2>
                <button className="btn btn-dark btn-rounded m-2" onClick={addcartitem}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
