import { Carousel } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import MovieCard from "./Movie-card";
import { useContext } from "react";
import { ContextApi } from "../Api";
import Footer from "../components/Footer";
import Navbar from "./Navbar";
import { useState } from "react";

const Movies = () => {
  let api = useContext(ContextApi);

  const { data, isLoading, isError, error } = useQuery(
    "movies",
    async () => await api.get("/kinolar")
  );

  if (isLoading) {
    return <div>Loding...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  return (
    <>
      <Navbar />

      <div className="my_container">
        <div className="flex justify-center items-center flex-wrap gap-[10px] mt-14">
          {data.data.map((item, index) => (
            <div key={index}>
              <MovieCard item={item} key={index} />
            </div>
          ))}
        </div>

        <div className=" mt-28">
          <Carousel autoplay>
            {data.data.map((item, index) => (
              <div key={index}>
                <div className="slider_style">
                  <img src={item.poster} alt="" />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Movies;
