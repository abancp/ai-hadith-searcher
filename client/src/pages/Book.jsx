import React,{useState,useEffect} from 'react'
import axios from 'axios'
import SERVER_URL from '../../config/SERVER_URL.js'
import "./Book.css"
import { useParams } from "react-router";



function Book(){
  const {bookName} = useParams();
  const [chapters,setChapters] = useState([])
  const [loading,setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  useEffect(()=>{
    axios.get(SERVER_URL+"/book/"+bookName).then(({data})=>{
      console.log(data)
      setChapters(data.chapters)
    })
    .catch(()=>{

    })
  },[]) 
    
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
    <div className="book-page">
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder={"Search Hadiths in "+bookName} />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        </button>
      </form>
      <div className="chapter-container">
  
      {
        chapters.map((chapter)=>(
          <div className="chapter">
            <a>{chapter.chapterEnglish}</a>
            <a>{chapter.chapterArabic}</a>
          </div>
        ))
      } 
      </div>
    </div>
  )
}

export default Book
