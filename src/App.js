import React, { useEffect, useState } from 'react';
import Search from './Search';

const API_KEY = "uR63PqazL936ExMlYlxx4fyvH6sqHilG"

const App = () => {


   const [articles , setArticles] = useState([]);
   const [term , setTerm] = useState('election');
   const [isLoading , setIsLoading] = useState(true)



useEffect(() => {

  const fetchArticles = async () => {
  try {
      const res = await fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${API_KEY}`
        )
      const articles = await res.json()
      console.log(articles.response.docs)
      setArticles(articles.response.docs)
      setIsLoading(false)
    }catch (error){
    console.error(error);
  }
  }
  fetchArticles()

} , [term])


  return (
    <>
         <div className='showcase'>
           <div className='owerlay px-5'>
             <h1 className='text-4xl font-bold text-light text-center mb-4'>Viewing articles about {term}</h1>

            <Search searchText={(text) => setTerm(text)} />
            </div>

         </div>

     {isLoading ? <h1 className='text-center mt-5 fw-bold'>Loading...</h1> :

       <section className='px-3 pt-5 pb-5 grid grid-cols gap-10'>
       {articles.map((article) => {
         const {abstract
           , headline:{main}
           , byline:{original}
            , lead_paragraph
            ,news_desk,
            section_name
            ,web_url,
            _id ,
             word_count
           } = article


         return(
           <article key={_id} className="bg-white py-4 px-3 mb-5 rounded lg:w-9/12 lg:mx-auto">
              <h2 className='fw-bold text-2xl mb-5'>{main}</h2>
               <p >{abstract}</p>
               <p>{lead_paragraph}</p>

               <ul className='my-4'>
                  <li> {original}</li>
                  <li><span className='fw-bold'>News Desk:</span> {news_desk}</li>
                  <li><span className='fw-bold'>Section Name:</span>{section_name}</li>
                  <li><span className='fw-bold'>Word Count:</span>{word_count}</li>
               </ul>
               <a href={web_url} target="_blank" className='underline'>Web Resource</a>
             </article>
         )
       })}

       </section>
     }
    </>
  );
}

export default App;
