import Card from "./Card";
import { Cat, FavouriteCat } from "./App";

export default function FavouriteCats(props: any) {
    let favouriteCats = props.cats.filter((cat: Cat) => {
        return props.favouriteCats.find((fav: FavouriteCat) => fav.cat_id === cat.id);
    });

    return (
        <div className="cats">
            {favouriteCats.map((cat: Cat) => (
                <Card cat={cat} key={cat.id} favouriteCats={props.favouriteCats} addFavouriteCat={props.addFavouriteCat} delFavouriteCat={props.delFavouriteCat} token={props.token}/>
            ))}
        </div>
    );
}
