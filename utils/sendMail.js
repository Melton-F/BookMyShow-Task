const nodemailer = require("nodemailer");


const sendEmail = async options => {
            console.log(options.email)
            const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                                    user: "meltonMeni619@gmail.com",
                                    pass: "swdq szzp hhng dmzd"
                        }
            });


            const mailOptions = {
                        from: "meltonMeni619@gmail.com",
                        to: options.email,
                        subject: options.subject,
                        text: options.message
            };

            await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;