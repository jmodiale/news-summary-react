import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = 'f7952ab1-2fe1-4dbd-9dbb-f97bdc0f3fca'

export default function Feed() {
    const url = `https://content.guardianapis.com/search?q=&query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${api_key}`;

    const [data, setData] = useState([])
    const [entry, setEntry] = useState('')

    const filtered = data.filter((elem) => {
        const word = elem.fields.headline.toLowerCase()
        if (word.includes(entry.toLowerCase())){
            return word
        } else {
            return null
        }
    })

    useEffect(()=>{
        const fetchData = async () => {
            const res = await axios.get(url);
            setData(res.data.response.results)
        }
        fetchData();
    }, [url])

    console.log(entry)
    console.log(data)

  return (
    <div>
      <form type="submit">
        <input value={entry} onChange={(e) => setEntry(e.target.value)} />
      </form>
      <article className="articles">
        {filtered.length !== 0 && (
            <div>
            {filtered.map((item) => {
          return (
            <article key={item.id}>
              <a href={item.webUrl}>
                <p>{item.fields.headline}</p>
              </a>
              <img src={item.fields.thumbnail} alt="pics" />
            </article>
          );
        })}
        </div>
        )};
      </article>
    </div>
  );}
