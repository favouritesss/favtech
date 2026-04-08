import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    { 
      q: "What is FavTech SMM?", 
      a: "FavTech is a professional social media marketing platform where you can buy engagement services like followers, likes, views, and comments for platforms like Instagram, TikTok, Facebook, Twitter, and YouTube." 
    },
    { 
      q: "Is it safe for my account?", 
      a: "Yes! We use safe and gradual delivery methods that comply with social media platform guidelines. We never require your password to deliver services." 
    },
    { 
      q: "How fast is the delivery?", 
      a: "Most orders begin processing within minutes of payment. Larger orders are delivered gradually over a few hours to ensure a natural growth pattern." 
    },
    { 
      q: "What payment methods do you accept?", 
      a: "We accept secure payments through Paystack, credit cards, and bank transfers. All transactions are encrypted and secure." 
    },
    { 
      q: "Will the followers drop over time?", 
      a: "We provide high-quality followers with low drop rates. If you ever experience a drop, most of our services come with a refill guarantee." 
    },
    { 
      q: "Do you offer customer support?", 
      a: "Yes, our support team is available 24/7 to help you with any questions or issues with your orders." 
    },
    { 
      q: "How do I place an order?", 
      a: "Simply create an account, add funds to your wallet, select the service you want, provide the link to your profile or post, and confirm your order!" 
    },
    { 
      q: "Can I get a discount for large orders?", 
      a: "Yes, we offer specialized pricing for agency owners and resellers who place high volumes of orders daily. Contact our support for more details." 
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero Header — navy bg, white text */}
      <section style={{ backgroundColor: '#0f172a', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: '#14b8a6', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Help Center
          </p>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', fontFamily: 'Times New Roman, serif', marginBottom: '16px' }}>
            Common <span style={{ color: '#14b8a6' }}>Questions.</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
            Everything you need to know about our services
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              padding: '32px', 
              border: '1px solid #f1f5f9', 
              borderRadius: '24px', 
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 24px rgba(15,23,42,0.06)'
            }}>
              <h3 style={{ 
                color: '#0f172a', 
                fontSize: '1.1rem', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                fontStyle: 'italic', 
                marginBottom: '12px' 
              }}>
                {faq.q}
              </h3>
              <p style={{ color: '#64748b', fontWeight: 500, lineHeight: 1.7, fontSize: '0.95rem' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '16px' }}>
            Still have questions?
          </h2>
          <p style={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.65rem', marginBottom: '40px' }}>
            Our support team is ready to help you 24/7
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ 
              padding: '14px 40px', 
              backgroundColor: '#0f172a', 
              color: '#ffffff', 
              fontWeight: 900, 
              borderRadius: '16px',
              textDecoration: 'none',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em'
            }}>
              Contact Support
            </Link>
            <Link to="/register" style={{ 
              padding: '14px 40px', 
              backgroundColor: '#14b8a6', 
              color: '#ffffff', 
              fontWeight: 900, 
              borderRadius: '16px',
              textDecoration: 'none',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em'
            }}>
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
