import React from "react";
import "./App.css";
import "./Style/style.css";
import { api, ContextApi } from "./Api";

import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import Leyout from "./components/Leyout";
import Movie from "./components/Movie";
import LeyoutAdmin from "./Admin-copmpo/LeyoutAmin";
import MoviesAdmin from "./Admin-copmpo/Movies";
import JanrAdmin from "./Admin-copmpo/Janr";

let queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextApi.Provider value={api}>
        <Routes>
          <Route path={"/"} element={<Leyout />}></Route>
          <Route path={"/admin"} element={<LeyoutAdmin />}>
            <Route index element={<MoviesAdmin />}></Route>
            <Route path={"movies"} element={<MoviesAdmin />}></Route>
            <Route path={"janr"} element={<JanrAdmin />}></Route>
          </Route>
          <Route path={"/:movie/:id"} element={<Movie />}></Route>
        </Routes>
        <ReactQueryDevtools />
      </ContextApi.Provider>
    </QueryClientProvider>
  );
}

export default App;
