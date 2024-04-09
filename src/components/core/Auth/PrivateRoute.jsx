import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if (token != null) {
        return children
    }
    else {
        return navigate("/login");
    }

}

export default PrivateRoute;