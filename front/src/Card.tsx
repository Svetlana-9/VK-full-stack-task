import "./Card.css";
// import { useState } from "react";
import { FavouriteCat } from "./App";

interface CardProps {
  userToken?: string;
  cat: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  favouriteCats: FavouriteCat[];
}
export interface Favourites {
  [catId: string]: boolean | undefined;
}
export default function Card (props: CardProps) {
  // const [favourites, setFavourites] = useState<Favourites>({});

  const onClick = (id: string) => {
    const isFavourite = props.favouriteCats.filter((favouriteCat) => favouriteCat.cat_id == id).length;
    if (isFavourite) {
      fetch("http://localhost:8080/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.userToken,
        },
        body: JSON.stringify({
          cat_id: id,
        }),
      })
        .then((response) => {
          if (!response.ok) return Promise.reject(response.status);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      fetch("http://localhost:8080/api/likes/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.userToken,
        },
      })
        .then((response) => {
          if (!response.ok) return Promise.reject(response.status);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // setFavourites({ ...favourites, [id]: !isFavourite });
  };
  return (
    <div className="card" key={props.cat.id}>
      <img
        src={props.cat.url}
        width={props.cat.width}
        height={props.cat.height}
        className="card__image"
      />
      <div
        className={`card__like ${props.favouriteCats.filter((favouriteCat) => favouriteCat.cat_id == props.cat.id).length ? "_favourite" : ""}`}
        onClick={() => onClick(props.cat.id)}
      />
    </div>
  );
}
