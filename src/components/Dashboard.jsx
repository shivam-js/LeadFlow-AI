import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import StatCard from "./StatCard";
import LeadTable from "./LeadTable";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("id", { ascending: false });

    if (data) setLeads(data);
  }

  const total = leads.length;

  const sent = leads.filter((l) => l.email_sent).length;

  const clicked = leads.filter((l) => l.link_clicked).length;

  const clickRate = sent
    ? ((clicked / sent) * 100).toFixed(1)
    : 0;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <StatCard title="Total Leads" value={total} />

        <StatCard title="Emails Sent" value={sent} />

        <StatCard title="Links Clicked" value={clicked} />

        <StatCard title="Click Rate" value={`${clickRate}%`} />
      </div>

      <LeadTable leads={leads} />
    </div>
  );
}