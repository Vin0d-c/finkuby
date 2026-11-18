import Image from "next/image";
import Link from "next/link";
import { CalculatorLink } from "@/components/calculator-link";
import { NewsletterForm } from "@/components/newsletter-form";
import { Icon, LinkedInIcon } from "@/components/ui";
import {
  COPYRIGHT_YEAR,
  contact,
  disclaimer,
  footerColumns,
  footerProducts,
  type FooterItem,
} from "@/lib/site";

const heading = "text-[13px] font-bold tracking-wide text-white";
const linkText = "text-[13px] leading-snug text-[#a9b8cf]";
const footerLink = `${linkText} transition-colors hover:text-white`;

const column = (title: string) => footerColumns.find((c) => c.title === title)!;

/** Link groups per grid column; shorter groups share a column so the rows stay even. */
const stacks = [
  [column("Company")],
  [column("Resources")],
  [column("Help & Support"), column("RBI Links")],
  [column("Policies")],
];

function FooterEntry({ item }: { item: FooterItem }) {
  if (!item.href) return <span className={linkText}>{item.label}</span>;
  if (item.href === "calculator")
    return <CalculatorLink className={footerLink}>{item.label}</CalculatorLink>;
  if (item.external || !item.href.startsWith("/"))
    return (
      <a
        href={item.href}
        className={footerLink}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {item.label}
      </a>
    );
  return (
    <Link href={item.href} className={footerLink}>
      {item.label}
    </Link>
  );
}

function LinkGroup({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <nav aria-label={title}>
      <h2 className={heading}>{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <FooterEntry item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#061633] text-[#a9b8cf]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Brand, contact and newsletter */}
        <div className="grid gap-10 border-b border-white/[0.07] pt-16 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Finkuby Technologies home"
              className="relative block h-[60px] w-[200px] overflow-hidden"
            >
              {/* The file is a 2000×2000 square with the wordmark across its middle; crop to it. */}
              <Image
                src="/LOGO7.png"
                alt="Finkuby Technologies"
                fill
                sizes="200px"
                className="object-cover object-[50%_51%]"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Smart Financial Solutions for Modern India. Finkuby is a technology
              platform that integrates with registered banks and NBFC lenders to
              deliver seamless credit solutions.
            </p>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Finkuby on LinkedIn"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white ring-1 ring-white/10 transition-colors hover:bg-[#3ab6fc]"
            >
              <LinkedInIcon />
            </a>
          </div>

          <div className="lg:col-span-4">
            <h2 className={heading}>Get In Touch</h2>
            <ul className="mt-4 grid gap-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-[#3ab6fc]" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-[#3ab6fc]" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-[#3ab6fc]" />
                <address className="not-italic leading-relaxed">{contact.address}</address>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className={heading}>Newsletter</h2>
            <p className="mt-2 text-sm">
              Subscribe for insights on interest trends and loan management.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Link directory */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 md:grid-cols-3 lg:grid-cols-6">
          <nav aria-label="Products" className="col-span-2">
            <h2 className={heading}>Products</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {footerProducts.map((item) => (
                <li key={item.label}>
                  <FooterEntry item={item} />
                </li>
              ))}
            </ul>
          </nav>
          {stacks.map((groups) => (
            <div key={groups[0].title} className="grid content-start gap-10">
              {groups.map((group) => (
                <LinkGroup key={group.title} title={group.title} items={group.items} />
              ))}
            </div>
          ))}
        </div>

        {/* Disclaimer and copyright */}
        <div className="border-t border-white/[0.07] py-8">
          <p className="text-[11px] leading-relaxed text-[#7286a3]">
            <span className="font-semibold text-[#a9b8cf]">* Disclaimer:</span> {disclaimer}
          </p>
          <p className="mt-4 text-xs text-[#7286a3]">
            © {COPYRIGHT_YEAR} Finkuby Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
