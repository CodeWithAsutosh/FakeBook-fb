import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import VanillaTilt from 'vanilla-tilt';
const baseURL = process.env.REACT_APP_BASE_URL;


const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const [err, setErr] = useState(null)

    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const boxRef = useRef(null);

    useEffect(() => {
        VanillaTilt.init(boxRef.current, {
            max: 25,
            speed: 400,
            glare: true,
        });
    }, []);

    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(inputs);
            if(res.status === true){
                navigate("/");
            }
        } catch (err) {
            setErr(err)
        }
    };


    return (
        <div className="login login-signup">
            <div className="box" ref={boxRef}>
                <div className="elements form"></div>
                <div className="elements name">
                    <h2>Login</h2>
                </div>
                <div className="elements content">
                    <form action="">
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <button onClick={handleLogin}>Login</button>
                        <p style={{ fontSize: "10px", marginTop: "12px" }}> Don't you have an account? <Link to="/signup"><span>Sign Up!</span></Link></p>
                    </form>
                </div>
                <div className="card"></div>
            </div>
        </div>
    )
}

export default Login