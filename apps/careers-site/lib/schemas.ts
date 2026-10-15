import { z } from "zod";

const employerEntrySchema = z.object({
  employer: z.string().optional(),
  supervisor: z.string().optional(),
  phoneNumber: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
});

const referenceEntrySchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const careerApplicationSchema = z.object({
  roleSlug: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  noMiddleName: z.boolean().optional(),
  preferredName: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  mobilePhone: z.string().min(7, "Enter a valid mobile phone number"),
  homePhone: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  dateOfBirth: z.string().optional(),
  location: z.string().optional(),
  hoursDesiredWeekly: z.string().min(1, "Tell us how many hours a week you're looking for"),
  highSchool: z.boolean().optional(),
  college: z.boolean().optional(),
  school: z.string().optional(),
  degreeReceived: z.string().optional(),
  employers: z.array(employerEntrySchema).optional(),
  references: z.array(referenceEntrySchema).optional(),
  availability: z.string().optional(),
  trainingsCertifications: z.string().optional(),
  felonyConviction: z.string().optional(),
  eligibility: z.string().optional(),
  howDidYouHear: z.string().optional(),
});
