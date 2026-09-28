import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";

const GoogleSuccess = () => {
    const { setToken, navigate } = useContext(ShopContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            setToken(token);
            localStorage.setItem("token", token);
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [setToken, navigate]);

    return null;
};

export default GoogleSuccess;