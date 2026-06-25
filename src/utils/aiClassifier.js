export default function classifyLead(text) {
  const value = text.toLowerCase();

  if (
    value.includes("ai") ||
    value.includes("automation") ||
    value.includes("chatbot")
  ) {
    return {
      category: "AI Automation",
      priority: "High",
    };
  }

  if (
    value.includes("website") ||
    value.includes("web")
  ) {
    return {
      category: "Web Development",
      priority: "Medium",
    };
  }

  return {
    category: "General",
    priority: "Low",
  };
}