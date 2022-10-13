
import './App.css';

import React, { useEffect,useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

const  App =() =>  {
  const pageSize=5;
  const apiKey = process.env.REACT_APP_NEWS_API


  const[progress, setProgress] = useState(0)
  
  
    return (
      <div>
       
          <Navbar/>
          <LoadingBar
          height={3}
            color='#f11946'
            progress={progress}
            
          />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="in" category="general"/>} />
            <Route path="business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country="in" category="business"/>} />
            <Route path="entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>} />
            <Route path="general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="in" category="general"/>} />
            <Route path="health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country="in" category="health"/>} />
            <Route path="science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country="in" category="science"/>} />
            <Route path="sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="in" category="sports"/>} />
            <Route path="technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country="in" category="technology"/>} />
          </Routes>
        
      
      </div>
    )
  
}

export default App ;

// 6ac1f73fa1c6453ca5f61241e9178e9a sujitkori12@gmail.com
// 3f7e9eb45c18461f8dbce166a1da3ac3 sujitkori7@gmail.com


