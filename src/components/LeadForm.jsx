import { useState } from "react";
import { supabase } from "../services/supabase";
import classifyLead from "../utils/aiClassifier";

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

    const ai = classifyLead(form.requirement);

    console.log(ai);

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

    console.log(data);
    console.log(error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Lead Submitted Successfully");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Lead Management Form</h1>

      <form onSubmit={submit}>

        <input
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          placeholder="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          placeholder="Requirement"
          name="requirement"
          value={form.requirement}
          onChange={handleChange}
        />

        <br /><br />

        <button>Submit Lead</button>

      </form>
    </div>
  );
}