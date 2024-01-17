import api from "./api";

export const studentService = {
    paymentSuccess : async (data) => {
        try {
            const response = await api.post(`/student/course_payment/` , data)
            console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    },
    submitQuiz : async (data) => {
        try {
            const response = await api.post('/student/quiz-enroll' , data)
        } catch (error) {
            console.log(error);
        }
    },
}

export const providerService = {
    addQuiz : async (data) => {
        try{
            const response = await api.post('/provider/quiz/' , data)
            return response.data
        } catch (error){
            console.log(error);
        }
    },
    getCurriculumDetails : async (course_id) =>{
        try {
            let response = await api.get(`/provider/getCurriculumDetails/${course_id}/`)
            return response.data

        } catch (error) {
            console.log(error);
        }
    }
}