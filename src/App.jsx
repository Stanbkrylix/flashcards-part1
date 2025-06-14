import { useState } from "react";
import flashcards from "./FlashCardData";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [cardData, setCardData] = useState(flashcards);
  const [currentCard, setCurrentCard] = useState(0);

  function onClickNextBtn() {
    if (currentCard >= cardData.length - 1) return;
    setCurrentCard(currentCard + 1);
  }

  function onClickPrevBtn() {
    if (currentCard <= 0) return;
    console.log(currentCard);
    setCurrentCard(currentCard - 1);
  }

  function handleCardClick(currentCard) {
    if (cardData[currentCard].flip) {
      setCardData((prev) =>
        prev.map((card, index) =>
          currentCard === index ? { ...card, flip: false } : card
        )
      );
    }

    if (!cardData[currentCard].flip) {
      setCardData((prev) =>
        prev.map((card, index) =>
          currentCard === index ? { ...card, flip: true } : card
        )
      );
    }
  }

  function resetFlipStatus(currentCard) {
    setCardData((prev) =>
      prev.map((card) => (!card.flip ? { ...card, flip: true } : card))
    );
  }

  return (
    <>
      <div className="app-container">
        <Card
          cardData={cardData}
          currentCard={currentCard}
          handleCardClick={handleCardClick}
        />
        <NavigationBtns
          onClickPrevBtn={onClickPrevBtn}
          onClickNextBtn={onClickNextBtn}
          resetFlipStatus={resetFlipStatus}
          currentCard={currentCard}
        />
      </div>
    </>
  );
}

function Card({ cardData, currentCard, handleCardClick }) {
  function pickCardColor() {
    if (cardData[currentCard].difficulty === "easy") return "green";
    if (cardData[currentCard].difficulty === "medium") return "orange";
    if (cardData[currentCard].difficulty === "hard") return "pink";
  }

  return (
    <div className="flip-card" onClick={() => handleCardClick(currentCard)}>
      <div
        className={`flip-card-inner ${
          cardData[currentCard].flip ? "" : "rotate"
        }`}
        style={{ color: "" }}
      >
        <div
          className="flip-card-front"
          style={{ backgroundColor: pickCardColor() }}
        >
          <p>Difficulty: {cardData[currentCard].difficulty}</p>
          <p>
            Q {cardData[currentCard].id}: Is the {cardData[currentCard].name} a
            fruit or a vegetable?
          </p>
        </div>
        <div
          className="flip-card-back"
          style={{ backgroundColor: pickCardColor() }}
        >
          {cardData[currentCard].facts[0]}
        </div>
      </div>
    </div>
  );
}

function NavigationBtns({
  onClickPrevBtn,
  onClickNextBtn,
  resetFlipStatus,
  currentCard,
}) {
  return (
    <div className="navigation-btn">
      <button
        className="previous-btn"
        onClick={() => {
          resetFlipStatus(currentCard);
          onClickPrevBtn();
        }}
      >
        Previous
      </button>
      <button className="next-btn" onClick={onClickNextBtn}>
        Next
      </button>
    </div>
  );
}

export default App;
