import React from "react";
import TestimonialCarousel from "../testimonials/testimonials";
import ServiceFeatures from "../Home/ServiceFeatures";
import StatsCards from "./StatsCards";
import AboutSection from "./AboutSection";

function About() {
  return (
    <>
      <AboutSection />
      <StatsCards />
      <TestimonialCarousel />
      <ServiceFeatures />
    </>
  );
}

export default About;
