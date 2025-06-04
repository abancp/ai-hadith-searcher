import React,{useState,useEffect} from 'react'
import axios from 'axios'
import SERVER_URL from '../../config/SERVER_URL.js'
import "./Book.css"
import { useParams } from "react-router";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Book(){
  const {bookName} = useParams();
  const [chapters,setChapters] = useState([])
  const [loading,setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  useEffect(()=>{
    setLoading(true)
    axios.get(SERVER_URL+"/book/"+bookName).then(({data})=>{
      setLoading(false)
      console.log(data)
      setChapters(data.chapters)
    })
    .catch(()=>{
      setLoading(false)
    })
  },[]) 
    
  const handleSubmit =async (e)=>{
    setResults([])
    setLoading(true)
    e.preventDefault()
    try{
      const {data} = await axios.get(SERVER_URL+'/search?query='+query+" Search only in "+bookName)
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

      {chapters.length == 0 && <Skeleton height={68} containerClassName="gap-1" borderRadius={"8px"} className="mt-1"  count={10}/>} 
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
