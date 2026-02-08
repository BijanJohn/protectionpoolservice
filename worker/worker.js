export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      // Parse form data
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      // Build email content
      const emailHtml = `
        <h2>New Quote Request - Protection Pool Service</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="background: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.name || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr style="background: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Address</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.address || 'Not provided'}</td>
          </tr>
          <tr style="background: #f3f4f6;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service Needed</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.service || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${data.message || 'Not provided'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">Sent from protectionpoolservice.com contact form</p>
      `;

      // Send email via Resend
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Protection Pool Service <noreply@mail.protectionpoolservice.com>",
          to: ["d85003868@gmail.com"],
          subject: `New Quote Request from ${data.name || 'Website'}`,
          html: emailHtml,
          reply_to: data.email || undefined,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        console.error("Resend error:", error);
        return Response.redirect("https://protectionpoolservice.com/?form=error", 303);
      }

      // Redirect back to site with success message
      return Response.redirect("https://protectionpoolservice.com/?form=success", 303);

    } catch (error) {
      console.error("Worker error:", error);
      return Response.redirect("https://protectionpoolservice.com/?form=error", 303);
    }
  },
};
