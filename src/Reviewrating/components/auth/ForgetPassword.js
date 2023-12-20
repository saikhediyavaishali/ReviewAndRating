import React, { useEffect } from "react";
import "./Login.css";
import star from "../../assets/Images/loginStar3new.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {clearState, forgetpassword } from "../../features/auth/authSlice";
import {useNavigate, useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ForgetPassword = () => {
  const initialState = {
    email: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter your email"),
  });
  const dispatch=useDispatch();
  const handleSubmit=async(values)=>{
    console.log("values",values)
    dispatch(forgetpassword(values))
  }
 
  // useEffect(()=>{
  //   if(forget_msg){
  //     toast.success(forget_msg,{position:toast.POSITION.TOP_CENTER});
  //     setTimeout(()=>{
  //       dispatch(clearState());
  //       navigate('/')
  //     },1000)
  //   }
  //   if(error){
  //     toast.error(error,{position:toast.POSITION.TOP_CENTER})
  //   }
  //  }, [forget_msg,error])


  

  return (
    <div>
      <div className="resetPass-container">
        <div className="reset-password">
          <div className="reset-star">
            <h2 className="reset-h2">Reset Password</h2>
            <img src={star} className="reset-img"></img><br/>
          </div>
<br/><br/>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field style={{ height:"5vh",width:"69%",borderRadius:"6px"}}
                type="text"
                className="reset-Field"
                placeholder="&#x2709; Enter Email"
                name='email'
              ></Field>
              <ErrorMessage name="email"></ErrorMessage><br></br><br></br>

              <button className="reset-btn">Reset</button>
            </Form>
          </Formik>
         
          <hr />
        </div>
      </div>
    </div>
  );
};
