import { useState } from "react";
import { supabase } from "../services/supabase";
import classifyLead from "../utils/aiClassifier";
import { sendLeadEmail } from "../services/emailService";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    // AI Classification
    const ai = classifyLead(form.requirement);

    try {
      // Save Lead to Supabase
      const { data, error } = await supabase
        .from("leads")
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            requirement: form.requirement,
            category: ai.category,
            priority: ai.priority,
            email_sent: true,
            link_clicked: false,
          },
        ])
        .select();

      if (error) {
        alert(error.message);
        return;
      }

      console.log("Lead Saved:", data);

      // Send Email
      await sendLeadEmail({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        requirement: form.requirement,
        category: ai.category,
        priority: ai.priority,
      });

      alert("Lead Submitted Successfully & Email Sent!");

      // Clear Form
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        requirement: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Lead Management Form</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Requirement"
          name="requirement"
          value={form.requirement}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Submit Lead</button>
      </form>
    </div>
  );
}