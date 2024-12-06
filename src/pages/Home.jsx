import React from "react";
import { Hero, Nav } from "../components/index";
import { SearchProvider } from "../store/searchSlice";
function Home() {
  return (
    <SearchProvider>
      <div className="bg-background">
        <Nav />
        <Hero />
      </div>
    </SearchProvider>
  );
}

export default Home;
