export default function Projects() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">E-Commerce Store</h2>
          <p>Full-stack e-commerce application built with React and Node.js, featuring secure payment processing and user authentication.</p>
          <a href="https://e-com-store-1ejc.onrender.com/" className="text-blue-500">View Project</a>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">React2shell scanner/exploit</h2>
          <p>React2shell is a React-based scanner and exploit tool designed to identify vulnerabilities in web applications and perform automated exploitation.</p>
          <a href="https://github.com/renniekawangu/react2shell" className="text-blue-500">View Project</a>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">uNet</h2>
          <p>A full-stack web application built with React and Node.js, featuring a modern UI and secure backend services.</p>
          <a href="https://github.com/renniekawangu/uNet" className="text-blue-500">View Project</a>
        </div>
      </div>
    </main>
  );
}