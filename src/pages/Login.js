import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (value) => {
        try {
            dispatch({
                type: 'SHOW_LOADING'
            });
            const res = await axios.post("/api/users/login", value);
            dispatch({ type: "HIDE_LOADING" });
            message.success('User login berhasil');
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate('/');
        } catch (error) {
            dispatch({ type: "HIDE_LOADING" });
            message.error('Ada kesalahan')
            console.log(error)
        }
    };

    // currently login user
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            localStorage.getItem("auth");
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <div className='register'>
                <div className='register-form'>
                    <h1>Loundry</h1>
                    <h3>Halaman Login</h3>
                    <Form
                        layout='vertical'
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="userId" label="User ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type='password' />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <p>
                                not a user PLease
                                <Link to="/register"> register Here !</Link>
                            </p>
                            <Button type='primary' htmlType='submit'>
                                Login
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login