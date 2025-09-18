import {Routes,Route} from 'react-router-dom'
import HomePage from "./pages/HomePage"
import CountryDetailPage from "./pages/CountryDetailPage"
import Header from "./components/Header"



function App() {

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/country/:countryName" element={<CountryDetailPage/>}/>
      </Routes>
    </div>

  )
}

export default App;
