import Footer from "./Footer";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

export default function Layout({children}){
     return(
        <>
            <Navbar/>
            <Sidebar/>
            { children  }
            <Footer/>
        </>
    )

}