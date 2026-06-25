export default function LeadTable({ leads }) {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        marginTop: "30px",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Category</th>
          <th>Priority</th>
          <th>Email Sent</th>
          <th>Clicked</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.phone}</td>
            <td>{lead.company}</td>
            <td>{lead.category}</td>
            <td>{lead.priority}</td>
            <td>{lead.email_sent ? "Yes" : "No"}</td>
            <td>{lead.link_clicked ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}