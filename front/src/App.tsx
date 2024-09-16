import { useState } from "react";
import Navigation from "./Navigation.tsx";
import AllCats from "./AllCats.tsx";
import FavouriteCats from "./FavouriteCats.tsx";

function App() {
  const [section, setSection] = useState<string>("allCats");

  return (
    <>
      <Navigation onClick={setSection} />
      {section === "allCats" ? <AllCats /> : <FavouriteCats />}
    </>
  );
}

export default App;
