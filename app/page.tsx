export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg mb-8">I am a Full-Stack Web Developer, Cybersecurity Specialist, and Bug Bounty Hunter with a strong passion for building secure, scalable, and high-performance web applications. I specialize in developing modern web systems while identifying and mitigating real-world security vulnerabilities before they can be exploited.

With hands-on experience in offensive security, I actively discover and responsibly disclose vulnerabilities such as Broken Access Control (BOLA/BIDOR), Privilege Escalation, Authentication Flaws, API Security Issues, and Client-Side Trust Vulnerabilities. I approach security with a practical, attacker-mindset, ensuring applications are resilient against modern threats.

On the development side, I design and implement end-to-end web solutions, from responsive user interfaces to robust backend APIs and databases, always following secure-by-design principles. My combined skill set allows me to bridge the gap between development and security, delivering systems that are both functional and hardened.

I am continuously learning, testing, and refining my skills through real-world projects, capture-the-flag challenges, and bug bounty programs, with a strong focus on ethical hacking and responsible disclosure.</p>
        <a href="/about" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Learn More About Me</a>
      </section>
    </main>
  );
}
