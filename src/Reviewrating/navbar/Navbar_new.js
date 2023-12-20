import React from 'react'
import "./Navbr_new.css"
import logo from "./../assets/Images/Group 1.png"
import man from "./../assets/Images/Ellipse 6.png"
import ayush from "./../assets/Images/Ayush.png"
import {Link, useNavigate } from 'react-router-dom'

export const Navbar_new = () => {
  const navigate=useNavigate();
  const res=localStorage.getItem("user")

  const user=JSON.parse(res);
  const handleLogout=()=>{
    localStorage.clear();
  }
  return (
    <div>
      <div className='top'>
      <img  style={{marginLeft:"10px",height:"6vh",width:"13%",marginTop:"5px"}} src={logo} className="reviewLogo"></img>
      <input type="search" style={{width: "20%" ,border: "1px solid black",fontSize:"15px", marginLeft:"150px",height:"4.5vh",marginTop:"10px"}}placeholder='Search...'></input>
      <h4 style={{marginLeft:"20px",height:"5vh",width:"12%",marginTop:"5px"}} >Welcome:{user?.name}</h4>
   <img style={{height:"5vh",width:"5%",marginLeft:"50px"}} src={`http://localhost:9000${user?.profilepic}`}className='Ayush'></img>
  <Link to ="/"> <button style={{height:"5vh",width:"97%",marginLeft:"40px", marginTop:"5px", backgroundColor:"orange", borderColor:"orange", fontSize:"15px"}} onClick={{handleLogout}} type='submit'>Logout</button></Link>

      </div>
    
    </div>
  )
}
