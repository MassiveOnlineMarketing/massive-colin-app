// src/app/api/send/route.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);



export async function POST(request: Request) {
    const body = await request.json();
    console.log("🔶 body: ", body);

    try {
        // const data = await resend.emails.send({
        //     from: 'no-reply <noreply@massiveonlinemarketing.nl>',
        //     to: ['info@baristart.nl'],
        //     subject: 'Nieuwe aanvraag contactformulier',
        //     react: EmailTemplate({ answers: body }), // pass body as answers
        // });
        // // console.log("data: ", data)

        // try {
        //     const userEmail = body.email;
        //     const data = await resend.emails.send({
        //         from: 'no-reply <noreply@massiveonlinemarketing.nl>',
        //         to: [userEmail],
        //         subject: 'Bedankt voor uw aanvraag',
        //         react: EmailTemplate({ answers: body }), // pass body as answers
        //     });

        //     return new Response('OK', { status: 200 });
        // } catch (error) {
        //     // return new Response((error as Error).message, { status: 500 });
        // }
        return new Response('OK', { status: 200 });
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }



}

