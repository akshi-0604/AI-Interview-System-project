import axios from "axios";

const sendEmail = async (emailData) => {
  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    emailData,
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }
  );
};

export default sendEmail;