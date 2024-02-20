import React, { useEffect, useState } from "react";
import "../../css/app.css";
import image from "../../images/imgavatar2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap-button-loader';


export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

     useEffect(()=>{
        let login = localStorage.getItem('Auth');
        if(login){
          navigate('/caustomer');
        }
      },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios
                .get("http://127.0.0.1:8000/sanctum/csrf-cookie")
                .then((response) => {
                    // Login...
                    console.log(response);
                });

            // 2. Login user
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email,
                    password,
                }
            );

            // 3. Check login response
            if (response.data.success == true) {
                localStorage.setItem('Auth' , true);
                const responsess = await axios.get(
                    "http://127.0.0.1:8000/api/user"
                );
                setLoading(false)
                toast.success('Login Successfully');
                navigate("/caustomer");
            } else {
                setLoading(false)
                toast.error('invalid credential');
            }
        } catch (error) {
            setLoading(false)
            toast.error('invalid credential');
        }

    };
    return (
        <section>
            <div className="model">
                <div className="modal-content animate">
                    <div className="imgcontainer">
                    <img src={image} alt="avtar" className="avatar" />
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div className="container">
                        <label>
                            <b>Username</b>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Username"
                            name="uname"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>
                            <b>Password</b>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="psw"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button loading={loading} type='submit'  style={{ height:'45px'  }}>Login</Button>
                    </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
