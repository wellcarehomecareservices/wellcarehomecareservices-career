import { randomUUID } from "node:crypto";
import { businessDetails } from "@wellcare/content";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { buildApplicationEmail } from "@/lib/application-email";
import { careerApplicationSchema } from "@/lib/schemas";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_FILE_BYTES = 18 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawPayload = formData.get("payload");

  if (typeof rawPayload !== "string") {
    return NextResponse.json({ error: "Missing application data" }, { status: 400 });
  }

  let parsedPayload: unknown;
  try {
    parsedPayload = JSON.parse(rawPayload);
  } catch {
    return NextResponse.json({ error: "Malformed application data" }, { status: 400 });
  }

  const parsed = careerApplicationSchema.safeParse(parsedPayload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid submission" }, { status: 400 });
  }

  const resume = formData.get("resume");
  const cv = formData.get("cv");

  if (!(resume instanceof File) || !(cv instanceof File)) {
    return NextResponse.json({ error: "Please attach your resume and CV" }, { status: 400 });
  }

  for (const [label, file] of [["resume", resume], ["cv", cv]] as const) {
    if (file.size === 0) {
      return NextResponse.json({ error: `Please attach your ${label}` }, { status: 400 });
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: `${label} must be under 10MB` }, { status: 400 });
    }
  }

  if (resume.size + cv.size > MAX_TOTAL_FILE_BYTES) {
    return NextResponse.json({ error: "Your resume and CV must total less than 18MB." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER || businessDetails.email;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!gmailAppPassword) {
    return NextResponse.json({ error: "Application delivery is not configured. Please try again later." }, { status: 503 });
  }

  const confirmationId = randomUUID().slice(0, 8).toUpperCase();

  const attachments = await Promise.all([resume, cv].map(async (file) => {
    const safeName = file.name.replace(/[\\/\r\n"]/g, "_");
    return {
      filename: safeName,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "application/octet-stream",
    };
  }));

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    const email = buildApplicationEmail(parsed.data, {
      confirmationId,
      attachments: attachments.map((file, index) => ({
        label: index === 0 ? "Resume" : "CV",
        filename: file.filename,
        sizeBytes: file.content.length,
      })),
    });

    await transporter.sendMail({
      from: { name: "WellCare Careers", address: gmailUser },
      to: process.env.CAREERS_EMAIL_TO || businessDetails.email,
      replyTo: parsed.data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
      attachments,
    });
  } catch (error) {
    console.error("[careers-site] application email failed", error);
    return NextResponse.json({ error: "We couldn't deliver your application right now. Please try again later." }, { status: 502 });
  }

  console.info("[careers-site] application email delivered", { confirmationId });

  return NextResponse.json({ received: true, confirmationId });
}
