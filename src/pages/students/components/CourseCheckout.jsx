import React, {useEffect, useState} from "react";
import { useElements, useStripe , PaymentElement,} from "@stripe/react-stripe-js";
import './coursecheckout.css'
import { useNavigate } from "react-router-dom";
import { studentService } from "../../../api/apiService";

const CourseCheckout = (props) => {
  const navigate = useNavigate()
  const {getModal , course} = props
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
    }, [stripe]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
          }   
        setIsLoading(true);
        const { error , paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {      
              return_url: "http://localhost:5173/student/profile/my_course",
            },
            redirect: "if_required"
        });
        if (error && (error.type === "card_error" || error.type === "validation_error")) {

            setMessage(error.message);
        }else if (paymentIntent && paymentIntent.status === "succeeded"){
          const details = {
            transaction : paymentIntent.id,
            status : true,
            amount : paymentIntent.amount,
            course_id : course.id
          }
          const response = studentService.paymentSuccess(details)
          navigate('/student/profile/my_course')
        }else {
            setMessage("An unexpected error occurred.");
        }
        setIsLoading(false);
    };
    const paymentElementOptions = {
        layout: "tabs"
      }

    return (
        <div className="w-screen h-screen overflow-y-scroll">
            <div className="md:m-10 bg-white px-10  py-20 rounded-md shadow-md ">
                <h2 className="text-center text-2xl font-bold mb-4">{course.name}</h2>
                <p className="text-gray-600 mb-4">{course.short_description}</p>
                <div className="mb-4">
                    <p>Upgrade Course for <span className="text-lg font-bold text-indigo-600">${course.course_price}</span></p>               
                </div>
                <div className="flex justify-center gap-10">         
                    <section>
                        <h1 className="mb-2 font-bold underline underline-offset-2 decoration-2">Upgrade Benefits</h1>
                        <ul className="list-disc pl-6">
                            <li className="mb-2">Comprehensive access to all course lessons</li>
                            <li className="mb-2">Option to save lessons to a personalized playlist</li>
                            <li className="mb-2">Lifetime access to the entire course content</li>
                            <li className="mb-2">Official certificate upon successful completion of the course</li>
                        </ul>
                    </section>
                     <section>
                        <h1 className="mb-2 font-bold underline underline-offset-2 decoration-2">Current Features</h1>
                        <ul className="list-disc pl-6">
                            <li className="mb-2">Structured progression through lessons</li>
                            <li className="mb-2">Ability to save lessons to a designated "Saved Lessons" section</li>
                            <li className="mb-2">Access to the course until the end of the free trial period</li>
                            <li className="mb-2">Issuance of a completion certificate upon finishing the course</li>
                        </ul>
                    </section>
                </div> 
                <div className="w-full flex justify-center h-full mt-10">
                    <form onSubmit={handleSubmit} className="p-[40px] w-[30vw] min-w-[500px] self-center rounded border-2 border-[#32325d] h-[435px] relative grid">
                        <div className="">
                            <PaymentElement id="payment-element" options={paymentElementOptions} className="mb-6"/>
                        </div>
                        <div className="absolute left-0 bottom-6 w-full px-14">
                          <button  disabled={isLoading || !stripe || !elements} id="submit" className="bg-[#5469d4] w-full text-white rounded border-0 py-3 px-6 text-xs font-semibold cursor-pointer block shadow-[0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)]  disabled:opacity-50 disabled:cursor-default hover:bg-[#3A4994]">
                              <span id="button-text">
                              {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                              </span>
                          </button>
                          <button onClick={()=>getModal(false)}  disabled={isLoading} className="bg-red-500 mt-4 w-full text-white rounded border-0 py-3 px-6 text-xs font-semibold cursor-pointer block shadow-[0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)]  disabled:opacity-50 disabled:cursor-default hover:bg-red-600">
                              <span id="button-text">
                              Cancel Payment
                              </span>
                          </button>
                        </div>
                        {message && <div id="payment-message" className="text-[rgb(105, 115, 134)] text-[16px] leading-5 pt-3 text-center">{message}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CourseCheckout;