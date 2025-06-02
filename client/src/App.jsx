import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import SERVER_URL from '../config/SERVER_URL.js'

import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
    
  const handleSubmit =async (e)=>{
    setResults([])
    setLoading(true)
    e.preventDefault()
    const {data} = await axios.get(SERVER_URL+'/search?query='+query)
    console.log(data)
    setLoading(false)
    setResults(data.hadiths) 
  }
  
  return (
  <div className="main-page">
    <form className="shadow" onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search Hadiths" />
      <button type="submit">Submit</button>
    </form>
    <div  hidden={results.length == 0} className={"results-container "+loading || results.length > 0 ? "h-full" : "h-0"}>
    {loading ? (
        <div className="loader"></div>
      ) : (
      results.map((hadith, i) => (
          <div key={i} className={"result "}>
            <h3>{hadith.book?.bookName +" : "+hadith.hadithNumber}</h3>
            <p>{hadith.hadithArabic}</p>
            <p><em>{hadith.hadithEnglish}</em></p>
            <div className="">
              <p>chapter : {hadith.chapter?.chapterEnglish + "        " + hadith.chapter?.chapterArabic}</p>
            </div>
          </div>
        ))
      )}
    </div>
    <footer>
      <div>
        <p>Intelligence : <span> Gemini 2.0 Flash </span> </p>
        <p>Hadiths :  <span> Hadiths API </span> </p>
      </div>
      <p>(c) hadith finder 2025</p>
      <p>github:abancp/hadiths</p>
    </footer>
  </div>
);

}

export default App
