import { useState, createContext, useContext, useEffect } from "react";
import { toast } from 'react-toastify';

const UserContext = createContext();

const user_intialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};
const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(false);
    const [user, _setUser] = useState(user_intialUserValue);

    const setUser = (user) => {
        localStorage.setItem("User", JSON.stringify(user));
        setUserLogin(true);
        _setUser(user);
    };
    const user_logout =()=>{
        setUserLogin(false);
        _setUser(user_intialUserValue);
        localStorage.removeItem("User");
        toast.success("Successfully LogOut!...", {
            position: toast.POSITION.TOP_RIGHT
        });
        
    }
    useEffect(() => {
        const itemStr =
            JSON.parse(localStorage.getItem("User")) ||
            user_intialUserValue;
        // if the item doesn't exist, return null
        if (!itemStr.id) {
            // toast.error("Plsese Login...", {
            //     position: toast.POSITION.TOP_RIGHT
            // });
        }
        _setUser(itemStr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const userinfo = JSON.parse(localStorage.getItem('User'));
        if (userinfo) {
            setUserLogin(true);
        }
        else {
            setUserLogin(false);
        }
    }, [setUserLogin])

    const value = {
        user,
        setUser,
        userLogin,
        setUserLogin,
        user_logout,
    }
    // console.log(cartitem)
    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(UserContext);
}

export { UserProvider, useGlobalContext };