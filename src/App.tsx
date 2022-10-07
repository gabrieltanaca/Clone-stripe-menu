import React from "react";
import Layout from "./components/Layout";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar/index";

function App() {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>
      <GlobalStyles />
    </>
  );
}

export default App;
