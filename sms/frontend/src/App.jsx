
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Lecturer from './pages/Lecturer';
import Charts from './pages/Charts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/lecturer' element={<Lecturer/>}/>
        <Route path='/charts' element={<Charts/>}/>
      </Routes>
    </BrowserRouter>
  );
}
