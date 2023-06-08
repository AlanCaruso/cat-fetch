import { useState, useEffect } from "react";
import "./style.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_RANDOM_IMAGE_URL = "https://cataas.com";

export default function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        const firstWords = fact.split(" ", 3).join(" ");
        console.log(firstWords);

        fetch(
          `https://cataas.com/cat/says/${firstWords}?size=50&color=red&json=true`
        )
          .then((res) => res.json())
          .then((response) => {
            const { url } = response;
            setImageUrl(url);
          });
      });
  }, []);

  return (
    <main>
      <h1>Cat Fetch</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_RANDOM_IMAGE_URL}${imageUrl}`}
          alt={`Image Extracted using the first words from ${fact}`}
        />
      )}
    </main>
  );
}
