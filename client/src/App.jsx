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
    <div  hidden={results.length == 0} className="results-container">
    {loading ? (
        <div className="loader"></div>
      ) : (
      results.map((hadith, i) => {
          if (hadith.status === "sahih"){
        return (
          <div key={i} className="result">
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
  </div>
);

}

export default App
