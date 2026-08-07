import { Worker } from "bullmq";
import { connection } from "../config/redis";
import { prisma } from "../config/prisma";
import { transporter } from "../services/emailService";
import nodemailer from "nodemailer";

new Worker(
  "emails",
  async (job) => {
    try {
      console.log("JOB DATA:", job.data);
      console.log("Sending email:", job.data.email);
      console.log("Subject:", job.data.subject);

      // Send email
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: job.data.email,
        subject: job.data.subject,
        text: job.data.body,
      });

      console.log("Email sent:", info.messageId);

      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Preview URL:", previewUrl);

      // Update database
      await prisma.email.update({
        where: {
          id: job.data.emailId,
        },
        data: {
          status: "sent",
          sentTime: new Date(),
        },
      });

      console.log("Status updated to sent");
    } catch (error) {
      console.error("Worker Error:", error);
    }
  },
  {
    connection,
    concurrency: 5,
  }
);

console.log("Email Worker Started");