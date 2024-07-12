const express =require("express")
const cors =require("cors")
const axios  =require("axios")
const cheerio  =require("cheerio")
const { dbConnect } = require("./config/db")
const ScrapeData = require("./model/scrape.model")
const app =express()
require("dotenv").config()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
dbConnect()
app.post("/scrape",async (req,res)=>{
    try {
        const {url} =req.body
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const result = {
            name: $('meta[property="og:site_name"]').attr('content') || $('title').text(),
            description: $('meta[name="description"]').attr('content'),
            logo: $('meta[property="og:image"]').attr('content'),
            facebook: $('a[href*="facebook.com"]').attr('href'),
            linkedin: $('a[href*="linkedin.com"]').attr('href'),
            twitter: $('a[href*="twitter.com"]').attr('href'),
            instagram: $('a[href*="instagram.com"]').attr('href'),
            address: $('address').text(),
            phone: $('a[href^="tel:"]').attr('href')?.replace('tel:', ''),
            email: $('a[href^="mailto:"]').attr('href')?.replace('mailto:', '')
          };
          const resp =  new ScrapeData(result)
const finalData=          await resp.save()
          console.log(finalData);
      res.status(200).json(finalData)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message || "internal server error "})
    }
})


app.get("/scrape-data",async (req,res)=>{
    try {
        const data = await ScrapeData.find({})
        res.status(200).json(data)
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({message:error.message || "internal server error "})
    }
})
app.listen(process.env.PORT,()=>{
    console.log(`server is up at http://localhost:${process.env.PORT}`);
})