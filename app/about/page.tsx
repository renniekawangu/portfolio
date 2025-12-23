export default function About() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Skills</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">💻 Full-Stack Development</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Frontend: HTML5, CSS3, JavaScript, React</li>
          <li>Backend: Node.js, Express, Flask</li>
          <li>Databases: SQLite, MySQL, PostgreSQL</li>
          <li>RESTful API design & integration</li>
          <li>Authentication & Authorization (JWT, Sessions, Tokens)</li>
          <li>Secure file uploads & data handling</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🔐 Cybersecurity & Bug Bounty</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Web Application Penetration Testing</li>
          <li>API Security Testing</li>
          <li>Broken Access Control (BOLA/BIDOR)</li>
          <li>Privilege Escalation & Authorization Flaws</li>
          <li>Authentication & Session Management Vulnerabilities</li>
          <li>OWASP Top 10</li>
          <li>Burp Suite, Postman, Nmap</li>
          <li>Responsible Vulnerability Disclosure</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">🛠️ Tools & Technologies</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Git & GitHub</li>
          <li>Linux (Kali Linux)</li>
          <li>Docker (basic)</li>
          <li>CI/CD fundamentals</li>
          <li>Secure coding best practices</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Achivements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="border p-4 rounded">
          <img src="/assets/achivements/cyberSec-1.png" alt="Certificate 1" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">Cyber Security</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </div>
        <div className="border p-4 rounded">
          <img src="/assets/achivements/fullStackDev-1.png" alt="Certificate 2" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">Full Stack Web Developer</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </div>
        <div className="border p-4 rounded">
          <img src="/assets/achivements/wwCtf25-1.png" alt="Certificate 3" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">World Wide CTF 2025</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </div>
         <div className="border p-4 rounded">
          <img src="/assets/achivements/bugbounty.jpeg" alt="Certificate 3" className="w-full h-48 object-cover mb-2" />
          <h3 className="text-xl font-semibold mb-2">BudBounty</h3>
          <p className="mb-2">Issued by Issuer</p>
          <a href="#" className="text-blue-500">View Certificate</a>
        </div>
      </div>
      <p>Replace the placeholder images (/placeholder-certificate.jpg) with your actual certificate images and update the details.</p>
    </main>
  );
}