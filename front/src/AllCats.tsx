import "./Cats.css";
import Card from "./Card";
import { Cat } from "./App";

export default function AllCats(props: any) {
    return (
        <div className="cats">
            {props.cats.map((cat: Cat) => (
                <Card cat={cat} key={cat.id} favouriteCats={props.favouriteCats} addFavouriteCat={props.addFavouriteCat} delFavouriteCat={props.delFavouriteCat} token={props.token}/>
            ))}
        </div>
    );
}
