export default function Projects() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-white">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 text-white">
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">E-Commerce Store</h2>
            <p className="text-gray-300 mb-4">Full-stack e-commerce application built with React and Node.js, featuring secure payment processing and user authentication.</p>
            <a href="https://e-com-store-1ejc.onrender.com/" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">View Project</a>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 text-white">
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">React2shell scanner/exploit</h2>
            <p className="text-gray-300 mb-4">React2shell is a React-based scanner and exploit tool designed to identify vulnerabilities in web applications and perform automated exploitation.</p>
            <a href="https://github.com/renniekawangu/react2shell" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">View Project</a>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-700 text-white">
            <h2 className="text-2xl font-semibold mb-3 text-gray-100">uNet</h2>
            <p className="text-gray-300 mb-4">A full-stack web application built with React and Node.js, featuring a modern UI and secure backend services.</p>
            <a href="https://github.com/renniekawangu/uNet" className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300">View Project</a>
          </div>
        </div>
      </div>
    </main>
  );
}