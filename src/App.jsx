import React from 'react'
import Header from './components/Header/Header'
import Compare from './pages/Compare'
import SingleUser from './pages/SingleUser'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
const App = () => {
  return (
   <BrowserRouter>
    <Header/>
     <Routes>
       <Route path='/' element={<SingleUser/>}/>
       <Route path='/compare' element={<Compare/>}/>
     </Routes>
   </BrowserRouter>
  )
}

export default App


