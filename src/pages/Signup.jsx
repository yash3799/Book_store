import Nav from '../Components/Nav';
import { useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import authService from "../service/auth.service"
import 'react-toastify/dist/ReactToastify.css';
import validation from '../context/validation';

export default function Signup() {
  const navigate = useNavigate();

  const signup_initalform = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 2,
    password: "",
    confirmPassword: "",
  }
  const roleList = [
    { id: 2, name: "Buyer" },
    { id: 3, name: "Seller" },
  ];

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: signup_initalform,
    validationSchema: validation.signup_validation,
    onSubmit: (values) => {
      // console.log(values);
      delete values.confirmPassword;
      authService.create(values).then((res) => {
        if (res.status === 400) {
          toast.error("Enter valid data", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
        else {
          navigate('/signin')
          toast.success("Successfully registered", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      });
    },
  })

  const signin_page = () => {
    navigate('/signin')
  };
  return (
    <div>
      <Nav />
      <section className="vh-100%" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11 m-3">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
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
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
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
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
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
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
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
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
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
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
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
                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue=""
                            id="form2Example3c"
                          />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div> */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-dark btn-lg m-3"
                            onClick={signin_page}
                          >
                            Sign in
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark btn-lg m-3"
                            onClick={handleSubmit}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample_image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
