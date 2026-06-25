import emailjs from "@emailjs/browser";

console.log("SERVICE:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log("TEMPLATE:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log("PUBLIC:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
console.log("MODE:", import.meta.env.MODE);

export const sendLeadEmail = async (lead) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        requirement: lead.requirement,
        category: lead.category,
        priority: lead.priority,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log("Email Sent Successfully:", response);
    return response;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
};