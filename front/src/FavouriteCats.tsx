import { useState } from "react";
import Card from "./Card";

export default function FavouriteCats() {

  const [userToken, setUserToken] = useState("");
  fetch("http://cat-pinterest-api:3000/user", {
    headers: {
      "X-Auth-Token": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ login: "user", password: "sdsdsd7347adad" }),
  })
    .then((response) => setUserToken(response.headers.get("X-Auth-Token")))
    .catch(function (error) {
      console.log(error);
    });

  const [cats, setCats] = useState([]);
  fetch("http://cat-pinterest-api:3000/likes", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => setCats(data))
    .catch(function (error) {
      console.log(error);
    });

  return (
    <>
      {cats.map((cat) => (
        <Card cat={cat} userToken = {userToken}/>
      ))}
    </>
  );
}
