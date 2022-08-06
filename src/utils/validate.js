import * as yup from 'yup'

export const nameValidationSchema = yup.object({
    name: yup.string("Enter your name").required("Name is required")
})

export const contentValidationSchema = yup.object({
    content: yup.string("Enter your name").required("Name is required"),
    receiverID: yup.string('Select User').required('User is required'),
    senderID: yup.string('Select User').required('User is required'),
    chatID: yup.string('Select Chat').required('Chat is required'),
})

export const createMessageValidationSchema = yup.object({
    receiverID: yup.string('Select User').required('User is required'),
    subject: yup.string("Enter Subject").required("Subject is required"),
    content: yup.string("Enter Message").required("Message is required")
})