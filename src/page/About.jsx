import React from "react";
import "../style/About.css";
// import heroImg from "../assets/about-hero.jpg";
// import member1 from "../assets/team1.jpg";
// import member2 from "../assets/team2.jpg";
// import member3 from "../assets/team3.jpg";

const team = [
  { id: 1, name: "Anjali Tomar", role: "Co-founder & CEO", img: "" },
  { id: 2, name: "Rohit Verma", role: "Head of Product", img: "" },
  { id: 3, name: "Priya Singh", role: "Design Lead", img: "" },
  { id: 4, name: "Amit Kumar", role: "Engineering Lead", img: "" },
];

export default function About() {
  return (
    <main className="au-root" aria-labelledby="au-heading">
      {/* HERO */}
      <section className="au-hero">
        <div className="au-hero-inner">
          <div className="au-hero-text">
            <h1 id="au-heading" className="au-title">
              About HANKET
            </h1>
            <p className="au-lead">
              We build delightful experiences and premium products that empower
              small businesses and creators to sell with confidence. Quality,
              trust & speed — that's our promise.
            </p>

            <div className="au-hero-cta">
              <a className="au-btn au-btn-primary" href="/contact">
                Contact Us
              </a>
              <a className="au-btn au-btn-ghost" href="/products">
                View Products
              </a>
            </div>
          </div>

          <div
            className="au-hero-media"
            role="img"
            aria-label="Illustration showing teamwork"
          >
            {/* Replace with an actual image for production */}
            <div className="au-hero-placeholder">HANKET</div>
            {/* Example with imported image:
                <img src={heroImg} alt="Teamwork illustration" />
            */}
          </div>
        </div>
      </section>

      {/* MISSION + VALUES */}
      <section className="au-values">
        <div className="au-values-grid">
          <article className="au-card">
            <h3 className="au-card-title">Our Mission</h3>
            <p className="au-card-text">
              To simplify commerce for everyone — building tools that are
              powerful yet delightful.
            </p>
          </article>

          <article className="au-card">
            <h3 className="au-card-title">Our Vision</h3>
            <p className="au-card-text">
              Be the go-to platform for creators and merchants who value design,
              performance, and reliability.
            </p>
          </article>

          <article className="au-card">
            <h3 className="au-card-title">Core Values</h3>
            <ul className="au-list">
              <li>Customer-first</li>
              <li>Craftsmanship</li>
              <li>Speed & Reliability</li>
            </ul>
          </article>
        </div>
      </section>

      {/* TEAM */}
      <section className="au-team" aria-labelledby="au-team-heading">
        <h2 id="au-team-heading" className="au-section-title">
          Meet the Team
        </h2>
        <div className="au-team-grid">
          {team.map((m) => (
            <figure key={m.id} className="au-member">
              <div
                className="au-avatar"
                role="img"
                aria-label={`${m.name} avatar`}
              >
                {/* replace with <img src={m.img || member1} alt={m.name} /> */}
                <span className="au-avatar-initial">
                  {m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
              </div>
              <figcaption className="au-member-meta">
                <strong>{m.name}</strong>
                <span className="au-member-role">{m.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="au-cta">
        <div className="au-cta-inner">
          <h3 className="au-cta-title">Ready to grow with HANKET?</h3>
          <p className="au-cta-sub">Let's build something great together.</p>
          <a className="au-btn au-btn-primary au-cta-btn" href="/signup">
            Get Started
          </a>
        </div>
      </section>
    </main>
  );
}
