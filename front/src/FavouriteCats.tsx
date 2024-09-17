import Card from "./Card";
import { Cat, FavouriteCat } from "./App";

interface FavouriteCatsProps {
  token: string;
  cats: Cat[];
  setCats: Function;
  favouriteCats: FavouriteCat[];
}

export default function FavouriteCats(props: FavouriteCatsProps) {


  return (
    <>
      <div className="cats">
        {props.cats.map((cat) => (
          <Card favouriteCats = {props.favouriteCats} cat={cat} key={cat.id} userToken={props.token} />
        ))}
      </div>
    </>
  );
}
