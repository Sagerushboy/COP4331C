import { useState } from "react";

interface Card {
  name: String;
}

export default function CardUI() {
  const [cards, setCards] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [addName, setAddName] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const addCard = async (event: any) => {
    event.preventDefault();

    fetch("http://localhost:8080/cards/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: addName }) as any,
    }).then(() => setAddName(""));
  };

  const searchCard = async (event: any) => {
    event.preventDefault();

    let url =
      "http://localhost:8080/cards/search?" +
      new URLSearchParams({
        name: searchName,
      });

    let resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();
    let results = data.cards.map((item: Card) => item.name);

    setCards(results);
  };

  return (
    <div id="accessUIDiv">
      <br />
      <input
        type="text"
        id="searchText"
        placeholder="Card To Search For"
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button
        type="button"
        id="searchCardButton"
        className="buttons"
        onClick={searchCard}
      >
        Search Card
      </button>
      <br />
      <span id="cardSearchResult"></span>
      <p id="cardList">{`${cards.join(",")}`}</p>
      <br />
      <br />
      <input
        type="text"
        id="cardText"
        placeholder="Card To Add"
        onChange={(e) => setAddName(e.target.value)}
      />
      <button
        type="button"
        id="addCardButton"
        className="buttons"
        onClick={addCard}
      >
        Add Card
      </button>
      <br />
      <span id="cardAddResult"></span>
    </div>
  );
}
