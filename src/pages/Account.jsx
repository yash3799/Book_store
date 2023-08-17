import React, { useState } from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import userservice from "../service/user.service"
import { toast } from 'react-toastify';
import validation from '../context/validation';
import { useGlobalContext } from '../context/userContext';

export default function Account() {
  const userinfo = JSON.parse(localStorage.getItem("User"));
  const user = useGlobalContext();

  const userinfo_initalform = {
    id: userinfo.id,
    role: userinfo.role,
    firstName: userinfo.firstName,
    lastName: userinfo.lastName,
    email: userinfo.email,
    roleId: userinfo.roleId,
    password: "",
    confirmPassword: "",
  }
  const [edituserinfo, setEdituserinfo] = useState(false);

  const roleList = [
    { id: 2, name: "Buyer" },
    { id: 3, name: "Seller" },
  ];

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: userinfo_initalform,
    validationSchema: validation.accunt_validation,
    onSubmit: (values) => {
      delete values.confirmPassword;
      localStorage.removeItem("User");
      userservice.updateProfile(values).then((res) => {
        if (res.status === 400) {
          toast.error("Enter valid data", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else {
          user.setUser(res);
          toast.success("Successfully registered", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      });
    },
  })

  const edituser = () => {
    setEdituserinfo(true);
  }
  return (
    <div style={{ backgroundColor: "#eeee" }}>
      <Nav />
      <div className="m-5">
        <div className="container d-flex justify-content-center " style={{ backgroundColor: "#eeee" }}>
          <div className="row" style={{ backgroundColor: "#eeee" }}>
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="..."
                      />
                    </div>
                    <div className="col-lg-6 px-xl-10">
                      <div >
                        <h3 className="h2 mb-0 ">{userinfo.firstName} {userinfo.lastName}</h3>
                      </div>
                      <ul className="list-unstyled mb-1-9">
                        <li className="display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            <br />
                            Email :
                          </span>{" "}
                          {userinfo.email}
                        </li>
                        <li className="display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            <br />
                            role :
                          </span>{" "}
                          {userinfo.role}
                        </li>
                        <li className="display-28">
                          <span className="display-26 text-secondary me-2 font-weight-600">
                            <br />
                            EditUser Profile :
                          </span>{" "}
                          <EditIcon onClick={edituser} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {edituserinfo === true ?
              <form onSubmit={onsubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="text"
                      id="form3Example1c"
                      className="form-control"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-label" htmlFor="form3Example1c">
                      {errors.firstName && touched.firstName ? errors.firstName : "Your FirstName"}
                    </label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="text"
                      id="form3Example1c"
                      className="form-control"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-label" htmlFor="form3Example1c">
                      {errors.lastName && touched.lastName ? errors.lastName : "Your LastName"}
                    </label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="dropdown">
                    <select
                      className="ropdown-menu dropdown-menu-dark btn btn-dark select"
                      id={"roleId"}
                      name="roleId"
                      value={values.roleId}
                      onChange={handleChange}>

                      {roleList.length > 0 &&
                        roleList.map((role) => (
                          <option className="m-1"
                            value={role.id}
                            key={"name" + role.id}
                          >
                            {role.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="email"
                      id="form3Example3c"
                      className="form-control"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-label" htmlFor="form3Example3c">
                      {errors.email && touched.email ? errors.email : "Your Email"}
                    </label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="password"
                      id="form3Example4c"
                      className="form-control"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-label" htmlFor="form3Example4c">
                      {errors.password && touched.password ? errors.password : "Your Password"}
                    </label>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="password"
                      id="form3Example4cd"
                      className="form-control"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-label" htmlFor="form3Example4cd">
                      {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : "Repeat your password"}
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button
                    type="button"
                    className="btn btn-dark btn-lg m-3"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </form>
              :
              ""
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
