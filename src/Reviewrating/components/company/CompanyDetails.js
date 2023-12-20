import React, { useEffect } from 'react'
import './CompanyDetails.css'
import Logo from './../../assets/Images/Group 1.png'
import Man from './../../assets/Images/Ellipse 6.png'
import Graffers from './../../assets/Images/Graffers.png'
import Jorgue from './../../assets/Images/Jorgue.png'
import Jenny from './../../assets/Images/Jenny.png'
import Ayush from './../../assets/Images/Ayush.png'
import { Navbar_new } from '../../navbar/Navbar_new'
import { useParams } from 'react-router-dom'
import { getCompanies, getCompanyDetails } from '../../features/company/companySlice'
import { useDispatch, useSelector } from 'react-redux'

import {Link} from "react-router-dom"

export const CompanyDetails = () => {
  const dispatch=useDispatch();
 
  
  const param=useParams()
  const {id}=param;
  const companyData=useSelector((state)=>state.company);
  const{company_details,companyDetails_msg}=companyData;
  const{companyDetails,comments}=company_details
  ;
  const{companyName,company_logo,city,founded,location}={...companyDetails};

  // console.log("comments",comments)
  useEffect(()=>{
    dispatch(getCompanyDetails(id));
  },[])
  return (
    <div>
     <div className='Comp'>
     <Navbar_new/>

<Link variant ='primary' to={`/addcompanyreview/${id}`}> <button style={{marginTop:"20px",marginLeft:"1050px", height:'5vh',width:"10%", backgroundColor:"orange",fontSize:"15px"}}>Add Review</button></Link>
 <div className='C1'>

 <img className="list-image" src={`http://localhost:9000${company_logo}`}></img>
 <div className='text'>
 


<p>{founded}</p>
<p>{companyName}</p>
<p>{location}<br/>{city}</p>
<p>4.5⭐⭐⭐⭐⭐ 45 Review</p> 
</div>
 </div>

  {comments &&
    comments.map((value)=>(
      <div className='B3'>
      <div className='abc'>
    <img style={{marginLeft:"20px", marginTop:"20px", height:"5vh",width:"5%"}}  src={`http://localhost:9000${value.user_id.profilepic}`}></img>
    
    <h2>{value.user_id.name}</h2>
    <p><span style={{marginLeft:"900px"}}>⭐⭐⭐⭐<span style={{fontSize:"25px"}}>☆</span></span></p>
    <p>{value.subject}</p>
    <p>{value.review}</p>
    <p>{value.rating}</p><br></br> <br></br><br></br>
   
   
   </div>
    </div>
    )) 
  }

 
    </div>
</div>
    

 


   
  
    

  
  
  





   
    
   

      

    
  )
}
