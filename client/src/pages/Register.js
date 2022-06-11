import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../resources/authentication.css';
import axios from "axios";
import Spinner from "../components/Spinner";

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(true);
    const onFinish=async(values) => {
        try {
            setLoading(true);
            await axios.post('api/users/register', values);
            setLoading(false);
            message.success('Registration Successfull');
        } catch (error) {
            setLoading(true);
            message.error('Error Something when wrong!');
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
                <div className="col-md-5">
                    <h1>SHEY-MONEY REGISTER</h1>
                    <hr />
                    <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="password" name="password">
                        <Input type="password" />
                    </Form.Item>

                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/login">Already Registered, Click Here To Login</Link>
                        <button className="primary" type="submit">REGISTER</button>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
