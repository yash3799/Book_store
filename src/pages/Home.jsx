// import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import bookService from "../service/book.service"
import categoryService from "../service/category.service"

export default function Home() {
  // const API = "http://localhost:5000/api/book"

  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const defaultFilter = {
    pageIndex: 1,
    pageSize: 12,
    keyword: "",
  };
  const [categories, setCategories] = useState([]);
  // const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  return (
    <div className="bg-body-tertiary">
      <Nav />
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="nav-item">
            Total Book :
            <span>  {bookResponse.totalItems} items</span>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Book"
                aria-label="Search"
                name="bookname"
                value={filters.keyword}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    keyword: e.target.value,
                    pageIndex: 1,
                  });
                }}
              />
            </form>
          </div>
        </div>
      </nav>
      <div className='row'>
        {books.map((e) => {
          return (
            <div className='col-sm-3 ' key={e._id}>
              <Card title={e.name.slice(0, 40)} description={e.description.slice(0, 40)} img={e.base64image} web={e.url} id={e.id} price={e.price}/>
            </div>
          )
        })}
      </div>
      <footer>
        <div className="d-flex justify-content-center bg-body-tertiary">
          <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
        <Footer />
      </footer>
    </div>
  )
}
