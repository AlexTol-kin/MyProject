import React from "react";

import AppRoutes from "../routes/routes";
import Header from "../headers/header";
import Footer from "../footer/footer";

import { Modal } from "../modal/modal";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <AppRoutes />
      </div>
      <Footer />
      <Modal />
    </div>
  );
};

export default App;
