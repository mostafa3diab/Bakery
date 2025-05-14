import React from "react";
import "./OrderProgressBar.css";

const steps = [
  { label: "PLACED" },
  { label: "Checkout" },
  { label: "Shipped" },
];

export default function OrderProgressBar({ currentStep = 1 }) {
  return (
    <div className="order-progress-bar">
      {steps.map((step, idx) => {
        const stepNum = idx + 1;
        let status = "";
        if (currentStep === stepNum) status = "active";
        else if (currentStep > stepNum) status = "completed";

        return (
          <React.Fragment key={step.label}>
            <div className={`step ${status}`}>
              <div className="circle">{stepNum}</div>
              <div className="label">{step.label}</div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`bar ${currentStep > stepNum ? "completed" : ""}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
