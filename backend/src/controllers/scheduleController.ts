import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { emailQueue } from "../queues/emailQueue";
import csv from "csv-parser";
import { Readable } from "stream";

export const scheduleEmails = async (
  req: Request & { file?: Express.Multer.File },
  res: Response
) => {
  try {
    const subject = req.body.subject;
    const body = req.body.body;
    const delay = Number(req.body.delay); // delay in minutes
    const hourlyLimit = Number(req.body.hourlyLimit);

    const emails: string[] = [];

    if (req.file) {
      const stream = Readable.from(req.file.buffer);

      await new Promise<void>((resolve, reject) => {
        stream
          .pipe(csv())
          .on("data", (row) => {
            if (row.email) {
              emails.push(row.email.trim());
            }
          })
          .on("end", () => resolve())
          .on("error", reject);
      });
    }

    if (emails.length === 0) {
      res.status(400).json({
        message: "No emails found in CSV",
      });
      return;
    }

    const campaign = await prisma.campaign.create({
      data: {
        subject,
        body,
        startTime: new Date(),
        delaySeconds: delay,
        hourlyLimit,
      },
    });

    for (let i = 0; i < emails.length; i++) {
      // Delay in minutes
      const delayInMilliseconds =
        i * delay * 60 * 1000;

      const scheduledTime = new Date(
        Date.now() + delayInMilliseconds
      );

      const emailRecord = await prisma.email.create({
        data: {
          recipient: emails[i],
          status: "scheduled",
          scheduledTime,
          campaignId: campaign.id,
        },
      });

      console.log(
        "Adding Job:",
        emailRecord.id,
        emails[i]
      );

      await emailQueue.add(
        "send-email",
        {
          emailId: emailRecord.id,
          email: emails[i],
          subject,
          body,
        },
        {
          delay: delayInMilliseconds,
        }
      );
    }

    res.status(200).json({
      message: `${emails.length} emails scheduled successfully`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getCampaigns = async (
  req: Request,
  res: Response
) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        emails: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json(campaigns);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getEmails = async (
  req: Request,
  res: Response
) => {
  try {
    const emails = await prisma.email.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(emails);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteEmail = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.email.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete email",
    });
  }
};