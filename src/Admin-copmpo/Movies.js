import { useContext, useState } from "react";
import { ContextApi } from "../Api";
import { useQuery, useQueryClient } from "react-query";
import { Input, Modal, Select, Space } from "antd";
import MoviesTable from "./MoviesTable";

let MoviesAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [handleCard, setHandleCard] = useState(false);
  let [moonSun, setMoonSun] = useState(false);
  let [movie_name, setMovie_name] = useState(null);
  let [movie_year, setMovie_year] = useState(null);
  let [movie_country, setMovie_country] = useState(null);
  let [movie_video_link, setMovie_video_link] = useState(null);
  let [movie_foto, setMovie_foto] = useState(null);
  let [movie_title, setMovie_title] = useState(null);
  let [movie_janrs, setMovie_janrs] = useState("Kamedy");
  let [searchInput, setSearchInput] = useState("");

  let api = useContext(ContextApi);
  let queryClient = useQueryClient();
  const { Option } = Select;

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
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  if (isLodingJanr) {
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
  if (isErrorJanr) {
    return <div>Error {errorJanr.message}</div>;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cubClick = () => {
    setHandleCard(true);
  };

  const cubList = () => {
    setHandleCard(false);
  };

  let moonAndSun = () => {
    setMoonSun(!moonSun);
    document.documentElement.classList.toggle("light");
  };

  const handleChangeSelectJanr = (value) => {
    setMovie_janrs(value);
  };

  const clearInputsValue = () => {
    setMovie_name(null);
    setMovie_year(null);
    setMovie_country(null);
    setMovie_video_link(null);
    setMovie_foto(null);
    setMovie_title(null);
  };

  const changeInputs = (e, name) => {
    if (name === "movie_name") setMovie_name(e.target.value);
    if (name === "movie_year") setMovie_year(e.target.value);
    if (name === "movie_country") setMovie_country(e.target.value);
    if (name === "movie_video_link") setMovie_video_link(e.target.value);
    if (name === "movie_foto") setMovie_foto(e.target.value);
    if (name === "movie_title") setMovie_title(e.target.value);
  };

  const timeYear = () => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const today = new Date().toLocaleDateString("en-US", options);

    return today;
  };

  const deleteMovie = async (movieId) => {
    await api.delete(`/kinolar/${movieId}`);
    queryClient.invalidateQueries("movies");
  };
  const postMovie = async () => {
    let type = typeof movie_janrs;
    await api.post(`/kinolar`, {
      idJanr: dataJanr.data.find(
        (item) =>
          item.name === (type === "string" ? movie_janrs : movie_janrs[0])
      ).id,
      name: movie_name,
      placed: timeYear(),
      movieyear: movie_year,
      duration: "1 soat. 36 min.",
      country: movie_country,
      like: 0,
      chat: [],
      genre: movie_janrs.join(", "),
      movie: movie_video_link,
      img: movie_foto,
      poster: movie_foto,
      description: movie_title,
    });
    queryClient.invalidateQueries("movies");

    clearInputsValue();
    handleCancel();
  };
  return (
    <>
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">Movies</h1>
          <button
            className={
              moonSun
                ? "mode-switch text-[20px] px-2 active py-2"
                : "mode-switch text-[20px] px-2 py-2"
            }
            title="Switch Theme"
            onClick={moonAndSun}
          >
            <i className="fa-solid fa-moon"></i>
          </button>
          <button className="app-content-headerButton" onClick={showModal}>
            Add Movie
          </button>
        </div>
        <div className="app-content-actions">
          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="app-content-actions-wrapper">
            <button
              className={
                handleCard
                  ? "action-button list  px-2"
                  : "action-button list active px-2"
              }
              onClick={cubList}
              title="List View"
            >
              <i className="fa-solid fa-list-ul"></i>
            </button>
            <button
              className={
                handleCard
                  ? "action-button grid active px-2"
                  : "action-button grid px-2"
              }
              onClick={cubClick}
              title="Grid View"
            >
              <i className="fa-solid fa-table"></i>
            </button>
          </div>
        </div>

        {/* table Movies */}
        <MoviesTable
          searchInput={searchInput}
          data={data}
          deleteMovie={deleteMovie}
          dataJanr={dataJanr}
          handleCard={handleCard}
        />
      </div>

      <Modal
        title="Add Movie +"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Input
          placeholder="Name..."
          className="my-3"
          name="movie_name"
          value={movie_name}
          onChange={(e) => changeInputs(e, e.target.name)}
        />

        <Input
          placeholder="Chiqqan yilini kiriting ..."
          className="my-3"
          name="movie_year"
          value={movie_year}
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Input
          placeholder="Chiqqan davlatni kiriting ..."
          className="my-3"
          name="movie_country"
          value={movie_country}
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Input
          name="movie_video_link"
          value={movie_video_link}
          placeholder="Kinoni  vidiosini url tashlang ..."
          className="my-3"
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="select one country"
          defaultValue={[dataJanr.data[0].name]}
          onChange={handleChangeSelectJanr}
          optionLabelProp="label"
        >
          {dataJanr.data.map((item, index) => {
            return (
              <Option value={item.name} label={item.name} key={index}>
                <Space>
                  <span role="img" aria-label={item.name}>
                    {item.name}
                  </span>
                </Space>
              </Option>
            );
          })}
        </Select>
        <Input
          placeholder="Suratini link ni tashlang ..."
          name="movie_foto"
          value={movie_foto}
          className="my-3"
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Input
          placeholder="Description kiriting ..."
          className="my-3"
          name="movie_title"
          value={movie_title}
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <div className="flex items-center justify-end w-[100%] mt-5">
          <button className="app-content-headerButton" onClick={postMovie}>
            + Koshish
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MoviesAdmin;
