import "./AllCats.css";
import { useEffect, useState } from 'react'
import Card from "./Card";

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  favourite?: boolean;
}

 export interface Favourites {
  [catId: string]: boolean | undefined;
}

export default function AllCats() {
  const url = `https://api.thecatapi.com/v1/images/search?limit=20&order=ASC`;
  const api_key =
    "live_BKJPuclaQPqvtxkdFsFTuWLABQ8L7zu4HzoZPEIxBtCD75OZeSDLcuJudyqJepE1";

  const [cats, setCats] = useState<Cat[]>([]);
  const [favourites, setFavourites] = useState<Favourites>({});
  useEffect(() => {
    fetch(url, {
      headers: {
        "x-api-key": api_key,
      },
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setCats(data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  const onClick = (id: string) => {
    const isFavourite = Boolean(favourites[id]);
    setFavourites({...favourites, [id]: !isFavourite})
  }

  return (
    <div className="cats">
      {cats.map((cat) => (
        <Card onClick={onClick} cat = {cat} favourites={favourites}/>
      ))}
    </div>
  );
}
