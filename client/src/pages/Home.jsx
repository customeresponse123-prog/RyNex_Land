import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroLeadForm from "../components/HeroLeadForm";
import SellerForm from "../components/SellerForm";

/** Served from `client/public/LOGO.png` */
const LOGO_SRC = "/LOGO.png";

const INITIAL_FAQ_COUNT = 3;

const LAND_FAQ_ITEMS = [
  {
    q: "Do I have to accept your offer?",
    a: (
      <div className="faq-a">
        <p>
          No. Submitting your property or speaking with us does not obligate you to sell.
          We simply review the property and present an offer if it fits our criteria. The final decision
          always belongs to the landowner.
        </p>
      </div>
    ),
  },
  {
    q: "How do you determine your offer price?",
    a: (
      <div className="faq-a">
        <p>We evaluate several factors including:</p>
        <ul>
          <li>recent comparable land sales in the area</li>
          <li>road access and utilities</li>
          <li>property size and location</li>
          <li>overall market demand</li>
        </ul>
        <p>Our goal is to present a straightforward offer that reflects the property’s market conditions.</p>
      </div>
    ),
  },
  {
    q: "How long does the process take?",
    a: (
      <div className="faq-a">
        <p>
          Every property is different, but once an offer is accepted we can often close within a few
          weeks, depending on the title company and county recording timelines.
        </p>
      </div>
    ),
  },
  {
    q: "How do I know the transaction is legitimate?",
    a: (
      <div className="faq-a">
        <p>Whenever possible, transactions are completed through licensed title companies or real estate attorneys.</p>
        <p>They handle:</p>
        <ul>
          <li>holding the funds securely</li>
          <li>preparing closing documents</li>
          <li>recording the deed with the county</li>
        </ul>
        <p>This protects both the seller and the buyer.</p>
      </div>
    ),
  },
  {
    q: "Do I have to pay any fees?",
    a: (
      <div className="faq-a">
        <p>
          In most cases RyNex Land covers the standard closing costs, which means there are
          usually no additional expenses for the seller.
        </p>
      </div>
    ),
  },
  {
    q: "Do I need to clean up or prepare the property first?",
    a: (
      <div className="faq-a">
        <p>No. Most land is purchased in its current condition.</p>
        <p>You do not need to clear the property or make improvements before selling.</p>
      </div>
    ),
  },
  {
    q: "What types of land do you buy?",
    a: (
      <div className="faq-a">
        <p>We primarily focus on vacant land parcels that meet our criteria in:</p>
        <ul>
          <li>Tennessee</li>
          <li>North Carolina</li>
          <li>Georgia</li>
          <li>Alabama</li>
        </ul>
      </div>
    ),
  },
  {
    q: "What happens after I submit my property?",
    a: (
      <div className="faq-a">
        <p>Once you submit your property information:</p>
        <ol>
          <li>We review the property details.</li>
          <li>If it fits our buying criteria, we reach out to discuss it.</li>
          <li>We may present a purchase offer.</li>
          <li>If you accept, we open a transaction with a title company to complete the sale.</li>
        </ol>
      </div>
    ),
  },
  {
    q: "What if your offer doesn’t work for me?",
    a: (
      <div className="faq-a">
        <p>
          That is completely fine. There is no obligation to accept an offer.
          Many landowners simply appreciate having another option when considering selling.
        </p>
      </div>
    ),
  },
  {
    q: "Why do people sell land to RyNex Land?",
    a: (
      <div className="faq-a">
        <p>Landowners often contact us when they:</p>
        <ul>
          <li>inherited land they don’t plan to use</li>
          <li>live far from the property</li>
          <li>want a simpler sale than listing through traditional channels</li>
          <li>want clarity about timing and process</li>
        </ul>
        <p>Our goal is simply to provide a straightforward option.</p>
      </div>
    ),
  },
];

