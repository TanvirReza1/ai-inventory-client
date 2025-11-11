import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import { AnimatePresence, motion } from "framer-motion";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Animate route transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-grow"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default RootLayout;
