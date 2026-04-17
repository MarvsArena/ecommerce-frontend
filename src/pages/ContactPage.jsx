import { useState } from "react";

import Container from "../components/Container";
import {
  ClockIcon,
  HeadsetIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
} from "../components/Icons";
import SectionHeading from "../components/SectionHeading";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactCards = [
  {
    title: "Email the boutique",
    value: "orders@omdhairville.com",
    detail: "For orders, product advice, and post-purchase support.",
    icon: MailIcon,
  },
  {
    title: "Call or WhatsApp",
    value: "+234 812 345 6789",
    detail: "Monday to Saturday for quick boutique assistance.",
    icon: PhoneIcon,
  },
  {
    title: "Support hours",
    value: "9:00 AM - 6:00 PM",
    detail: "West Africa Time, with premium response handling.",
    icon: ClockIcon,
  },
];

const faqs = [
  {
    question: "How quickly do you respond to enquiries?",
    answer: "Most boutique enquiries receive a response within one business day, and urgent order issues are prioritised.",
  },
  {
    question: "Can I get help choosing the right wig texture or length?",
    answer: "Yes. Use the contact form to share your preferred look, and we’ll guide you on length, cap type, and texture options.",
  },
  {
    question: "Do you support order updates after payment?",
    answer: "We can assist with status updates, delivery questions, and pickup coordination once your order has been placed.",
  },
];

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(form.subject || "OMD Hairville Enquiry");
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        "",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:orders@omdhairville.com?subject=${subject}&body=${body}`;
    setStatus("Your email client has been opened with your message details.");
    setForm(initialForm);
  };

  return (
    <Container className="py-12 sm:py-14 lg:py-16">
      <div className="panel-highlight grid gap-10 p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">Contact OMD Hairville</p>
          <h1 className="mt-4 font-display text-5xl text-slate-950 dark:text-white sm:text-6xl">
            Let’s help you find the right luxury hair experience.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-white/68">
            Reach out for product guidance, order assistance, pickup coordination, or premium hair recommendations.
            We’re here to make the boutique experience feel personal and polished.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="surface-card-strong rounded-[1.8rem] p-6">
            <div className="flex items-center gap-3 text-brand-gold">
              <HeadsetIcon className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.32em]">Client Care</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-white/70">
              Premium support for enquiries, product decisions, and order follow-up.
            </p>
          </div>
          <div className="surface-card-strong rounded-[1.8rem] p-6">
            <div className="flex items-center gap-3 text-brand-gold">
              <MessageSquareIcon className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.32em]">Response Time</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-white/70">
              Most messages are answered within one business day during support hours.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Everything you need on one contact page"
          description="Use the direct channels below for quick support, or send a detailed enquiry through the boutique contact form."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article key={card.title} className="luxury-panel p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                  <CardIcon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-400 dark:text-white/45">{card.title}</p>
                <p className="mt-3 font-display text-2xl text-slate-950 dark:text-white">{card.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/60">{card.detail}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-16 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="luxury-panel p-7">
          <div className="flex items-center gap-3">
            <MessageSquareIcon className="h-5 w-5 text-brand-gold" />
            <h2 className="font-display text-3xl text-slate-950 dark:text-white">Send a Message</h2>
          </div>
          <p className="mt-3 text-slate-600 dark:text-white/60">
            Share your enquiry and we’ll direct it to the right boutique support channel.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="field-label">Full Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="input-field"
                  required
                />
              </label>
              <label>
                <span className="field-label">Email Address</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="input-field"
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <span className="field-label">Phone Number</span>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="input-field"
                />
              </label>
              <label>
                <span className="field-label">Subject</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  className="input-field"
                  required
                />
              </label>
            </div>

            <label>
              <span className="field-label">Message</span>
              <textarea
                rows="6"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="input-field min-h-[170px]"
                required
              />
            </label>

            {status && <div className="alert-success">{status}</div>}

            <button type="submit" className="button-primary w-full justify-center sm:w-auto">
              Send Enquiry
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="luxury-panel p-7">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-5 w-5 text-brand-gold" />
              <h2 className="font-display text-3xl text-slate-950 dark:text-white">Boutique Hours</h2>
            </div>
            <div className="mt-6 space-y-4 text-slate-600 dark:text-white/70">
              <div className="flex items-center justify-between rounded-[1.4rem] border border-black/10 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center justify-between rounded-[1.4rem] border border-black/10 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between rounded-[1.4rem] border border-black/10 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div className="luxury-panel p-7">
            <h2 className="font-display text-3xl text-slate-950 dark:text-white">Frequently Asked</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item) => (
                <article key={item.question} className="rounded-[1.4rem] border border-black/10 bg-white/72 p-5 dark:border-white/10 dark:bg-white/[0.03]">
                  <p className="text-slate-950 dark:text-white">{item.question}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/60">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      </Container>
  );
};

export default ContactPage;
