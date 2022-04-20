import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = 'f7952ab1-2fe1-4dbd-9dbb-f97bdc0f3fca'

export default function Feed() {
    const url = `https://content.guardianapis.com/search?q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${api_key}`;

    const [data, setData] = useState('')

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(url);
            
            setData(res.data.response.results)
        }

        fetchData();
    }, [])

   
    const newData = Object.entries(data)
    console.log(newData);

  return (
    <div>
      <article className="articles">
          <h1>The news</h1>
        {/* {newData.map((item) => {
          <article>
            <a href={item.webUrl}>Web Page</a>
            <p>{item.fields.headline}</p>
          </article>
        })} */}
      </article>
    </div>
  );}
