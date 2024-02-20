import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false)
    const logOut = async() => {
        setLoading(true);
        try{
        const response = await axios.get('http://127.0.0.1:8000/api/signout');
        if(response.data?.success == true){
            localStorage.removeItem('Auth');
            toast.success('Logout successfully')
            setLoading(false);
            navigate('/')
        }
        }catch(error){
            setLoading(false);
            console.log(error);
        }

    }
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="pushmenu"
                            href="#"
                            role="button"
                        >
                            <i className="fas fa-bars"></i>
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/caustomer" className="nav-link">
                            Home
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        
                       
                    </li>

                   
                    <li className="nav-item dropdown">
                        
                        
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="fullscreen"
                            href="#"
                            role="button"
                        >
                            <i className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <Button loading={loading} onClick={()=>logOut()} style={{ height:'45px'  }} className="btn-secondary mr-3 col-sm-12">Logout</Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
