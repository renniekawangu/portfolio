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
    <footer className="border-t border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div>
              <p className="inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Available for select work
              </p>
              <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                b34st Web Services
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
                Security research, bug bounty writeups, and full-stack web development with a focus on clean delivery and practical results.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${contactSettings.email}`}
                className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-900/70 px-4 py-3 transition-colors hover:border-orange-500/40 hover:bg-gray-900"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <FaEnvelope />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                  <p className="text-sm font-medium text-white">{contactSettings.email}</p>
                </div>
              </a>

              {contactSettings.phone && (
                <a
                  href={`tel:${contactSettings.phone}`}
                  className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-900/70 px-4 py-3 transition-colors hover:border-orange-500/40 hover:bg-gray-900"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                    <FaPhone />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-white">{contactSettings.phone}</p>
                  </div>
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
              >
                Contact Me
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-gray-900/60 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-gray-600 hover:bg-gray-800"
              >
                Read Blog
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-800 bg-gray-900/70 p-6 shadow-lg shadow-black/10">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Social Links
              </h4>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:text-white"
                  >
                    <span className="text-orange-400">
                      <Icon />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Quick note
              </p>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                {contactSettings.email
                  ? `Reach out at ${contactSettings.email} for collaboration, audits, or consulting.`
                  : 'Contact details are managed from the admin panel and can be updated at any time.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rennie Kawangu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}