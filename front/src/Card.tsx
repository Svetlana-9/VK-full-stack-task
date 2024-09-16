import { Favourites } from "./AllCats";
import "./Card.css";

interface CardProps{
  onClick: Function;
  cat:{
    id: string;
    width: number;
    height: number;
    url: string;
  };
  favourites: Favourites;
}

export default function Card({onClick, cat, favourites}:CardProps) {
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
