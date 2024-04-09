const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress")



//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    const { userId } = req.user.id;

    if (courses.length === 0) {
        return res.json({ success: false, message: "Please provide Course Id" });
    }

    let totalAmount = 0;
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(500).json({ success: false, message: "Course Not Found" });
            }
            // check enrolled or not
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already enrolled" });
            }

            totalAmount += course.price;
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: err.message });
        }
    }

    // create option for initiate the payment
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }
    // create order
    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }


}

// verify the payment
exports.verifySignature = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // enroll student
        await enrollStudent(courses, userId, res);

        // return response
        return res.status(200).json({ success: true, message: "Payment Verified" });
    }
    return res.status(200).json({ success: false, message: "Payment Failed" });

}

const enrollStudent = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses and userId"
        })
    }

    for (const courseId of courses) {
        try {
            // find the course and enroll in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )
            if (!enrolledCourse) {
                return res.status(500).json({ success: false, message: "Course not Found" });
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })

            // find the students and add the course to their list of enrolled courses
            const enrolledStudents = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    }
                },
                { new: true }
            )

            // send mail to the students
            const emailResponse = await mailSender(
                enrollStudent.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledCourse.firstName}`)
            )
            console.log("email sent successfully", emailResponse);
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                success: false,
                message: err.message
            })
        }
    }

}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the field"
        })
    }
    try {
        // find the student
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount / 100, orderId, paymentId),
        )
    } catch (err) {
        console.log("Error in sending mail: " + err.message)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


