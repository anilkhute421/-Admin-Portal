import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Invoice from "./Invoice";
import Protected from "./layouts/Protected";
import CustomerCreate from "./CustomerCreate";
import InvoiceCreate from "./InvoiceCreate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainApp() {
    return (
        <BrowserRouter>
            {/* Same as */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/caustomer"
                    element={<Protected Component={About} />}
                />
                <Route
                    path="/invoice"
                    element={<Protected Component={Invoice} />}
                />
                <Route
                    path="/customer-create"
                    element={<Protected Component={CustomerCreate} />}
                />
                <Route
                    path="/invoice-create"
                    element={<Protected Component={InvoiceCreate} />}
                />
                <Route
                    path="/invoice-edit/:id?"
                    element={<Protected Component={InvoiceCreate} />}
                />
                <Route
                    path="/customer-edit/:id?"
                    element={<Protected Component={CustomerCreate} />}
                />
                <Route path="*" element={<p>this page is not found</p>} />
                {/* <Route path="/contact/contactList" element={<Contact/>}/> */}
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("main-app")).render(
    <MainApp />
);
