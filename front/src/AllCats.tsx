import "./Cats.css";
import { useEffect } from 'react'
import Card from "./Card";
import { Cat, FavouriteCat } from "./App";
interface AllCatsProps {
  token: string;
  cats: Cat[];
  setCats: Function;
  favouriteCats: FavouriteCat[]
}
export default function AllCats(props: AllCatsProps) {

  const url = `https://api.thecatapi.com/v1/images/search?limit=40&order=ASC`;
  const api_key =
    "live_BKJPuclaQPqvtxkdFsFTuWLABQ8L7zu4HzoZPEIxBtCD75OZeSDLcuJudyqJepE1";

  useEffect(() => {
    fetch(url, {
      headers: {
        "x-api-key": api_key,
      },
    }).then((response) => {
      return response.json();
    }).then((data) => {
      props.setCats(data);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <div className="cats">
      {props.cats.map((cat) => (
        <Card  favouriteCats = {props.favouriteCats} userToken = {props.token} key={cat.id} cat = {cat}/>
      ))}
    </div>
  );
}
