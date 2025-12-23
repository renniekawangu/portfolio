export default function Projects() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">E-Commerce Store</h2>
          <p>Placeholder: Description of project 1. Replace with actual project details.</p>
          <a href="https://e-com-store-1ejc.onrender.com/" className="text-blue-500">View Project</a>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">React2shell scanner/exploit</h2>
          <p>Placeholder: Description of project 2. Replace with actual project details.</p>
          <a href="#" className="text-blue-500">View Project</a>
        </div>
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Project 3</h2>
          <p>Placeholder: Description of project 3. Replace with actual project details.</p>
          <a href="#" className="text-blue-500">View Project</a>
        </div>
      </div>
    </main>
  );
}