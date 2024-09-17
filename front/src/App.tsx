import { useState } from "react";
import Navigation from "./Navigation.tsx";
import AllCats from "./AllCats.tsx";
import FavouriteCats from "./FavouriteCats.tsx";

export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    favourite?: boolean;
}

export interface FavouriteCat {
    cat_id: string;
}

function App() {
    const [token, setToken] = useState<string>("");
    const [section, setSection] = useState<string>("allCats");
    const [cats, setCats] = useState<Cat[]>([]);
    const [favouriteCats, setFavouriteCats] = useState<FavouriteCat[]>([]);

    const url = `https://api.thecatapi.com/v1/images/search?limit=40&order=ASC`;
    const api_key =
        "live_BKJPuclaQPqvtxkdFsFTuWLABQ8L7zu4HzoZPEIxBtCD75OZeSDLcuJudyqJepE1";

    fetch(url, {
        headers: {
            "x-api-key": api_key,
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    }).then(data => {
        setCats(data);
    }).catch(error => {
        console.log(error);
    });

    if (token === '') {
        fetch("http://localhost:8080/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: "user", password: "sdsdsd7347adad" }),
        }).then(response => {
            if (response.status == 201) {
                let t = response.headers.get("X-Auth-Token");
                setToken(t ? t : "");
                fetch("http://localhost:8080/api/likes", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + t,
                    }
                }).then(response => {
                    if (response.status == 200) {
                        return response.json();
                    }
                    else if (response.status == 304) {
                        return Promise.reject(response.status);
                    }
                }).then(data => {
                    setFavouriteCats(data);
                }).catch(error => {
                    console.log(error);
                });
            } else {
                return Promise.reject(response.status);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    let addFavouriteCat = (cat_id: string) => {
        let items = [...favouriteCats];
        items.push({cat_id: cat_id});
        setFavouriteCats(items ? items : []);
    };

    let delFavouriteCat = (cat_id: string) => {
        let items = favouriteCats.filter((item: FavouriteCat) => {
            return item.cat_id !== cat_id;
        });
        setFavouriteCats(items ? items : []);
    };

    return (
        <>
            <Navigation onClick={setSection} />
            {section === "allCats" ? (
                <AllCats cats={cats} favouriteCats={favouriteCats ? favouriteCats : []} addFavouriteCat={addFavouriteCat} delFavouriteCat={delFavouriteCat} token={token}/>
            ) : (
                <FavouriteCats cats={cats} favouriteCats={favouriteCats ? favouriteCats : []} addFavouriteCat={addFavouriteCat} delFavouriteCat={delFavouriteCat} token={token}/>
            )}
        </>
    );
}

export default App;
