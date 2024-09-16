import "./Card.css";
import { useState } from "react";

interface CardProps {
  userToken?: string,
  cat: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}
export interface Favourites {
  [catId: string]: boolean | undefined;
}
export default function Card({ cat, userToken }: CardProps) {
  const [favourites, setFavourites] = useState<Favourites>({});

  const onClick = (id: string) => {
    const isFavourite = Boolean(favourites[id]);
    if (isFavourite) {
      fetch("http://cat-pinterest-api:3000/likes", {
        method: "POST",
        body: JSON.stringify({
          cat_id: id,
          created_at: new Date(),
        }),
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      fetch("http://cat-pinterest-api:3000/likes/:like_id", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }).catch(function (error) {
        console.log(error);
      });
    }
    setFavourites({ ...favourites, [id]: !isFavourite });
  };

  return (
    <div className="card" key={cat.id}>
      <img
        src={cat.url}
        width={cat.width}
        height={cat.height}
        className="card__image"
      />
      <div
        className={`card__like ${favourites[cat.id] ? "_favourite" : ""}`}
        onClick={() => onClick(cat.id)}
      />
    </div>
  );
}
