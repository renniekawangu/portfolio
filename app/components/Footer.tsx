'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
} from 'react-icons/fa'
import { usePortfolioData } from '@/app/admin/data-context'

export default function Footer() {
  const { contactSettings } = usePortfolioData()

  const socialLinks = useMemo(
    () => [
      contactSettings.github && { label: 'GitHub', href: contactSettings.github, icon: FaGithub },
      contactSettings.linkedin && { label: 'LinkedIn', href: contactSettings.linkedin, icon: FaLinkedin },
      contactSettings.twitter && { label: 'Twitter', href: contactSettings.twitter, icon: FaTwitter },
      contactSettings.facebook && { label: 'Facebook', href: contactSettings.facebook, icon: FaFacebook },
      contactSettings.instagram && { label: 'Instagram', href: contactSettings.instagram, icon: FaInstagram },
    ].filter(Boolean) as Array<{
      label: string
      href: string
      icon: typeof FaGithub
    }>,
    [contactSettings]
  )

  return (
    <>
      <footer className="border-t border-slate-800 bg-gradient-to-b from-[#050708] to-[#090C12] text-[#D9D9D9]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div>
              <h3 className="gradient-text mt-4 text-2xl font-bold md:text-3xl">
                b34st Web Services
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C0C0C0] md:text-base">
                Security research, bug bounty writeups, and full-stack web development with a focus on clean delivery and practical results.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${contactSettings.email}`}
                className="flex items-center gap-3 rounded-lg border border-slate-800 bg-[#08101C]/90 px-4 py-3 transition hover:border-[#2E9BFF]/40 hover:bg-[#0A1220]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E9BFF]/10 text-[#2E9BFF]">
                  <FaEnvelope />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#A8A8A8]">Email</p>
                  <p className="text-sm font-medium text-white">{contactSettings.email}</p>
                </div>
              </a>

              {contactSettings.phone && (
                <a
                  href={`tel:${contactSettings.phone}`}
                  className="flex items-center gap-3 rounded-lg border border-slate-800 bg-[#08101C]/90 px-4 py-3 transition hover:border-[#2E9BFF]/40 hover:bg-[#0A1220]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E9BFF]/10 text-[#2E9BFF]">
                    <FaPhone />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[#A8A8A8]">Phone</p>
                    <p className="text-sm font-medium text-white">{contactSettings.phone}</p>
                  </div>
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center btn-accent px-5 py-3 text-sm font-semibold"
              >
                Contact Me
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-[#08101C]/90 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#2E9BFF]/40 hover:bg-[#0A1220]"
              >
                Read Blog
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-slate-800 bg-[#08101C]/90 p-6 shadow-lg shadow-black/10">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A8A8A8]">
                Social Links
              </h4>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-slate-800 bg-[#07101A]/90 px-4 py-3 text-sm font-medium text-[#D9D9D9] transition-all hover:-translate-y-0.5 hover:border-[#2E9BFF]/40 hover:text-white"
                  >
                    <span className="text-[#2E9BFF]">
                      <Icon />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-800 bg-gradient-to-br from-[#090B11] via-[#07101A] to-[#090C12] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A8A8A8]">
                Quick note
              </p>
              <p className="mt-3 text-sm leading-6 text-[#C0C0C0]">
                {contactSettings.email
                  ? `Reach out at ${contactSettings.email} for collaboration, audits, or consulting.`
                  : 'Contact details are managed from the admin panel and can be updated at any time.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#152134] pt-6 text-center text-sm text-[#A8A8A8]">
          <p>&copy; {new Date().getFullYear()} eSync Enterprise. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  )
}
