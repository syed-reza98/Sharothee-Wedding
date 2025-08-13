import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  to: string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from = 'Wedding <noreply@wedding.com>' }: EmailData) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export function generateRSVPConfirmationEmail(guestName: string, events: string[]) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B7355; text-align: center;">RSVP Confirmation</h1>
      <p>Dear ${guestName},</p>
      <p>Thank you for your RSVP! We're thrilled that you'll be joining us for our special day.</p>
      <h3>Events you'll be attending:</h3>
      <ul>
        ${events.map(event => `<li>${event}</li>`).join('')}
      </ul>
      <p>We'll send you more details about the venues and schedule closer to the date.</p>
      <p>With love,<br>Incia & Arvin</p>
    </div>
  `;
}

export function generateContactNotificationEmail(name: string, email: string, subject: string, message: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B7355;">New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
    </div>
  `;
}
