import { useState, useEffect } from "react";
import axios from "axios";
import { red } from "@mui/material/colors";
import { Avatar, Badge, Box, Card, CardContent, CardHeader, CardMedia, FormControl, Grid, Input, InputAdornment, Link, Typography, Stack } from "@mui/material";
import Icon from "@mui/material/Icon";
import MailIcon from "@mui/icons-material/Mail";

const api_key = "f7952ab1-2fe1-4dbd-9dbb-f97bdc0f3fca";

export default function Feed() {
  const [data, setData] = useState([]);
  const [entry, setEntry] = useState("");
  const url = `https://content.guardianapis.com/search?q=${entry}query-fields=headline&show-fields=thumbnail,headline,byline&order-by=newest&api-key=${api_key}`;

  const filtered = data.filter((elem) => {
    return elem.webTitle.toLowerCase().includes(entry.toLowerCase());
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setData(res.data.response.results);
    };
    fetchData();
  }, [url]);

console.log(data)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FormControl
        type="submit"
        sx={{
          marginBottom: 6,
        }}
      >
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
        {filtered.length !== 0 &&
          filtered.map((item) => {
            return (
              <Grid container spacing={2} key={item.id}>
                <Grid item xs={6} md={4}>
                  <Stack spacing={2} direction="row">
                    <Badge
                      badgeContent={item.pillarName}
                      color="secondary"
                    >
                      <MailIcon color="action" />
                    </Badge>
                    <Badge badgeContent={item.sectionName} color="success">
                      <MailIcon color="action" />
                    </Badge>
                  </Stack>
                </Grid>
                <Grid item xs={6} md={8}>
                  <Card variant="outlined" sx={{ marginBottom: 5 }}>
                    <Link href={item.webUrl} color="primary" underline="none">
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            {item.webTitle[0]}
                          </Avatar>
                        }
                        title={item.webTitle}
                        subheader={item.webPublicationDate}
                      />
                    </Link>
                    <CardMedia
                      component="img"
                      src={item.fields.thumbnail}
                      alt="pics"
                    />
                    <CardContent>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
      </article>
    </Box>
  );
}

// `https://www.theguardian.com/${item.id}`