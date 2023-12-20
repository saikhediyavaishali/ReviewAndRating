import React, { useEffect } from 'react'
import star from '../../assets/Images/loginStar3new.png'
import './Login.css'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearState } from '../../features/review/reviewSlice';
import { ResetPasswords } from '../../features/auth/authSlice';

export const ResetPassword = () => {
  const param=useParams();
  const{token,id}=param;
  const dispatch=useDispatch()
  const navigate=useNavigate();

  const resetstate=useSelector((state)=>state.user);
  console.log(resetstate)

  const{error,message}=resetstate;
  console.log(error,message)

  // useEffect(()=>{
  //   if(reset_msg){
  //     toast.success(reset_msg,{position:toast.POSITION.TOP_CENTER});
  //     setTimeout(()=>{
  //       dispatch(clearState());
  //       navigate('/')
  //     },1000)
  //   }
  //   if(error){
  //     toast.error(error,{position:toast.POSITION.TOP_CENTER})
  //   }
  //  }, [reset_msg,error])
   

  const initialState={
    password:"",
    CPassword:"",
  }
  const validationSchema = yup.object().shape({
    password:yup.string().required('enter a new password'),
    CPassword:yup.string().required('enter a confirm password')
  });
  const handleSubmit=async(values)=>{
    console.log("values",values)
    let obj={
      ...values,
      id:id,
      token:token,
          };
          dispatch(ResetPasswords(obj))

  }
  return (
    <>
      <div className='resetPass-container'>
        <div className='reset-password'>
        <div className='reset-star'>
          <h2 className='reset-h2'>Reset Password</h2>
          <img src={star} className='reset-img'></img>
        </div> <br/>
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field style={{ height:"5vh",width:"65%",}}
                type="password"
                className="password"
                placeholder="Enter new password"
                name='password'
              ></Field>


              <ErrorMessage name="password"></ErrorMessage><br></br><br></br>
              <Field style={{ height:"5vh",width:"65%",}}
                type="password"
                className="Confirm password"
                placeholder="Enter confirm password"
                name='CPassword'
              ></Field>
               <ErrorMessage name="CPassword"></ErrorMessage><br></br><br></br>

               <button className="reset-btn">Reset</button>
            </Form>
          </Formik> 
        <hr/>
        </div>
        </div> 
    </>
  )
}
