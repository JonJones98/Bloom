import { BrowserRouter, Routes,Route} from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/resume" element={<h1>Resume</h1>} />
        <Route path="/business-card" element={<h1>Business Card</h1>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
