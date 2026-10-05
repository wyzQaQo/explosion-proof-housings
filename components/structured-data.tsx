import { siteConfig, companyInfo } from "@/config/site";

// ==================== Organization Schema ====================
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: companyInfo.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/logo.png`,
    foundingDate: companyInfo.founded,
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: parseInt(companyInfo.employees) || 200,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      email: companyInfo.email,
      contactType: "sales",
      availableLanguage: ["English", "Chinese"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.split(",")[0],
      addressLocality: "Shenzhen",
      addressRegion: "Guangdong",
      postalCode: "518103",
      addressCountry: "CN",
    },
    sameAs: [
      siteConfig.url,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ==================== WebSite Schema with SearchBox ====================
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ==================== BreadcrumbList Schema ====================
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbListSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ==================== FAQPage Schema ====================
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPageSchema({ faqs }: { faqs: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ==================== Product Schema ====================
interface ProductSchemaData {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material: string;
  exProofRating: string;
  ipRating: string;
  certifications: string[];
  image?: string;
}

export function ProductSchema({ product }: { product: ProductSchemaData }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/products/${product.slug}/#product`,
    name: product.name,
    description: product.description,
    category: product.category,
    material: product.material,
    image: product.image ? [product.image] : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/products/${product.slug}`,
      seller: {
        "@id": `${siteConfig.url}/#organization`,
      },
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: 1,
        unitText: "unit",
      },
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Explosion Proof Rating",
        value: product.exProofRating,
      },
      {
        "@type": "PropertyValue",
        name: "IP Rating",
        value: product.ipRating,
      },
      {
        "@type": "PropertyValue",
        name: "Material",
        value: product.material,
      },
      ...product.certifications.map((cert) => ({
        "@type": "PropertyValue",
        name: "Certification",
        value: cert,
      })),
    ],
    manufacturer: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ==================== ItemList Schema for Product Listing ====================
export function ItemListSchema({
  items,
}: {
  items: { name: string; slug: string; description: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: item.name,
        description: item.description,
        url: `${siteConfig.url}/products/${item.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
