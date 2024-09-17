import { useState, useEffect } from "react";
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
  const [cats, setCats] = useState<Cat[]>([]);
  const [favouriteCats, setFavouriteCats] = useState<FavouriteCat[]>([]);
  const [section, setSection] = useState<string>("allCats");

  const user = { login: "user", password: "sdsdsd7347adad" };

  const [token, setToken] = useState<string>("");

  fetch("http://localhost:8080/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      let t = response.headers.get("X-Auth-Token");
      setToken(t ? t : "");
      console.log("token: " + token);
    })
    .catch(function (error) {
      console.log(error);
    });

  fetch("http://localhost:8080/api/likes", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (!response.ok) return Promise.reject(response.status);
      if (response.status == 200) return response.json();
    })
    .then((data) => setFavouriteCats(data))
    .catch(function (error) {
      console.log(error);
    });
  // props.cats.filter((cat) =>
  //   favouriteCats.map((favouriteCat) => favouriteCat.cat_id == cat.id)
  // );
  // console.log(props.cats);

  return (
    <>
      <Navigation onClick={setSection} />
      {section === "allCats" ? (
        <AllCats
          favouriteCats={favouriteCats}
          cats={cats}
          setCats={setCats}
          token={token}
        />
      ) : (
        <FavouriteCats
          favouriteCats={favouriteCats}
          cats={cats}
          setCats={setCats}
          token={token}
        />
      )}
    </>
  );
}

export default App;
