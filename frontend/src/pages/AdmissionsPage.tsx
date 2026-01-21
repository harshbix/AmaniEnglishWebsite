import { useState, type FC } from "react";
import { Container, Hero, Button, Input, Select, Textarea, Alert } from "@/components";
import { usePageMeta, useAdmissionForm } from "@/hooks";
import { ADMISSION_CLASSES } from "@/utils/constants";
import { motion } from "framer-motion";

export const AdmissionsPage: FC = () => {
  usePageMeta({
    title: "Admissions",
    description:
      "Learn about our admission process and apply to Amani School.",
    keywords: ["admissions", "apply", "enrollment"],
  });

  const [formData, setFormData] = useState<{
    childFirstName: string;
    childLastName: string;
    childDateOfBirth: string;
    guardianFirstName: string;
    guardianLastName: string;
    guardianEmail: string;
    guardianPhone: string;
    guardianRelationship: "parent" | "guardian";
    intendedClass: string;
    message: string;
  }>({
    childFirstName: "",
    childLastName: "",
    childDateOfBirth: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianRelationship: "parent",
    intendedClass: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { submit, isPending, errors } = useAdmissionForm();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.childFirstName.trim()) errors.childFirstName = "Child's first name is required";
    if (!formData.childLastName.trim()) errors.childLastName = "Child's last name is required";
    if (!formData.childDateOfBirth) errors.childDateOfBirth = "Date of birth is required";
    if (!formData.guardianFirstName.trim()) errors.guardianFirstName = "Guardian's first name is required";
    if (!formData.guardianLastName.trim()) errors.guardianLastName = "Guardian's last name is required";
    if (!formData.guardianEmail.trim()) errors.guardianEmail = "Guardian's email is required";
    if (!formData.guardianPhone.trim()) errors.guardianPhone = "Guardian's phone is required";
    if (!formData.intendedClass) errors.intendedClass = "Intended class is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await submit(formData);
    if (success) {
      setFormData({
        childFirstName: "",
        childLastName: "",
        childDateOfBirth: "",
        guardianFirstName: "",
        guardianLastName: "",
        guardianEmail: "",
        guardianPhone: "",
        guardianRelationship: "parent",
        intendedClass: "",
        message: "",
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
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
      <Hero
        title="Admissions"
        subtitle="Start your journey with Amani School. Apply today!"
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
            {/* Requirements */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Admission Requirements
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-brand-green mb-2">
                    Documents Needed
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ Birth Certificate</li>
                    <li>✓ Previous School Reports</li>
                    <li>✓ Health Certificate</li>
                    <li>✓ Guardian ID/Passport Copy</li>
                    <li>✓ Proof of Residence</li>
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-brand-green mb-2">
                    Available Classes
                  </h3>
                  <p className="text-sm text-gray-600">
                    We offer admissions from Pre-Primary through Grade 7.
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-brand-green mb-2">
                    Processing Time
                  </h3>
                  <p className="text-sm text-gray-600">
                    Typically 7-10 business days after submission.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">
                  Admission Application Form
                </h2>

                {showSuccess && (
                  <Alert
                    type="success"
                    title="Application Received!"
                    message="Thank you for applying. We'll review your application and contact you soon."
                    onClose={() => setShowSuccess(false)}
                  />
                )}

                {errors.submit && (
                  <Alert
                    type="error"
                    title="Error"
                    message={errors.submit}
                    onClose={() => setFieldErrors({ ...fieldErrors, submit: "" })}
                  />
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Child Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark mb-4 pb-2 border-b-2 border-brand-green">
                      Child's Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        placeholder="First name"
                        value={formData.childFirstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            childFirstName: e.target.value,
                          })
                        }
                        error={fieldErrors.childFirstName}
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Last name"
                        value={formData.childLastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            childLastName: e.target.value,
                          })
                        }
                        error={fieldErrors.childLastName}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Input
                        label="Date of Birth"
                        type="date"
                        value={formData.childDateOfBirth}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            childDateOfBirth: e.target.value,
                          })
                        }
                        error={fieldErrors.childDateOfBirth}
                        required
                      />
                    </div>
                  </div>

                  {/* Guardian Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark mb-4 pb-2 border-b-2 border-brand-brown">
                      Guardian's Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        placeholder="First name"
                        value={formData.guardianFirstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guardianFirstName: e.target.value,
                          })
                        }
                        error={fieldErrors.guardianFirstName}
                        required
                      />
                      <Input
                        label="Last Name"
                        placeholder="Last name"
                        value={formData.guardianLastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guardianLastName: e.target.value,
                          })
                        }
                        error={fieldErrors.guardianLastName}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.guardianEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guardianEmail: e.target.value,
                          })
                        }
                        error={fieldErrors.guardianEmail}
                        required
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+255..."
                        value={formData.guardianPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guardianPhone: e.target.value,
                          })
                        }
                        error={fieldErrors.guardianPhone}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Select
                        label="Relationship to Child"
                        options={[
                          { value: "parent", label: "Parent" },
                          { value: "guardian", label: "Guardian" },
                        ]}
                        value={formData.guardianRelationship}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({
                            ...formData,
                            guardianRelationship: value as "parent" | "guardian",
                          });
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Admission Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-brand-dark mb-4 pb-2 border-b-2 border-brand-green">
                      Admission Details
                    </h3>
                    <Select
                      label="Intended Class"
                      options={ADMISSION_CLASSES.map((cls) => ({
                        value: cls,
                        label: cls,
                      }))}
                      value={formData.intendedClass}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          intendedClass: e.target.value,
                        })
                      }
                      error={fieldErrors.intendedClass}
                      placeholder="Select a class"
                      required
                    />
                    <div className="mt-4">
                      <Textarea
                        label="Additional Information"
                        placeholder="Tell us anything else we should know..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" isLoading={isPending}>
                    Submit Application
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};
