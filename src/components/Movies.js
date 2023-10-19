import { Carousel, Select } from "antd";
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
  let [searchItem, setSearchItem] = useState("");
  let [selectItem, setSelectItem] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    "movies",
    async () => await api.get("/kinolar")
  );

  const {
    data: dataJanr,
    isLoading: isLodingJanr,
    isError: isErrorJanr,
    error: errorJanr,
  } = useQuery("janrs", async () => await api.get("/janr"));

  if (isLoading || isErrorJanr) {
    return (
      <div id="loading-container">
        <div class="loader-div">
          <div class="loader-div">
            <div class="loader-div">
              <div class="loader-div">
                <div class="loader-div">
                  <div class="loader-div">
                    <div class="loader-div"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isError || isErrorJanr) {
    return <div>Error {error.message}</div>;
  }

  const handleChange = (value) => {
    if (value === "all") {
      setSearchItem("");
      return setSelectItem("");
    }
    setSelectItem(dataJanr.data.find((item) => item.name === value).id);
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="my_container">
        <div>
          <ul className="flex items-center justify-between list-[none] p-0 m-0 ">
            <li
              className="min-w-[150px] text-center px-3 py-2 text-white cursor-pointer"
              style={{ borderBottom: "2px solid #2869ff" }}
              onClick={() => handleChange("all")}
            >
              <p className="p-0 m-0">All</p>
            </li>
            {dataJanr?.data.map((item, index) => {
              return (
                <li
                  key={index}
                  className="min-w-[150px] text-center px-3 py-2 text-white cursor-pointer"
                  style={{ borderBottom: "2px solid #2869ff" }}
                  onClick={() => handleChange(item.name)}
                >
                  <p className="p-0 m-0">{item.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-center mt-10 ">
          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
            onChange={(e) => {
              setSearchItem(e.target.value);
              setSelectItem("");
            }}
          />
        </div>

        <div className="flex justify-center items-center flex-wrap gap-[10px] mt-14">
          {searchItem !== ""
            ? data?.data
                .filter((item) =>
                  item.name.toLowerCase().includes(searchItem.toLowerCase())
                )
                .map((item, index) => (
                  <div key={index}>
                    <MovieCard item={item} key={index} />
                  </div>
                ))
            : selectItem !== ""
            ? data?.data
                .filter((item) => item.idJanr === selectItem)
                .map((item, index) => (
                  <div key={index}>
                    <MovieCard item={item} key={index} />
                  </div>
                ))
            : data?.data
                .filter((item) =>
                  item.name.toLowerCase().includes(searchItem.toLowerCase())
                )
                .map((item, index) => (
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
