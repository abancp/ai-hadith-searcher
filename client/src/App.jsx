import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import SERVER_URL from '../config/SERVER_URL.js'
import { NavLink } from "react-router";


import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
    
  const handleSubmit =async (e)=>{
    setResults([])
    setLoading(true)
    e.preventDefault()
    try{
      const {data} = await axios.get(SERVER_URL+'/search?query='+query)
    console.log(data)
    setLoading(false)
    setResults(data.hadiths) 
    }catch(e){
      setLoading(false)
    }

  }
  
  return (
  <div className="main-page">
    <header></header>
    <form className={results.length > 0|| "shadow"} onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search Hadiths" />
      <button type="submit">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>

      </button>
    </form>
    <div  hidden={results.length == 0} className="results-container">
    {loading ? (
        <div className="loader"></div>
      ) : (
      results.map((hadith, i) => {
          if (hadith.status.toLowerCase() === "sahih"){
        return (
          <div key={i} className="result ">
            <h3>{hadith.book?.bookName +" : "+hadith.hadithNumber}</h3>
            <p>{hadith.hadithArabic}</p>
            <p><em>{hadith.hadithEnglish}</em></p>
            <div className="flex between">
              <p>chapter : {hadith.chapter?.chapterEnglish} </p>
              <p> { hadith.chapter?.chapterArabic}</p>
            </div>
            <div className="flex between">
              <p>{hadith.book?.writerName} </p>
            </div>
          </div>
      ) 
      }

        })
      )}
    </div>
    <div className="book-container">
      <NavLink to="/book/sahih-bukhari" className="book">Sahih Bukhari</NavLink> 
      <NavLink to="/book/sahih-muslim" className="book">Sahih Muslim</NavLink> 
      <NavLink to="/book/abu-dawood" className="book">Sunan Abu Dawood</NavLink> 
      <NavLink to="/book/al-tirmidhi" className="book">Jami' al-Tirmidhi</NavLink> 
      <NavLink to="/book/sunan-nasai" className="book">Sunan al-Nasa’i</NavLink> 
      <NavLink to="/book/ibn-e-majah" className="book">Sunan Ibn Majah</NavLink> 
    </div> 
  </div>
);

}

export default App
