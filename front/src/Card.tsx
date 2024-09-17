import "./Card.css";
import { FavouriteCat } from "./App";

export default function Card(props: any) {
    const isFavourite = props.favouriteCats.find((fav: FavouriteCat) => fav.cat_id === props.cat.id);
    const onClick = (id: string) => {
        if (!isFavourite) {
            fetch("http://localhost:8080/api/likes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                },
                body: JSON.stringify({
                    cat_id: id,
                }),
            }).then(response => {
                if (!response.ok)
                    return Promise.reject(response.status);
                props.addFavouriteCat(id);
            }).catch(error => {
                console.log(error);
            });
        } else {
            fetch("http://localhost:8080/api/likes/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + props.token,
                }
            }).then(response => {
                if (!response.ok)
                    return Promise.reject(response.status);
                props.delFavouriteCat(id);
            }).catch(error => {
                console.log(error);
            });
        }
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
                className={`card__like ${isFavourite ? "_favourite" : ""}`}
                onClick={() => onClick(props.cat.id)}
            />
        </div>
    );
}
