import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { contactEmailText, renderContactEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field — bots do.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please add your name, a valid email, and a message." },
      { status: 400 },
    );
  }
  if (name.length > 120 || subject.length > 160 || message.length > 5000) {
    return NextResponse.json(
      { error: "One of the fields is too long." },
      { status: 400 },
    );
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || user;

  if (!user || !pass) {
    console.error("Contact form: SMTP_USER / SMTP_PASS are not configured.");
    return NextResponse.json(
      { error: "Email isn't configured yet — please email me directly." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const sentAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const headerSubject = (subject || `New message from ${name}`).replace(
    /[\r\n]+/g,
    " ",
  );
  const data = { name, email, subject, message, sentAt };

  try {
    await transporter.sendMail({
      from: { name: "Portfolio Contact", address: user },
      to,
      replyTo: { name, address: email },
      subject: `Portfolio · ${headerSubject}`,
      text: contactEmailText(data),
      html: renderContactEmail(data),
    });
  } catch (error) {
    console.error("Contact form: failed to send email", error);
    return NextResponse.json(
      { error: "Couldn't send your message. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
