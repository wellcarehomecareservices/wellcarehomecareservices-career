import { businessDetails, jobListings } from "@wellcare/content";
import type { z } from "zod";
import type { careerApplicationSchema } from "@/lib/schemas";

type Application = z.infer<typeof careerApplicationSchema>;

export interface AttachmentSummary {
  label: string;
  filename: string;
  sizeBytes: number;
}

interface Field {
  label: string;
  value?: string | null;
  /** Renders the value as a link (tel:/mailto:) when present. */
  href?: string;
  /** Long free-text answers get their own full-width row. */
  long?: boolean;
}

interface Section {
  title: string;
  /** Either a flat list of fields, or a list of numbered cards (employers, references). */
  fields?: Field[];
  cards?: { heading: string; fields: Field[] }[];
  emptyNote?: string;
}

// Brand palette (mirrors packages/config/tailwind.config.ts).
const color = {
  harbor: "#12393A",
  brand: "#22787A",
  sage: "#8FBDB9",
  mist: "#EAF3F2",
  linen: "#FBF7F0",
  gold: "#D9A441",
  muted: "#6B8584",
  border: "#D7E7E5",
};

const fontStack = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const serifStack = "Georgia, 'Times New Roman', serif";
const monoStack = "'SFMono-Regular', Menlo, Consolas, 'Courier New', monospace";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value?: string | null): string {
  return (value ?? "").trim();
}

