import type { Metadata } from "next";
import Icon from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import { Container, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us | Jitendra Public School, Madhepura",
  description:
    "Reach Jitendra Public School, Shastri Nagar, Madhepura. Phone, email, address, school hours and an enquiry form — we're happy to help.",
};

const DETAILS = [
  {
    icon: "location_on",
    title: "Visit Us",
    lines: ["Shastri Nagar, Ward No. 19", "Madhepura, Bihar – 852113"],
  },
  {
    icon: "call",
    title: "Call Us",
    lines: ["+91 94300 28159", "Mon–Sat, 8 AM – 2 PM"],
  },
  {
    icon: "mail",
    title: "Email Us",
    lines: ["info@jpsmadhepura.com", "admissions@jpsmadhepura.com"],
  },
  {
    icon: "schedule",
    title: "School Hours",
    lines: ["Mon – Sat: 8:00 AM – 2:00 PM", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        cta={{ label: "Call +91 94300 28159", href: "tel:+919430028159" }}
        cards={[
          { img: "/assets/flag-hoisting.jpg", label: "Visit Our Campus", d: "Mon", m: "–Sat" },
          { img: "/assets/admissions-desk.jpg", label: "Meet Our Team", d: "8–2", m: "PM" },
        ]}
        overline="We're Here to Help"
        title="Let's start a"
        highlight="conversation."
        subtitle="Whether it's admissions, a campus visit or a simple question — reach out and our team will get back to you quickly."
      />

      {/* Detail cards */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-7">
            {DETAILS.map((d, i) => (
              <div
                key={d.title}
                className="reveal lux-card bg-primary text-white rounded-[28px] p-8 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright mb-5">
                  <Icon name={d.icon} className="text-3xl" />
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2.5">
                  {d.title}
                </h3>
                {d.lines.map((l) => (
                  <p key={l} className="text-white/75 text-sm leading-relaxed">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Map + form */}
      <section className="pb-20 md:pb-[120px]">
        <Container className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="reveal-left">
            <SectionHeading
              overline="Find Us"
              title="On the map"
            />
            <div className="rounded-[28px] overflow-hidden border border-secondary/15 shadow-xl h-[420px] lg:h-[520px]">
              <iframe
                title="Jitendra Public School location"
                src="https://www.google.com/maps?q=Madhepura,Bihar&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="reveal-right">
            <SectionHeading
              overline="Send a Message"
              title="Drop us a line"
            />
            <LeadForm
              submitLabel="Send message"
              note="We typically reply within one working day."
              fields={[
                { name: "name", label: "Your name", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "email", label: "Email", type: "email", full: true },
                {
                  name: "topic",
                  label: "Reason",
                  required: true,
                  full: true,
                  options: [
                    "Admission enquiry",
                    "Campus visit",
                    "Fee / prospectus",
                    "Transport",
                    "Other",
                  ],
                },
                { name: "message", label: "Message", type: "textarea", required: true, full: true },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
