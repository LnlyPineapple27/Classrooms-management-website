import emailjs from "emailjs-com";

const serviceId = "service_xryud6j";
const templateId = "template_j4pd2o3";
const userId = "user_Fl7wGEZtBmtwoQxwYwb8Y";

const sendEmail = async (param) => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      param,
      userId
    );

    if (response.status === 200) {
      console.log("Successfully sent message.");
    }
    return response
  } catch (error) {
    console.error("Failed to send email. Error: ", error);
  }
};

export default sendEmail;