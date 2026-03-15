import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Product from "./Components/Products/Products";
import AboutUs from "./Components/AboutUs/AboutUs";
import Services from "./Components/Services/services";
import WrittenTestimonials from "./Components/Testimonials/Testimonials";
import FAQs from "./Components/FAQ/FAQ";
import Footer from "./Components/ContactUs/ContactUs";
import Gallary from "./Components/Gallary/Gallary";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                     element={<Hero />} />
        <Route path="/aboutus"              element={<AboutUs />} />
        <Route path="/products"             element={<Product />} />
        <Route path="/services"             element={<Services />} />
        <Route path="/gallery"              element={<Gallary />} />
        <Route path="/written-testimonials" element={<WrittenTestimonials />} />
        <Route path="/faq"                  element={<FAQs />} />
        <Route path="/contact"              element={<Footer />} />
      </Routes>
    </>
  );
};

export default App;