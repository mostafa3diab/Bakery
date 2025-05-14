import React from "react";
import { useNavigate } from "react-router-dom";

function Allorders() {
  const navigate = useNavigate();

  const handlePurchaseComplete = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <h2>Complete Your Purchase</h2>
        <button onClick={handlePurchaseComplete}>Complete Purchase</button>
      </div>
    </>
  );
}

export default Allorders;
