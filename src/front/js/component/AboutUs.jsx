import React from 'react';
import "../../styles/aboutUs.css";
import inclusiveBody from "../../img/inclusiveBody.jpeg";


const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <h1 className="about-header">About Us</h1>
        <p className="about-description">
          Welcome to our journey of nutrition, empowerment, and self-love. We are a team of women
          who embarked on a mission to change the narrative around nutrition and body image. Our
          journey started from our own struggles and realizations that the path to wellness is not
          one-size-fits-all.
        </p>
        <p className="about-description">
          We created this platform to be a haven for anyone looking to understand their body better,
          track their nutritional intake, and celebrate their progress, no matter how small. Our
          approach is rooted in the belief that every body is unique, and everyone's nutritional needs
          are different.
        </p>
        <p className="about-description">
          Our goal is not just to provide a tool for tracking macros but to foster a community where
          everyone feels seen, heard, and supported. We advocate for body positivity, understanding
          that health and wellness come in all shapes and sizes. It's not about fitting into a
          mold—it's about breaking the mold and embracing your true self.
        </p>
        <p className="about-description">
          Join us in this movement of nourishment, self-acceptance, and unconditional support. Let's
          celebrate each other's journeys and empower one another to live our healthiest, happiest
          lives.
        </p>
        <h5 className="about-signature">With love and positivity,<br />The Founders</h5>
      </div>
      <div className="about-image">
        <img src={inclusiveBody} alt="About Us" className="about-img" />
      </div>
    </div>
  );
};

export default AboutUs;
