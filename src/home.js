import react from "react"
import {Link} from "react-router-dom"
import Sidebar from "./Components/sidebar/sidebar"


export default function Home(){
    return(
        <Sidebar>
        <div>
         <Link to={"/login"}>Login</Link>
         <hr/>
         <Link to={"/signup"}>signup</Link>
         <hr/>
         <Link to={"/forgotpassword"}>forgotpassword</Link>
         <hr/>
         <Link to={"/resetpassword"}>reset password</Link>
         <hr></hr>
         <Link to={'/adduser'}>adduser</Link>
         <hr/>
         <Link to={"/updateuser"}>update user</Link>
        <hr/>
        <Link to={"/add/vegetable"}>add vegetable</Link>
        <hr/>
        <Link to={"/list/vegetable"}>list vegetable</Link>
        </div>
        </Sidebar>
    )
}