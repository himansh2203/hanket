import React, { useState } from "react";
import "../style/Faq.css";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What services do you provide?",
      a: "We offer premium design, development, branding and digital solutions for businesses.",
    },
    {
      q: "How can I contact support?",
      a: "You can reach our support team through email or phone — available 24/7 for clients.",
    },
    {
      q: "Do you offer refunds?",
      a: "Refunds are available depending on the service and timeline. Contact our support team for help.",
    },
    {
      q: "How long does a project take?",
      a: "Average timeline is 1–3 weeks depending on project complexity and custom requirements.",
    },
  ];

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main className="pf-root">
      <section className="pf-hero">
        <h1 className="pf-title">Frequently Asked Questions</h1>
        <p className="pf-sub">
          Find quick answers to the most common questions
        </p>
      </section>

      <section className="pf-container">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`pf-item ${openIndex === i ? "pf-open" : ""}`}
          >
            <div className="pf-question" onClick={() => toggleFAQ(i)}>
              <span>{item.q}</span>
              <span className="pf-icon">{openIndex === i ? "-" : "+"}</span>
            </div>

            <div className="pf-answer-wrapper">
              <p className="pf-answer">{item.a}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