function Home() {
  const [faqExpanded, setFaqExpanded] = useState(false);
  const visibleFaqItems = faqExpanded
    ? LAND_FAQ_ITEMS
    : LAND_FAQ_ITEMS.slice(0, INITIAL_FAQ_COUNT);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="header-logo" aria-label="RyNex Land — home">
            <img src={LOGO_SRC} alt="" width={72} height={72} />
            {/* <span>RyNex Land</span> */}
          </Link>
          <nav className="header-nav">
            <a href="#how-it-works">How it works</a>
            <a href="#why-trust">Why trust us</a>
            <a href="#form">Get an offer</a>
            <a href="#about">About</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero: headline left, form right */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content hero-content-split">
          <div className="hero-details">
            <h1 className="hero-title">A Simple and Straightforward Way to Sell Your Land</h1>
            <p className="hero-subtitle">Sell your vacant land directly to a trusted buyer</p>
            <div className="hero-pills-box">
              <div className="hero-pill-item"><span className="hero-pill-check">✓</span> No Pressure Conversations</div>
              <div className="hero-pill-item"><span className="hero-pill-check">✓</span> Professional Title Closings</div>
              <div className="hero-pill-item"><span className="hero-pill-check">✓</span> We Cover Closing Costs</div>
            </div>
            <p className="hero-service-area">Serving Tennessee · North Carolina · Georgia · Alabama</p>
          </div>
          <div className="hero-form-wrap">
            <HeroLeadForm />
          </div>
        </div>
      </section>

      <main className="page-shell-main">
        {/* Real Buyer section */}
        <section className="section">
          <div className="container-shell">
            <h2 className="section-title section-title-left">A Real Buyer Focused on Simple Transactions</h2>
            <p className="real-buyer-body">
              RyNex Land is a focused land acquisition company built on clear communication, fair offers, and predictable closings. We partner with landowners who want a simple, direct path to selling their property—no listing, no agents, no hassle.
            </p>
          </div>
        </section>

        {/* Meet the Founder */}
        <section id="about" className="section-alt meet-founder-section">
          <div className="container-shell">
            <h2 className="section-title section-title-left">Meet the Founder</h2>
            <p className="meet-founder-byline">Dipal Patel / Founder of RyNex Land</p>
            <p className="real-buyer-body meet-founder-body">
              Dipal Patel founded RyNex Land to give landowners a straightforward option: sell your vacant land to a real buyer, with no pressure and no hidden fees. With experience in real estate and a focus on Tennessee, North Carolina, Georgia, and Alabama, Dipal and the team work directly with sellers to make the process simple—from first conversation to closing at a title company. We cover closing costs and handle the details so you can move on.
            </p>
            <a href="#form" className="primary-button meet-founder-btn">
              Learn More About Our Story →
            </a>
          </div>
        </section>

        {/* Why Landowners Trust */}
        <section id="why-trust" className="section">
          <div className="container-shell">
            <h2 className="section-title section-title-with-divider">Why Landowners Trust RyNex Land</h2>
            <div className="trust-grid">
              <div className="trust-card">
                <div className="trust-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <path d="M9 15l2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="trust-card-title">Straightforward Offers</h3>
                <p className="trust-card-body">We give you a clear, fair offer based on your property—no games, no pressure.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                  </svg>
                </div>
                <h3 className="trust-card-title">No Pressure Approach</h3>
                <p className="trust-card-body">You decide if and when to sell. We’re here to help when you’re ready.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3 className="trust-card-title">Professional Closings</h3>
                <p className="trust-card-body">We close through a title company so the process is secure and transparent.</p>
              </div>
              <div className="trust-card">
                <div className="trust-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                    <path d="M16 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="trust-card-title">Seller is in Control</h3>
                <p className="trust-card-body">You choose your timeline and terms. We work around your needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How the Process Works */}
        <section id="how-it-works" className="section-alt">
          <div className="container-shell">
            <h2 className="section-title section-title-with-divider">How the Process Works</h2>
            <div className="process-grid-new">
              <div className="process-step">
                <div className="process-step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="8" y1="13" x2="16" y2="13"/>
                    <line x1="8" y1="17" x2="12" y2="17"/>
                  </svg>
                </div>
                <h3 className="process-step-title">1. Submit Your Property</h3>
                <p className="process-step-body">Share your land details with us. We’ll review and get back to you with a fair offer.</p>
              </div>
              <div className="process-step">
                <div className="process-step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <h3 className="process-step-title">2. We Review Your Land</h3>
                <p className="process-step-body">We analyze your property and market to prepare a straightforward offer.</p>
              </div>
              <div className="process-step">
                <div className="process-step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h3 className="process-step-title">3. Get a Fair Offer</h3>
                <p className="process-step-body">Receive our offer with no obligation. Decide what works for you.</p>
              </div>
              <div className="process-step">
                <div className="process-step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h3 className="process-step-title">4. Close Through a Title Company</h3>
                <p className="process-step-body">We handle closing at a title company and cover closing costs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Situations We Help With: form + FAQ */}
        <section id="form" className="section situations-section">
          <div className="container-shell situations-inner">
            <h2 className="section-title section-title-with-divider">Situations We Help With</h2>
            <div className="situations-split">
              <div className="situations-form-col">
                <SellerForm />
              </div>
              <div className="situations-faq-col">
                <div id="faq" className="faq-block">
                  <h3 className="faq-title">Frequently Asked Questions</h3>
                  <div className="faq-list">
                    {visibleFaqItems.map((item) => (
                      <details key={item.q} className="faq-item">
                        <summary>{item.q}</summary>
                        {item.a}
                      </details>
                    ))}
                    {LAND_FAQ_ITEMS.length > INITIAL_FAQ_COUNT && (
                      <div className="faq-more-wrap">
                        <button
                          type="button"
                          className="faq-show-more-btn"
                          onClick={() => setFaqExpanded((v) => !v)}
                          aria-expanded={faqExpanded}
                        >
                          {faqExpanded ? "Show fewer questions" : "Show more FAQs"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer-new">
        <div className="footer-cta-wrap">
          <p className="footer-cta-text">Thinking About Selling Your Land?</p>
          <div className="footer-cta-buttons">
            <a href="#form" className="primary-button footer-btn">Get Your Offer Today</a>
          </div>
        </div>
        <div className="footer-bar">
          <div className="footer-logo-wrap">
            <img src={LOGO_SRC} alt="" className="footer-logo-img" width={40} height={40} />
            <span className="footer-brand-text">RyNex Land</span>
          </div>
          <a href="mailto:info@rynexland.com" className="footer-email">info@rynexland.com</a>
          <p className="footer-legal">©2025 RyNex | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
