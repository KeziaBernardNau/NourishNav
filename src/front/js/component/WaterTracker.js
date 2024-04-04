import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassWater } from '@fortawesome/free-solid-svg-icons';


export function WaterTracker() {
  const [waterIntake, setWaterIntake] = useState(0);

  const logWaterIntake = () => {
    const newWaterIntake = waterIntake + 8; // Increment by 8oz
    setWaterIntake(newWaterIntake);
    // Here you can send a request to your backend to update the user's data
    // Example: fetch('/api/logWaterIntake', { method: 'POST', body: JSON.stringify({ waterIntake: newWaterIntake }) });
  };

  return (
    <div className="water-tracker" style={{ textAlign: 'center' }}>
      <h2>Daily Water Intake Tracker</h2>
      <h5 style={{ color: 'green' }}>Today's Water Intake: <FontAwesomeIcon icon={faGlassWater} /> {waterIntake} oz</h5>
      <Button variant="success" onClick={logWaterIntake}>Log 8oz of Water</Button>
      {/* Add feedback message here */}
    </div>
  );
}

export default WaterTracker;