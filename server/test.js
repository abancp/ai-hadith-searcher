import { GoogleGenAI } from "@google/genai";
import fs from 'fs'

const ai = new GoogleGenAI({ apiKey: "AIzaSyA6hbAqdmqz-rDPie9GFt0GrwJLpq4laAs" });
let systemPropmpt  
let hadiths
try {
   systemPropmpt= fs.readFileSync('./system-prompt.txt', 'utf-8');
} catch (err) {
  console.error('Error reading file:', err);
}

const query = "salath has 5 times"
const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: data+query,
    })
console.log(response.text)
const match = response.text.match(/\[([^\]]+)\]/);
if (match) {
  hadiths = JSON.parse('['+match[1]+']')
console.log(hadiths)
} else {
  console.log('No match found.');
}


const books = ['sahih-bukhari','sahih-muslim','abu-dawood','al-tirmidhi','ibn-e-majah','sunan-nasai']

hadiths.forEach((hadith,i) => {
console.log(i+1)
  const apiUrl = 'https://hadithapi.com/api/hadiths/?apiKey=$2y$10$NTBVr5vXqufBslPs55IPZV6E9sOCe9MMHlbYgzXZEdtANF2AG&book='+books[hadith[0]]+'&hadithNumber='+hadith.split('-')[1];
console.log(apiUrl)
fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log("- "+data.hadiths.data[0].hadithEnglish);
})
.catch(error => {
    console.log(error);
})
});
