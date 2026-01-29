import { useState, type FormEvent } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";

const copyLink = (id: string) => {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  alert("Section link copied");
};

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const hasSuccess = searchParams.get("sent") === "1";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validate = () => {
    if (!values.name.trim()) return "Name is required.";
    if (!values.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      return "Email is not valid.";
    }
    if (!values.subject.trim()) return "Subject is required.";
    if (!values.message.trim()) return "Message is required.";
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mbdoyvje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setSubmitError("Message could not be sent. Please try again.");
        return;
      }

      navigate("/en/contact?sent=1", { replace: true });
    } catch {
      setSubmitError("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Contact | Inquiries and Collaborations - Derecho Artificial"
        description="Contact form for legal inquiries about AI, corrections, and editorial collaborations. Response times and privacy policy."
        canonical="https://derechoartificial.com/en/contact"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/contacto" },
          { lang: "en", href: "https://derechoartificial.com/en/contact" }
        ]}
      />

      <section className="section-spacing" id="contact">
        <div className="container-editorial">
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Contact
            </p>
            <div className="flex items-center gap-2 mb-6">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Get in touch
              </h1>
              <button
                type="button"
                onClick={() => copyLink("contact")}
                className="text-muted-foreground hover:text-foreground transition-colors text-base"
                aria-label="Copy section link"
              >
                🔗
              </button>
            </div>
            <p className="text-lg text-body max-w-2xl">
              We welcome suggestions, corrections, collaboration proposals, 
              and any constructive feedback on our work.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              {hasSuccess && (
                <div className="mb-8 rounded-md bg-green-50 px-4 py-3 border border-green-200">
                  <p className="text-sm text-green-800">
                    Thank you for your message. We have received your inquiry and will respond within the next few business days.
                  </p>
                </div>
              )}
              {submitError && (
                <div className="mb-8 rounded-md bg-red-50 px-4 py-3 border border-red-200">
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={values.name}
                      onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                      className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                      className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={values.subject}
                    onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
                    className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none"
                    placeholder="Reason for your message"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={8}
                    value={values.message}
                    onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                    className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
                <p className="text-xs text-caption mt-4">
                  By sending this form, you agree that Derecho Artificial may process your data to respond to your inquiry.
                </p>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    Response times
                  </h3>
                  <p className="text-sm text-body">
                    We respond to all messages within 3-5 business days. 
                    For urgent inquiries, please indicate so in the subject line.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    Collaboration proposals
                  </h3>
                  <p className="text-sm text-body">
                    If you wish to propose an article or collaboration, please include 
                    a brief description of the proposed topic and your experience 
                    in the field.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    Corrections
                  </h3>
                  <p className="text-sm text-body">
                    If you have identified an error in any of our content, 
                    we appreciate the correction. Please include the article URL and 
                    describe the detected error.
                  </p>
                </div>

                <div className="pt-8 border-t border-divider">
                  <p className="text-xs text-caption">
                    The data provided will be used exclusively to 
                    respond to your inquiry. We do not share information with 
                    third parties nor send unsolicited communications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
