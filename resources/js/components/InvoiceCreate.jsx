import { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

export default function InvoiceCreate() {
    const [cutomerName, setCutomerName] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const [loading  , setLoading] = useState(false)
    const navigate = useNavigate();
    let { id } = useParams();

    const [userData, setUserData] = useState([]);
    const getUser = async () => {
        const responsess = await axios.get(
            "http://127.0.0.1:8000/api/customer"
        );
        setUserData(responsess?.data?.data?.customer);
    };

    const invoiceDetails = async () => {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/invoice/details/${id}`
        );
        if(response?.data?.sucess == true){
            setCutomerName(response?.data?.data?.customer_id);
            setDate(response?.data?.data?.date);
            setAmount(response?.data?.data?.amount);
            setStatus(response?.data?.data?.status);
        }
    };

    useEffect(() => {
        if(id){
            invoiceDetails();
        }
        getUser();
    }, []);

    const createInvoice = async (e) => {
        setLoading(true)
        e.preventDefault();
        const data = {
            customer_id: cutomerName,
            date: date,
            amount: amount,
            status: status,
        };
        if(id){
            const response = await axios.post(
                `http://127.0.0.1:8000/api/invoice/update/${id}`,
                data
            );
        if (response?.data?.sucess == true) {
            setCutomerName("");
            setDate("");
            setAmount("");
            setStatus("");
            toast.success('invoice updated succesfully');
            setLoading(false)
            navigate("/invoice");
        }
        }else{
            const response = await axios.post(
                "http://127.0.0.1:8000/api/invoice/create",
                data
            );
            if (response?.data?.sucess == true) {
                setCutomerName("");
                setDate("");
                setAmount("");
                setStatus("");
                toast.success('invoice updated succesfully');
                setLoading(false)
                navigate("/invoice");
            }
        }
        
        
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Invoice</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/caustomer">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-primary m-1"
                                        >
                                            Invoice List
                                        </button>
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
                                            <h3 className="card-title">
                                                { id ? 'Edit' : 'Create'} Invoice
                                            </h3>
                                        </div>
                                        {/* <!-- /.card-header --> */}
                                        <form onSubmit={createInvoice}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* <!-- text input --> */}
                                                        <div className="form-group">
                                                            <label>
                                                                Customer
                                                            </label>
                                                            <select
                                                                className="form-control select2"
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                onChange={(e) =>
                                                                    setCutomerName(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                                value={cutomerName}
                                                            >
                                                                <option value=""></option>
                                                                {userData?.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            
                                                                            <option
                                                                                key={
                                                                                    index
                                                                                }
                                                                                value={
                                                                                    item?.id
                                                                                }
                                                                            >
                                                                                {
                                                                                    item?.name
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>Date</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        <i className="far fa-calendar-alt"></i>
                                                                    </span>
                                                                </div>

                                                                <InputMask
                                                                    required
                                                                    mask="9999-99-99"
                                                                    //   maskPlaceholder=""
                                                                    className="form-control datemask"
                                                                    value={date}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDate(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        {/* <!-- text input --> */}
                                                        <div className="form-group">
                                                            <label>
                                                                Amount
                                                            </label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text">
                                                                        $
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={amount}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAmount(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    required
                                                                />
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text">
                                                                        .00
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label>
                                                                Status
                                                            </label>
                                                            <select
                                                                className="form-control select2"
                                                                value={status}
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                                onChange={(e) =>
                                                                    setStatus(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                            >
                                                                <option value="" ></option>
                                                                <option value="Unpaid">
                                                                    Unpaid
                                                                </option>
                                                                <option value="Cancelled">
                                                                    Cancelled
                                                                </option>
                                                                <option value="Paid">
                                                                    Paid
                                                                </option>
                                                            </select>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary col-sm-1"
                                                >
                                                    Submit
                                                </button>
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
