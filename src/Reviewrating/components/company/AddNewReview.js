import React, { useEffect } from "react";
import "./AddNewReview.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, companyReview } from "../../features/review/reviewSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddNewReview = () => {
  const navigate = useNavigate()
  const param = useParams();
  const { id } = param;
  let user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

    const review = useSelector((state) => state.review);
  const { review_msg, loading, error } = review;

  useEffect(() => {
    if (review_msg) {
      toast.success(review_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate(`/companydetail/${id}`);
      }, 1000);
    } 
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [review_msg, error]);

  const initialState = {
    subject: "",
    review: "",
    rating: "",
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("Please enter subject"),
    review: yup.string().required("please enter review"),
    rating: yup.string().required("please enter rating"),
  });
  function handleSubmit(values) {
    console.log("values", values);
    let obj = {
      ...values,
      company_id: id,
      user_id: user._id,
    };
    dispatch(companyReview(obj));
  }

  return (
    <div>
      <ToastContainer />
      <div className="ar">
        <div className="ar1">
          <h2
            style={{
              marginTop: "40px",
              textAlign: "center",
              marginTop: "80px",
            }}
          >
            Add Review
          </h2>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                style={{
                  marginLeft: "30px",
                  height: "5vh",
                  width: "85%",
                  borderRadius: "4px",
                  fontSize: "15px",
                  marginTop: "10px",
                }} 
                type="text"
                id="subject"
                placeholder="Enter Subject"
                name="subject"
              />
              <br></br>
              <br></br>
              <ErrorMessage name="subject"></ErrorMessage>
                                                                                                          
              <Field
                style={{
                  marginLeft: "30px",
                  height: "10vh",
                  width: "85%",
                  borderRadius: "4px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
                type="text"
                id="review"
                placeholder="Enter your Review"
                name="review"
              />
              <br></br>
              <ErrorMessage name="review"></ErrorMessage>

              <Field
                style={{
                  marginLeft: "30px",
                  height: "5vh",
                  width: "85%",
                  borderRadius: "4px",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
                type="text"
                id="rating"
                placeholder="Enter Rating"
                name="rating"
              />
              <br></br>
              <br></br>
              <ErrorMessage name="rating"></ErrorMessage>

              <p style={{ marginLeft: "350px", fontSize: "15px" }}>Satisfied</p>
              <br></br>
              <button
                style={{
                  backgroundColor: "blueviolet",
                  borderColor: "blueviolet",
                  marginLeft: "200px",
                  color: "white",
                  fontSize: "15px",
                  height: "4vh",
                  width: "15%",
                }}
              >
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

