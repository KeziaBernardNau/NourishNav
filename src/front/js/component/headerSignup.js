// function for rotating text
import React, { useState, useEffect } from "react";

function HeaderSignup() {
  const rotatingTexts = [
    "Discover the secrets of your plate",
    "Nourish your body",
    "Nurture yourself",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(rotatingTexts[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % rotatingTexts.length
      );
    }, 1500);

    return () => clearInterval(intervalId);
  }, []); // Runs only on component mount

  useEffect(() => {
    setCurrentText(rotatingTexts[currentTextIndex]);
  }, [currentTextIndex]); // Runs whenever currentTextIndex changes
  return (
    <div className="header-container">
      <h1>Join Us</h1>
      <p>{currentText}</p>
    </div>
  );
}

export default HeaderSignup;
