import react from "react"
import {Link} from "react-router-dom"


export default function Home(){
    return(
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
        </div>
    )
}