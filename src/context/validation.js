import * as Yup from 'yup';

const signup_validation = Yup.object({
    firstName: Yup.string().min(2).max(20).required("Invalid UserFirstName"),
    lastName: Yup.string().min(2).max(20).required("Invalid UserLastName"),
    // roleId: Yup.number().required("Role is required"),
    email: Yup.string().email("Not a email").required("Invalid Email"),
    password: Yup.string().min(6).max(8).required("Invalid Password"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null, "Password Must Be Match"]).required("Invalid Repeat Password"),
});

const signin_validation = Yup.object({
    email: Yup.string().email("Invalid email").required("Invalid Email"),
    password: Yup.string().min(6).max(8).required("Invalid Password"),
});

const accunt_validation = Yup.object({
    firstName: Yup.string().min(2).max(20).required("Invalid UserFirstName"),
    lastName: Yup.string().min(2).max(20).required("Invalid UserLastName"),
    roleId: Yup.number().required("Role is required"),
    email: Yup.string().email("Not a email").required("Invalid Email"),
    password: Yup.string().min(6).max(8).required("Invalid Password"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null, "Password Must Be Match"]).required("Invalid Repeat Password"),
});

const validation = {
    signup_validation,
    signin_validation,
    accunt_validation,
};

export default validation;