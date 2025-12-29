import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to='/charts'>View Charts</Link><br/>
      <Link to='/lecturer'>Lecturer UI</Link>
    </div>
  );
}
