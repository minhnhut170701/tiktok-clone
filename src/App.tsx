import HomePgae from "./Pages/Home"
import HeaderBar from "./components/HeaderBar"
import SideBar from "./components/SideBar"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {

  return (
    <div className="app">
      <HeaderBar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePgae />} />
            <Route path="/2" element={<p>hi</p>} />
            <Route path="/*" element={<p>Error</p>} />
          </Routes>
        </Router>
      <SideBar />
    </div>
  )
}

export default App
