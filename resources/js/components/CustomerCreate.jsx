import { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap-button-loader';


export default function CustomerCreate() {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [address , setAddress] = useState('');
    const [phone , setPhone] = useState('');
    const [loading  , setLoading] = useState(false)
    let { id } = useParams();

    const navigate = useNavigate();

    const customerDetails = async () => {
      const response = await axios.get(
          `http://127.0.0.1:8000/api/customer/details/${id}`
      );
      if(response?.data?.sucess == true){
        setName(response?.data?.data?.name);
        setEmail(response?.data?.data?.email);
        setAddress(response?.data?.data?.address);
        setPhone(response?.data?.data?.phone);
      }
  };

  useEffect(() => {
    if(id){
      customerDetails();
    }
}, []);

    const createUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            name:name,
            email:email,
            phone:phone,
            address:address
        }
        if(id){
          const responsess = await axios.post(`http://127.0.0.1:8000/api/customer/update/${id}`, data);
          console.log(responsess, 'responsess');
          if(responsess?.data?.sucess == true){
              setName('');
              setEmail('');
              setAddress('');
              setPhone('');
              toast.success('customer updated sucessfully')
              setLoading(false)
              navigate('/caustomer');
          };
        }

        else{
          const responsess = await axios.post("http://127.0.0.1:8000/api/customer/create/customerCreate", data);
          console.log(responsess, 'responsess');
          if(responsess?.data?.sucess == true){
              setName('');
              setEmail('');
              setAddress('');
              setPhone('');
              toast.success('customer create sucessfully')
              setLoading(false)
              navigate('/caustomer');
          };
        }
    };
    
    return (
        <Layout>
            <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Customer</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">DataTables</li> */}
              <Link to="/caustomer">
              <button type="button" className="btn btn-block btn-primary m-1">Customer List</button>
              </Link>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
               <div className=" card-primary">
              <div className="card-header">
                <h3 className="card-title">Customer { id ? 'Edit' : 'Create'}</h3>
              </div>
              {/* <!-- /.card-header --> */}
                <form onSubmit={createUser}>
              <div className="card-body">

                  <div className="row">
                    <div className="col-sm-6">
                      {/* <!-- text input --> */}
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter ..." onChange={(e)=>setName(e.target.value)} value={name} required/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter ..." style={{ margin:'0px' }} onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      {/* <!-- text input --> */}
                      <div className="form-group">
                        <label>phone</label>
                        <input type="text" className="form-control" placeholder="Enter ..." onChange={(e)=>setPhone(e.target.value)} required value={phone}/>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>address</label>
                        <textarea className="form-control" rows="3" placeholder="Enter ..." onChange={(e)=>setAddress(e.target.value)} required value={address}/>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="card-footer">
                  {/* <button type="submit" className="btn btn-primary col-sm-1">Submit</button> */}
                  <Button loading={loading} type='submit'  style={{ height:'38px'  }} className="col-sm-1">Submit</Button>
                </div>
                </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
        </Layout>
    );
}
