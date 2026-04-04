import { useState } from "react";
import AppConttext from "./appContext";


const AppProvider = (props) => {
    const [cart, setcart] = useState([]);
    const [user, setUser] = useState();
    const value = {
        cart, setcart,
        user, setUser
    };
    return (
        <AppConttext.Provider value={value}>
            {props.children}
        </AppConttext.Provider >
    )
}
export default AppProvider