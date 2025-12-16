'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function redeemGift(formData: FormData) {
  const username = formData.get('username');

  if (!username || typeof username !== 'string') {
    return;
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Default testing sender
      to: 'privat@ningunosound.com', // <--- CHANGE THIS TO YOUR EMAIL
      subject: '🎁 New Steam Gift Redemption!',
      text: `Prepare the gift! The user "${username}" has requested a redemption.`,
    });
    
    // We return success true so the frontend knows it worked
    return { success: true };
    
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false };
  }
}