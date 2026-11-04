import { site } from "@/config/site";

// Datos estructurados para que Google entienda quién sos (rich results).
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Software Developer",
    worksFor: { "@type": "Organization", name: "Softtek" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Universidad de Buenos Aires (FADU)" },
      { "@type": "EducationalOrganization", name: "Digital House" },
    ],
    knowsAbout: [
      "Microsoft Power Platform", "Power Apps", "Power Automate", "Power BI",
      "Azure OpenAI", "React", "Next.js", "TypeScript", "UX/UI Design",
    ],
    address: { "@type": "PostalAddress", addressLocality: "Esquel", addressCountry: "AR" },
    sameAs: [site.links.linkedin, site.links.github].filter(Boolean),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
