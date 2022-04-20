import { useState, useEffect } from "react";
import axios from "axios";
import { Card, FormControl, Grid, Input, InputAdornment } from "@mui/material";
import Icon from "@mui/material/Icon";

const api_key = "f7952ab1-2fe1-4dbd-9dbb-f97bdc0f3fca";

export default function Feed() {
  const [data, setData] = useState([]);
  const [entry, setEntry] = useState("");
  const url = `https://content.guardianapis.com/search?q=${entry}query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${api_key}`;

  const filtered = data.filter((elem) => {
    const word = elem.fields.headline.toLowerCase();
    if (word.includes(entry.toLowerCase())) {
      return word;
    } else {
      return null;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setData(res.data.response.results);
    };
    fetchData();
  }, [url]);


  return (
    <div>
      <FormControl type="submit">
        <Input
          value={entry}
          type="search"
          onChange={(e) => setEntry(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Icon
                baseClassName="fas"
                className="fa-plus-circle"
                color="primary"
              />
            </InputAdornment>
          }
        />
      </FormControl>
      <article className="articles">
        {filtered.length !== 0 && (
            filtered.map((item) => {
              return (
                <Grid container spacing={2}>
                  <Grid item xs={4}>{item.id}</Grid>
                    <Grid item xs={8}>
                        <Card key={item.id}>
                            <a href={item.webUrl}>
                            <p>{item.fields.headline}</p>
                            </a>
                            <img src={item.fields.thumbnail} alt="pics" />
                        </Card>
                    </Grid>
                </Grid>
              );
            })
        )}
      </article>
    </div>
  );
}

// `https://www.theguardian.com/${item.id}`