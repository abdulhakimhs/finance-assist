import { Form, message } from "antd";
import Input from "antd/lib/input/Input"
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../resources/authentication.css';
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = async(values) => {
        try {
            setLoading(true);
            const response = await axios.post('api/users/login', values);
            localStorage.setItem('sheymoney-user', JSON.stringify({...response.data, password:''}));
            setLoading(false);
            message.success('Login Successfull');
            navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('Login Failed');
        }
    }

    useEffect(()=>{
        if (localStorage.getItem("sheymoney-user")) {
            navigate("/")
        }
    },[])

    return (
        <div className="register">
            {loading && <Spinner/>}
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-5">
                    <h1>SHEY-MONEY LOGIN</h1>
                    <hr />
                    <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="password" name="password">
                        <Input type="password" />
                    </Form.Item>

                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/register">Not Registered yet? Click here ro register</Link>
                        <button className="primary" type="submit">Login</button>
                    </div>
                    </Form>
                </div>
                <div className="col-md-5">
                    <div className="lottie">
                    <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                    ></lottie-player>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
