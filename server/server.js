import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'
import fs from 'fs'
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const HADITH_API_KEY = process.env.HADITH_API_KEY;

app.use(cors({origin:['http://localhost:5173']}));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
let systemPropmpt  
let hadiths = []

try {
   systemPropmpt = fs.readFileSync('./system-prompt.txt', 'utf-8');
} catch (err) {
  console.error('Error reading file:', err);
}

app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    console.log(query)
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: systemPropmpt + query,
    });


    const match = response.text.match(/\[([^\]]+)\]/);
    let hadithIndexes 
    if (match) {
      hadithIndexes = JSON.parse('[' + match[1] + ']');
    } else {
      res.status(404).json({ message: 'No match found.' });
    }
    console.log(hadithIndexes)

    const books = ['sahih-bukhari','sahih-muslim','abu-dawood','al-tirmidhi','ibn-e-majah','sunan-nasai']
    const hadiths = await Promise.all(
    hadithIndexes.map(async (hadith,i) => {
      const apiUrl = 'https://hadithapi.com/api/hadiths/?apiKey=$2y$10$NTBVr5vXqufBslPs55IPZV6E9sOCe9MMHlbYgzXZEdtANF2AG&book='+books[hadith[0]]+'&hadithNumber='+hadith.split('-')[1];
      const {data} = await axios.get(apiUrl)
      return data.hadiths?.data[0]
    })
)
    console.log(hadiths)
    res.json({hadiths})
      
  } catch (err) {
    console.error('Error :', err.response?.data || err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