function formatDate(iso?: string): string {
  const value = clean(iso);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function joinParts(parts: (string | undefined)[], separator = ", "): string {
  return parts.map(clean).filter(Boolean).join(separator);
}

function telHref(phone?: string): string | undefined {
  const digits = clean(phone).replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : undefined;
}

function roleTitleFor(slug?: string): string {
  const job = jobListings.find((listing) => listing.slug === slug);
  if (job) return `${job.title} · ${job.city}`;
  return "General application";
}

function buildSections(app: Application, attachments: AttachmentSummary[]): Section[] {
  const educationLevels = [app.highSchool ? "High School" : "", app.college ? "College" : ""].filter(Boolean).join(", ");

  const employers = (app.employers ?? [])
    .filter((entry) => Object.values(entry).some((v) => clean(v)))
    .map((entry, index) => ({
      heading: `Employer ${index + 1}${clean(entry.employer) ? ` · ${clean(entry.employer)}` : ""}`,
      fields: [
        { label: "Employer", value: entry.employer },
        { label: "Supervisor", value: entry.supervisor },
        { label: "Phone", value: entry.phoneNumber, href: telHref(entry.phoneNumber) },
        {
          label: "Dates",
          value: joinParts([formatDate(entry.dateFrom), formatDate(entry.dateTo) || (clean(entry.dateFrom) ? "Present" : "")], " – "),
        },
        {
          label: "Address",
          value: joinParts([entry.addressLine1, entry.addressLine2, entry.city, joinParts([entry.state, entry.postalCode], " ")]),
        },
      ],
    }));

  const references = (app.references ?? [])
    .filter((entry) => clean(entry.name) || clean(entry.phoneNumber))
    .map((entry, index) => ({
      heading: `Reference ${index + 1}`,
      fields: [
        { label: "Name", value: entry.name },
        { label: "Phone", value: entry.phoneNumber, href: telHref(entry.phoneNumber) },
      ],
    }));

  return [
    {
      title: "Personal Information",
      fields: [
        { label: "Full name", value: joinParts([app.firstName, app.noMiddleName ? "" : app.middleName, app.lastName], " ") },
        { label: "Middle name", value: app.noMiddleName ? "No middle name" : app.middleName },
        { label: "Preferred name", value: app.preferredName },
        { label: "Mobile phone", value: app.mobilePhone, href: telHref(app.mobilePhone) },
        { label: "Home phone", value: app.homePhone, href: telHref(app.homePhone) },
        { label: "Email", value: app.email, href: `mailto:${clean(app.email)}` },
        {
          label: "Address",
          value: joinParts([app.address, app.addressLine2, app.city, joinParts([app.state, app.postalCode], " ")]),
        },
        { label: "Date of birth", value: formatDate(app.dateOfBirth) },
        { label: "Location", value: app.location },
        { label: "Hours desired weekly", value: app.hoursDesiredWeekly },
      ],
    },
    {
      title: "Education & Training",
      fields: [
        { label: "Completed", value: educationLevels },
        { label: "School", value: app.school },
        { label: "Degree received", value: app.degreeReceived },
      ],
    },
    { title: "Employment History", cards: employers, emptyNote: "No employers listed." },
    { title: "Professional References", cards: references, emptyNote: "No references listed." },
    {
      title: "Additional Information",
      fields: [
        { label: "Availability (days & times)", value: app.availability, long: true },
        { label: "Trainings & certifications", value: app.trainingsCertifications, long: true },
        { label: "Felony conviction in the last 5 years", value: app.felonyConviction, long: true },
        { label: "Legally eligible to work in the U.S.", value: app.eligibility, long: true },
        { label: "How they heard about WellCare", value: app.howDidYouHear },
      ],
    },
    {
      title: "Attachments",
      fields: attachments.map((file) => ({ label: file.label, value: `${file.filename} (${formatBytes(file.sizeBytes)})` })),
    },
  ];
}

/* ----------------------------- HTML rendering ----------------------------- */

function renderValue(field: Field): string {
  const value = clean(field.value);
  if (!value) {
    return `<span style="color:${color.sage};font-style:italic;">Not provided</span>`;
  }
  const safe = escapeHtml(value).replace(/\r?\n/g, "<br>");
  if (field.href) {
    return `<a href="${escapeHtml(field.href)}" style="color:${color.brand};text-decoration:none;font-weight:600;">${safe}</a>`;
  }
  return safe;
}

function renderFieldRows(fields: Field[]): string {
  return fields
    .map((field, index) => {
      const borderTop = index === 0 ? "" : `border-top:1px solid ${color.border};`;
      if (field.long) {
        return `<tr><td colspan="2" style="${borderTop}padding:12px 0;">
          <div style="font-family:${fontStack};font-size:12px;color:${color.muted};margin-bottom:4px;">${escapeHtml(field.label)}</div>
          <div style="font-family:${fontStack};font-size:14px;line-height:1.55;color:${color.harbor};">${renderValue(field)}</div>
        </td></tr>`;
      }
      return `<tr>
        <td valign="top" width="38%" style="${borderTop}padding:12px 12px 10px 0;font-family:${fontStack};font-size:12px;line-height:1.5;color:${color.muted};">${escapeHtml(field.label)}</td>
        <td valign="top" style="${borderTop}padding:10px 0;font-family:${fontStack};font-size:14px;line-height:1.5;color:${color.harbor};">${renderValue(field)}</td>
      </tr>`;
    })
    .join("");
}

function renderSection(section: Section, index: number): string {
  let body: string;
  if (section.cards) {
    body = section.cards.length
      ? section.cards
          .map(
            (card) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;background:${color.mist};border-radius:10px;">
              <tr><td style="padding:14px 16px 4px;font-family:${monoStack};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${color.brand};">${escapeHtml(card.heading)}</td></tr>
              <tr><td style="padding:0 16px 8px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${renderFieldRows(card.fields)}</table></td></tr>
            </table>`,
          )
          .join("")
      : `<p style="margin:12px 0 0;font-family:${fontStack};font-size:14px;color:${color.sage};font-style:italic;">${escapeHtml(section.emptyNote ?? "Nothing provided.")}</p>`;
  } else {
    body = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">${renderFieldRows(section.fields ?? [])}</table>`;
  }

  return `<tr><td style="padding:0 0 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid ${color.border};border-radius:14px;">
      <tr><td style="padding:20px 24px 18px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td valign="middle" style="width:26px;height:26px;background:${color.brand};border-radius:13px;text-align:center;font-family:${monoStack};font-size:12px;font-weight:700;color:#ffffff;">${index + 1}</td>
          <td valign="middle" style="padding-left:10px;font-family:${serifStack};font-size:19px;color:${color.harbor};">${escapeHtml(section.title)}</td>
        </tr></table>
        ${body}
      </td></tr>
    </table>
  </td></tr>`;
}

function renderHtml(app: Application, sections: Section[], confirmationId: string, submittedAt: string): string {
  const fullName = escapeHtml(joinParts([app.firstName, app.lastName], " "));
  const role = escapeHtml(roleTitleFor(app.roleSlug));
  const mobileHref = telHref(app.mobilePhone);
  const quickFacts = [
    { label: "Hours wanted", value: escapeHtml(clean(app.hoursDesiredWeekly)) },
    { label: "Mobile", value: mobileHref ? `<a href="${escapeHtml(mobileHref)}" style="color:#ffffff;text-decoration:none;">${escapeHtml(clean(app.mobilePhone))}</a>` : "—" },
    { label: "City", value: escapeHtml(joinParts([app.city, app.state])) || "—" },
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>New caregiver application: ${fullName}</title>
</head>
<body style="margin:0;padding:0;background:${color.linen};">
<div style="display:none;max-height:0;overflow:hidden;">${role} · ${escapeHtml(clean(app.hoursDesiredWeekly))} · Confirmation #${escapeHtml(confirmationId)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${color.linen};">
  <tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;">

      <tr><td style="padding:0 0 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${color.harbor};border-radius:16px;">
          <tr><td style="padding:26px 28px 10px;font-family:${monoStack};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${color.gold};">${escapeHtml(businessDetails.name)} Careers · New Application</td></tr>
          <tr><td style="padding:0 28px;font-family:${serifStack};font-size:28px;line-height:1.2;color:#ffffff;">${fullName}</td></tr>
          <tr><td style="padding:6px 28px 0;font-family:${fontStack};font-size:15px;color:${color.sage};">Applying for ${role}</td></tr>
          <tr><td style="padding:20px 28px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(255,255,255,0.15);">
              <tr>
                ${quickFacts
                  .map(
                    (fact) => `<td valign="top" style="padding:14px 8px 0 0;">
                  <div style="font-family:${monoStack};font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${color.sage};">${fact.label}</div>
                  <div style="padding-top:4px;font-family:${fontStack};font-size:14px;font-weight:600;color:#ffffff;">${fact.value || "—"}</div>
                </td>`,
                  )
                  .join("")}
              </tr>
            </table>
          </td></tr>
          <tr><td style="padding:18px 28px 24px;">
            <a href="mailto:${escapeHtml(clean(app.email))}" style="display:inline-block;background:${color.gold};color:${color.harbor};font-family:${fontStack};font-size:14px;font-weight:700;text-decoration:none;padding:10px 18px;border-radius:999px;">Reply to ${escapeHtml(clean(app.firstName))}</a>
            <span style="padding-left:12px;font-family:${monoStack};font-size:12px;color:${color.sage};">#${escapeHtml(confirmationId)} · ${escapeHtml(submittedAt)}</span>
          </td></tr>
        </table>
      </td></tr>

      ${sections.map(renderSection).join("")}

      <tr><td style="padding:8px 8px 0;text-align:center;font-family:${fontStack};font-size:12px;line-height:1.6;color:${color.muted};">
        Sent from the ${escapeHtml(businessDetails.name)} careers site. Replying to this email goes straight to the applicant.<br>
        The resume and CV are attached to this message.
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* --------------------------- Plain-text rendering -------------------------- */

function renderText(app: Application, sections: Section[], confirmationId: string, submittedAt: string): string {
  const lines: string[] = [
    `${businessDetails.name.toUpperCase()} CAREERS · NEW APPLICATION`,
    "",
    joinParts([app.firstName, app.lastName], " "),
    `Applying for: ${roleTitleFor(app.roleSlug)}`,
    `Confirmation: #${confirmationId}`,
    `Submitted: ${submittedAt}`,
  ];

  const fieldLine = (field: Field) => {
    const value = clean(field.value) || "Not provided";
    return field.long || value.includes("\n")
      ? `  ${field.label}:\n${value
          .split(/\r?\n/)
          .map((line) => `      ${line}`)
          .join("\n")}`
      : `  ${field.label}: ${value}`;
  };

  sections.forEach((section, index) => {
    lines.push("", `${index + 1}. ${section.title.toUpperCase()}`, "-".repeat(section.title.length + 3));
    if (section.cards) {
      if (!section.cards.length) lines.push(`  ${section.emptyNote ?? "Nothing provided."}`);
      for (const card of section.cards) {
        lines.push(`  [${card.heading}]`);
        lines.push(...card.fields.map((f) => `  ${fieldLine(f)}`));
      }
    } else {
      lines.push(...(section.fields ?? []).map(fieldLine));
    }
  });

  lines.push("", "Reply to this email to respond to the applicant. The resume and CV are attached.");
  return lines.join("\n");
}

export function buildApplicationEmail(
  app: Application,
  options: { confirmationId: string; attachments: AttachmentSummary[]; submittedAt?: Date },
) {
  const submittedAt = (options.submittedAt ?? new Date()).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const sections = buildSections(app, options.attachments);
  const fullName = joinParts([app.firstName, app.lastName], " ");
  const job = jobListings.find((listing) => listing.slug === app.roleSlug);

  return {
    subject: `New application: ${fullName}${job ? ` · ${job.title}` : ""} (#${options.confirmationId})`,
    html: renderHtml(app, sections, options.confirmationId, submittedAt),
    text: renderText(app, sections, options.confirmationId, submittedAt),
  };
}
