import React, { useEffect } from "react";
import "./Company_list.css";
import star from "../../assets/Images/loginStar3new.png";
import men from "../../assets/Images/Profile Picture_1.png";

import company_logo from "../../assets/Images/Graffers.png"
import image from "../../assets/Images/image1.png";
import { Link, useNavigate } from "react-router-dom";
import sort from "./../../assets/Images/sort.png"
import companySlice, { getCompanies } from "../../features/company/companySlice";


import{useDispatch,useSelector} from "react-redux"
import { Navbar_new } from "../../navbar/Navbar_new";
export const Company_list = () => {
  const companies=useSelector((state)=>state.company);
  const {cmplist_msg,company_data,error,loadind,count}=companies;
  console.log(company_data)
  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getCompanies());
  },[]);
  return (
    <>
    <div className="main">
      <div className="company-list-container">
      <Navbar_new/>
       
        <div className="top2">
        <label style={{marginTop:"100px",marginLeft:"100px"}}>Select city</label><br></br>
        <input style={{marginLeft:"100px",height:"6vh", width:"20%", fontSize:"10px"}} type="text" placeholder="Indore,Madhya Pradesh,India"></input>
        <button style={{borderRadius: "10px", height:"6vh",width:"8%",backgroundColor:"orange", borderColor:"orange",fontSize:"15px",marginLeft:"20px"}}>Find Company</button>
        <button style={{borderRadius: "10px", height:"6vh",width:"8%",backgroundColor:"orange", borderColor:"orange",fontSize:"15px",marginLeft:"450px"}}>+Add Company</button>
        <img style={{height:"6vh",width:"5%",marginLeft:"10px"}} src={sort} className="Sort"></img>
       
        </div>
       
        {company_data &&
        company_data.map(({_id,company_logo,companyName,location,city,founded})=>(
          <Link className="Company_link" to={`/Companydetail/${_id}`}>
          <div className="company-list1">
          
            <img style={{width:"5%",height:"4vh",marginTop:"0px"}} className="list-image" src={`http://localhost:9000${company_logo}`}></img>
           
            <div className="xyz">
          <p>{founded}</p>
          <p>{companyName}</p>
          <p>{location}<br/>{city}</p>
          </div>


        
          </div>
          
            </Link> 
         
        )

        )

        }
        <div className="company-list">
          
         
          <div className="company-list2"></div>
        </div>
      
        
      </div>
      </div>
      
    </>
  );
};
