import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/icons/icons8-circled-l-100.png"
import { resetCart } from "../../slices/cartSlice";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        // initiliaze the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            { courses },
            {
                Authorization: `Bearer ${token}`,
            });
        if (!orderResponse) {
            throw new Error(orderResponse.data.message);
        }
        console.log("Order Response: ", orderResponse);
        // options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "LearniFi",
            description: "Thank You for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                // send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                // verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        // miss ho gaya tha
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("OOps, Payment Failed");
            console.log(response.error);
        })


    } catch (err) {
        console.log("Payment api error: " + err);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    } catch (err) {
        console.log("Payment seccess email error: " + err.message);
    }
}


// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    // dispatch(setPaymentLoading(true));
    try {
        const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        toast.success("Payment Successfull, You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (err) {
        console.log("Payment verify Error: ", err);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}







