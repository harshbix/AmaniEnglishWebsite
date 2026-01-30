import { useState, type FC } from "react";
import { Container, Hero, Button, Input, Textarea, Toast } from "@/components";
import { usePageMeta, useContactForm } from "@/hooks";
import { isValidEmail, isValidPhone } from "@/utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

export const ContactPage: FC = () => {
  usePageMeta({
    title: "Contact Us",
    description: "Get in touch with Amani School. Contact form and location details.",
    keywords: ["contact", "phone", "email", "location"],
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    id: number;
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const { submit, isPending } = useContactForm();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await submit(formData);

    if (result.success) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setToast({
        id: Date.now(),
        type: "success",
        title: "Message Sent!",
        message: "Thank you for contacting us. We'll get back to you soon.",
      });
    } else {
      setToast({
        id: Date.now(),
        type: "error",
        title: "Submission Failed",
        message: result.message || "We couldn't send your message. Please try again.",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <AnimatePresence>
        {toast && (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onDismiss={() => setToast(null)}
          />
        )}
      </AnimatePresence>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you. Get in touch with our team."
        backgroundImage="/images/optimized/hero-contact-community"
        backgroundAlt="Community members meeting with school staff"
      />

      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-brand-dark mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-brand-dark mb-2">Address</h3>
                  <p className="text-gray-600">
                    Amani School
                    <br />
                    Tanga, Tanzania
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark mb-2">Phone</h3>
                  <a
                    href="tel:+255272634234"
                    className="text-brand-green hover:underline"
                  >
                    +255 (0) 27-2634-234
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark mb-2">Email</h3>
                  <a
                    href="mailto:info@amanischool.tz"
                    className="text-brand-green hover:underline"
                  >
                    info@amanischool.tz
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-brand-dark mb-2">
                    Office Hours
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday: 7:30 AM - 3:30 PM
                    <br />
                    Saturday: By appointment
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      error={fieldErrors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      error={fieldErrors.lastName}
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    error={fieldErrors.email}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+255..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    error={fieldErrors.phone}
                    helperText="Optional"
                  />

                  <Input
                    label="Subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    error={fieldErrors.subject}
                    required
                  />

                  <Textarea
                    label="Message"
                    placeholder="Your message..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    error={fieldErrors.message}
                    required
                  />

                  <Button type="submit" size="lg" isLoading={isPending}>
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
            Find Us
          </h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.8662852908334!2d39.19805!3d-6.172107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c521f0d5a5555%3A0x123456789!2sTanga%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1234567890"
            />
          </div>
        </Container>
      </section>
    </>
  );
};
