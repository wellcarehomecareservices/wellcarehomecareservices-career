"use client";

import { PresencePulse } from "@wellcare/motion";
import { Checkbox, CustomSelect, DatePicker, FieldError, Input, Label, Textarea } from "@wellcare/ui";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Plus, Upload, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CareersButton } from "@/components/careers-button";
import { careerApplicationSchema } from "@/lib/schemas";

const stepLabels = ["Personal Information", "Experience & Education", "References & Additional"];

const hoursOptions = [
  "Less than 10 hours/week",
  "10–19 hours/week",
  "20–29 hours/week",
  "30–39 hours/week",
  "40+ hours/week (Full-time)",
].map((label) => ({ value: label, label }));

const howDidYouHearOptions = [
  "Google Search",
  "Facebook or Instagram",
  "Indeed or another job board",
  "Friend or family referral",
  "Current WellCare employee",
  "Community event or flyer",
  "Other",
].map((label) => ({ value: label, label }));

interface EmployerEntry {
  key: string;
  employer: string;
  supervisor: string;
  phoneNumber: string;
  dateFrom: string;
  dateTo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

interface ReferenceEntry {
  key: string;
  name: string;
  phoneNumber: string;
}

function makeKey() {
  return Math.random().toString(36).slice(2);
}

function emptyEmployer(): EmployerEntry {
  return {
    key: makeKey(),
    employer: "",
    supervisor: "",
    phoneNumber: "",
    dateFrom: "",
    dateTo: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  };
}

function emptyReference(): ReferenceEntry {
  return { key: makeKey(), name: "", phoneNumber: "" };
}

interface FormValues {
  firstName: string;
  lastName: string;
  middleName: string;
  noMiddleName: boolean;
  preferredName: string;
  address: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  mobilePhone: string;
  homePhone: string;
  email: string;
  dateOfBirth: string;
  location: string;
  hoursDesiredWeekly: string;
  highSchool: boolean;
  college: boolean;
  school: string;
  degreeReceived: string;
  availability: string;
  trainingsCertifications: string;
  felonyConviction: string;
  eligibility: string;
  howDidYouHear: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  noMiddleName: false,
  preferredName: "",
  address: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  mobilePhone: "",
  homePhone: "",
  email: "",
  dateOfBirth: "",
  location: "",
  hoursDesiredWeekly: "",
  highSchool: false,
  college: false,
  school: "",
  degreeReceived: "",
  availability: "",
  trainingsCertifications: "",
  felonyConviction: "",
  eligibility: "",
  howDidYouHear: "",
};

function FileDropzone({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Label>{label}</Label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-dashed border-teal-300/50 bg-teal-50/40 px-6 py-10 text-center transition-colors duration-200 hover:border-teal-600 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
      >
        <Upload className="h-6 w-6 text-teal-600" aria-hidden="true" />
        <span className="text-sm font-medium text-teal-900">{file ? file.name : "Click to upload document"}</span>
        <span className="text-xs text-teal-900/50">Supports PDF, DOC, DOCX (max 10MB)</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export function CareerApplicationFlow({ roleSlug, roleTitle }: { roleSlug?: string; roleTitle?: string }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [employers, setEmployers] = useState<EmployerEntry[]>([emptyEmployer()]);
  const [references, setReferences] = useState<ReferenceEntry[]>([emptyReference(), emptyReference(), emptyReference()]);
  const [resume, setResume] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function updateEmployer(index: number, field: keyof EmployerEntry, value: string) {
    setEmployers((prev) => prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)));
  }

  function removeEmployer(index: number) {
    setEmployers((prev) => prev.filter((_, i) => i !== index));
  }

  function updateReference(index: number, field: keyof ReferenceEntry, value: string) {
    setReferences((prev) => prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)));
  }

  function removeReference(index: number) {
    setReferences((prev) => prev.filter((_, i) => i !== index));
  }

  function validateStep1() {
    const required: [keyof FormValues, string][] = [
      ["firstName", "First name is required"],
      ["lastName", "Last name is required"],
      ["address", "Address is required"],
      ["city", "City is required"],
      ["state", "State is required"],
      ["postalCode", "Postal code is required"],
      ["mobilePhone", "Mobile phone is required"],
      ["email", "Email is required"],
      ["hoursDesiredWeekly", "Tell us how many hours a week you're looking for"],
    ];
    const fieldErrors: Record<string, string> = {};
    for (const [key, message] of required) {
      if (!values[key]) fieldErrors[key] = message;
    }
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      fieldErrors.email = "Enter a valid email";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const payload = {
      roleSlug,
      ...values,
      employers: employers.map(({ key, ...rest }) => rest),
      references: references.map(({ key, ...rest }) => rest),
    };

    const fileErrors: Record<string, string> = {};
    if (!resume) fileErrors.resume = "Please attach your resume";
    if (!cv) fileErrors.cv = "Please attach your CV";
    if (Object.keys(fileErrors).length > 0) {
      setErrors(fileErrors);
      return;
    }

    const parsed = careerApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      setStep(1);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const formData = new FormData();
    formData.append("payload", JSON.stringify(parsed.data));
    if (resume) formData.append("resume", resume);
    if (cv) formData.append("cv", cv);

    try {
      const response = await fetch("/api/careers-apply", { method: "POST", body: formData });
      const result = await response.json();
      if (!response.ok) {
        setErrors({ form: result?.error ?? "Something went wrong. Please try again." });
        setSubmitting(false);
        return;
      }
      setConfirmationId(result.confirmationId);
    } catch {
      setErrors({ form: "Couldn't reach the server. Check your connection and try again." });
    }
    setSubmitting(false);
  }

  if (confirmationId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-teal-300/30 bg-white p-10 text-center shadow-bloom-sm"
      >
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600"
        >
          <PresencePulse className="h-14 w-14" />
          <Check className="relative h-7 w-7" aria-hidden="true" />
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-2xl font-medium text-teal-900"
        >
          Application received
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-sm leading-relaxed text-teal-900/70"
        >
          A hiring coordinator will review your application and reach out within a few business days. Reference this
          confirmation number if you follow up with us in the meantime.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-mono text-lg tracking-label-wide text-teal-600"
        >
          #{confirmationId}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-teal-300/30 bg-white p-6 shadow-bloom-sm sm:p-10">
      {roleTitle && (
        <p className="mb-6 rounded-xl bg-teal-50 px-4 py-2.5 text-sm text-teal-900">
          Applying for <span className="font-medium">{roleTitle}</span>
        </p>
      )}

      <div className="mb-8 flex items-center gap-2">
        {stepLabels.map((label, i) => {
          const stepNumber = i + 1;
          const isActive = stepNumber === step;
          const isDone = stepNumber < step;
          return (
            <div key={label} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-colors duration-200 ${
                  isDone || isActive ? "bg-teal-600 text-white" : "bg-teal-50 text-teal-900/50"
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <span className={`hidden text-xs font-medium sm:block ${isActive ? "text-teal-900" : "text-teal-900/50"}`}>
                {label}
              </span>
              {stepNumber !== stepLabels.length && <div className="h-px flex-1 bg-teal-300/30" />}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl text-teal-900">Personal Information</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>First Name *</Label>
                  <Input value={values.firstName} onChange={(e) => set("firstName", e.target.value)} />
                  <FieldError>{errors.firstName}</FieldError>
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input value={values.lastName} onChange={(e) => set("lastName", e.target.value)} />
                  <FieldError>{errors.lastName}</FieldError>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Middle Name</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      value={values.middleName}
                      disabled={values.noMiddleName}
                      onChange={(e) => set("middleName", e.target.value)}
                      className="flex-1"
                    />
                    <label className="flex shrink-0 items-center gap-2 text-xs text-teal-900/70">
                      <Checkbox checked={values.noMiddleName} onChange={(e) => set("noMiddleName", e.target.checked)} />
                      No Middle Name
                    </label>
                  </div>
                </div>
                <div>
                  <Label>Preferred Name</Label>
                  <Input value={values.preferredName} onChange={(e) => set("preferredName", e.target.value)} />
                </div>
              </div>

              <div>
                <Label>Address *</Label>
                <Input value={values.address} onChange={(e) => set("address", e.target.value)} />
                <FieldError>{errors.address}</FieldError>
              </div>
              <div>
                <Label>Address Line 2</Label>
                <Input value={values.addressLine2} onChange={(e) => set("addressLine2", e.target.value)} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>City *</Label>
                  <Input value={values.city} onChange={(e) => set("city", e.target.value)} />
                  <FieldError>{errors.city}</FieldError>
                </div>
                <div>
                  <Label>State *</Label>
                  <Input value={values.state} onChange={(e) => set("state", e.target.value)} />
                  <FieldError>{errors.state}</FieldError>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Postal Code *</Label>
                  <Input value={values.postalCode} onChange={(e) => set("postalCode", e.target.value)} />
                  <FieldError>{errors.postalCode}</FieldError>
                </div>
                <div>
                  <Label>Mobile Phone *</Label>
                  <Input type="tel" value={values.mobilePhone} onChange={(e) => set("mobilePhone", e.target.value)} />
                  <FieldError>{errors.mobilePhone}</FieldError>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Home Phone</Label>
                  <Input type="tel" value={values.homePhone} onChange={(e) => set("homePhone", e.target.value)} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
                  <FieldError>{errors.email}</FieldError>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label>Date of Birth</Label>
                  <DatePicker value={values.dateOfBirth} onChange={(v) => set("dateOfBirth", v)} placeholder="Select date of birth" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={values.location} onChange={(e) => set("location", e.target.value)} />
                </div>
              </div>

              <div>
                <Label>Number of Hours Desired Weekly *</Label>
                <CustomSelect
                  value={values.hoursDesiredWeekly}
                  onChange={(v) => set("hoursDesiredWeekly", v)}
                  options={hoursOptions}
                  placeholder="Select an option"
                />
                <FieldError>{errors.hoursDesiredWeekly}</FieldError>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl text-teal-900">Education & Training</h2>
                <div className="mt-4 flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-teal-900">
                    <Checkbox checked={values.highSchool} onChange={(e) => set("highSchool", e.target.checked)} />
                    High School
                  </label>
                  <label className="flex items-center gap-2 text-sm text-teal-900">
                    <Checkbox checked={values.college} onChange={(e) => set("college", e.target.checked)} />
                    College
                  </label>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label>School</Label>
                    <Input value={values.school} onChange={(e) => set("school", e.target.value)} />
                  </div>
                  <div>
                    <Label>Degree Received</Label>
                    <Input value={values.degreeReceived} onChange={(e) => set("degreeReceived", e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl text-teal-900">Employment History</h2>
                <div className="mt-5 space-y-4">
                  {employers.map((entry, index) => (
                    <div key={entry.key} className="rounded-2xl border border-teal-300/30 bg-teal-50/40 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="font-mono text-xs uppercase tracking-label-wide text-teal-600">Employer {index + 1}</p>
                        {employers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEmployer(index)}
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-teal-900/60 transition-colors hover:bg-white hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label>Employer</Label>
                          <Input value={entry.employer} onChange={(e) => updateEmployer(index, "employer", e.target.value)} />
                        </div>
                        <div>
                          <Label>Supervisor</Label>
                          <Input value={entry.supervisor} onChange={(e) => updateEmployer(index, "supervisor", e.target.value)} />
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <Input type="tel" value={entry.phoneNumber} onChange={(e) => updateEmployer(index, "phoneNumber", e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Date From</Label>
                            <DatePicker value={entry.dateFrom} onChange={(v) => updateEmployer(index, "dateFrom", v)} placeholder="Start date" />
                          </div>
                          <div>
                            <Label>Date To</Label>
                            <DatePicker value={entry.dateTo} onChange={(v) => updateEmployer(index, "dateTo", v)} placeholder="End date" />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <Label>Address Line 1</Label>
                          <Input value={entry.addressLine1} onChange={(e) => updateEmployer(index, "addressLine1", e.target.value)} />
                        </div>
                        <div className="sm:col-span-2">
                          <Label>Address Line 2 (optional)</Label>
                          <Input value={entry.addressLine2} onChange={(e) => updateEmployer(index, "addressLine2", e.target.value)} />
                        </div>
                        <div>
                          <Label>City</Label>
                          <Input value={entry.city} onChange={(e) => updateEmployer(index, "city", e.target.value)} />
                        </div>
                        <div>
                          <Label>State</Label>
                          <Input value={entry.state} onChange={(e) => updateEmployer(index, "state", e.target.value)} />
                        </div>
                        <div>
                          <Label>Postal Code</Label>
                          <Input value={entry.postalCode} onChange={(e) => updateEmployer(index, "postalCode", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <CareersButton type="button" variant="secondary" size="sm" className="mt-4" onClick={() => setEmployers((prev) => [...prev, emptyEmployer()])}>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add Employer
                </CareersButton>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl text-teal-900">Professional References</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {references.map((entry, index) => (
                    <div key={entry.key} className="rounded-2xl border border-teal-300/30 bg-teal-50/40 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-mono text-xs uppercase tracking-label-wide text-teal-600">Reference {index + 1}</p>
                        {references.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeReference(index)}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-teal-900/60 transition-colors hover:bg-white hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                            aria-label={`Remove reference ${index + 1}`}
                          >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label>Name</Label>
                          <Input value={entry.name} onChange={(e) => updateReference(index, "name", e.target.value)} />
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <Input type="tel" value={entry.phoneNumber} onChange={(e) => updateReference(index, "phoneNumber", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <CareersButton type="button" variant="secondary" size="sm" className="mt-4" onClick={() => setReferences((prev) => [...prev, emptyReference()])}>
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add Reference
                </CareersButton>
              </div>

              <div>
                <h2 className="font-display text-xl text-teal-900">Additional Information</h2>
                <div className="mt-5 space-y-5">
                  <div>
                    <Label>What is your availability? (Days &amp; Times)</Label>
                    <Textarea value={values.availability} onChange={(e) => set("availability", e.target.value)} placeholder="e.g., Monday–Friday 9am–5pm, weekends available" />
                  </div>
                  <div>
                    <Label>List any trainings or certifications that apply to this position</Label>
                    <Textarea value={values.trainingsCertifications} onChange={(e) => set("trainingsCertifications", e.target.value)} placeholder="e.g., CNA certification, First Aid/CPR, dementia care training" />
                  </div>
                  <div>
                    <Label>Have you ever been convicted of a felony in the last 5 years? If yes, please explain.</Label>
                    <Textarea value={values.felonyConviction} onChange={(e) => set("felonyConviction", e.target.value)} placeholder="Please explain, or type “No” if not applicable" />
                  </div>
                  <div>
                    <Label>Are you legally eligible for employment in the United States?</Label>
                    <Textarea value={values.eligibility} onChange={(e) => set("eligibility", e.target.value)} placeholder="Please confirm your eligibility" />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FileDropzone label="Resume *" file={resume} onChange={setResume} />
                  <FieldError>{errors.resume}</FieldError>
                </div>
                <div>
                  <FileDropzone label="CV *" file={cv} onChange={setCv} />
                  <FieldError>{errors.cv}</FieldError>
                </div>
              </div>

              <div>
                <Label>How did you hear about our company?</Label>
                <CustomSelect value={values.howDidYouHear} onChange={(v) => set("howDidYouHear", v)} options={howDidYouHearOptions} placeholder="Select an option" />
              </div>

              <FieldError>{errors.form}</FieldError>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 grid grid-cols-[auto_1fr_auto] items-center gap-2 border-t border-teal-300/20 pt-6">
        <CareersButton type="button" variant="secondary" className="px-4 sm:px-5" onClick={goBack} disabled={step === 1}>
          Back
        </CareersButton>
        <span className="text-center font-mono text-[10px] uppercase tracking-label-wide text-teal-900/50 sm:text-xs">Step {step} of 3</span>
        {step < 3 ? (
          <CareersButton type="button" onClick={goNext}>
            Next <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CareersButton>
        ) : (
          <CareersButton type="submit" className="px-3 sm:px-5" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Application"}
          </CareersButton>
        )}
      </div>
    </form>
  );
}
