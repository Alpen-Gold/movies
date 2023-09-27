import { Input, Modal, Select, Space } from "antd";
import { useContext, useState } from "react";
import { ContextApi } from "../Api";
import { useQueryClient } from "react-query";

let MoviesTable = (props) => {
  let api = useContext(ContextApi);
  let queryClient = useQueryClient();
  let [inputItems, setInputItems] = useState({
    movie_name: null,
    movie_year: null,
    movie_country: null,
    movie_video_link: null,
    movie_foto: null,
    movie_title: null,
    movie_janrs: "Kamedy",
  });
  const [clickItem, setClickItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Option } = Select;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleChangeSelectJanr(selectedItems) {
    setInputItems((prevItems) => ({
      ...prevItems,
      movie_janrs: selectedItems,
    }));
  }

  const changeInputs = (e, name) => {
    if (name === "movie_name")
      setInputItems((prevItem) => ({
        ...prevItem,
        movie_name: e.target.value,
      }));
    if (name === "movie_year")
      setInputItems((prevItem) => ({
        ...prevItem,
        movie_year: e.target.value,
      }));
    if (name === "movie_country")
      setInputItems((prevItem) => ({
        ...prevItem,
        movie_country: e.target.value,
      }));
    if (name === "movie_video_link")
      setInputItems((prevItem) => ({
        ...prevItem,
        movie_video_link: e.target.value,
      }));
    if (name === "movie_foto")
      setInputItems((prevItem) => ({
        ...prevItem,
        movie_foto: e.target.value,
      }));
    if (name === "movie_title")
      setInputItems((prevItem) => ({
        ...prevItem,
        movie_title: e.target.value,
      }));
  };

  const clickBtnEdit = (item) => {
    setInputItems({
      movie_name: item.name,
      movie_year: item.movieyear,
      movie_country: item.country,
      movie_video_link: item.movie,
      movie_foto: item.img,
      movie_title: item.description,
      movie_janrs: String(item.genre),
    });

    setClickItem(item);
  };

  const putMovie = async () => {
    await api.put(`/kinolar/${clickItem.id}`, {
      idJanr: clickItem.idJanr,
      name: inputItems.movie_name,
      placed: clickItem.placed,
      movieyear: inputItems.movie_year,
      duration: "1 soat. 36 min.",
      country: inputItems.movie_country,
      like: clickItem.like,
      messages: clickItem.messages ? clickItem.messages : [],
      genre: inputItems.movie_janrs,
      movie: inputItems.movie_video_link,
      img: inputItems.movie_foto,
      poster: inputItems.movie_foto,
      description: inputItems.movie_title,
    });
    queryClient.invalidateQueries("movies");

    handleCancel();
  };

  return (
    <>
      <div
        className={
          props.handleCard
            ? "products-area-wrapper gridView"
            : "products-area-wrapper tableView"
        }
      >
        <div className="products-header">
          <div className="product-cell image">Kino</div>
          <div className="product-cell category">Janr</div>
          <div className="product-cell status-cell">Jay'lashgan</div>
          <div className="product-cell sales">Davomiyligi</div>
          <div className="product-cell stock">Davlati</div>
          <div className="product-cell price">Like</div>
          <div className="product-cell delete-post">Action</div>
        </div>

        {props.data.data
          .filter((item) =>
            item.name.toLowerCase().includes(props.searchInput.toLowerCase())
          )
          .map((item) => (
            <div className="products-row" key={item.id}>
              <div className="product-cell image">
                <img src={item.img} alt="product" />
                <span>
                  {item?.name?.length > 16
                    ? `${item.name.slice(0, 16)}...`
                    : item.name}
                </span>
              </div>
              <div className="product-cell category">
                <span className="cell-label">Janr:</span>
                {
                  props.dataJanr.data?.find(
                    (itemJanr) => itemJanr.id === item.idJanr
                  ).name
                }
              </div>
              <div className="product-cell status-cell">
                <span className="cell-label">Jay'lashgan:</span>
                <span className="status active">{item.placed}</span>
              </div>
              <div className="product-cell sales">
                <span className="cell-label">Davomiyligi:</span>
                {item.duration}
              </div>
              <div className="product-cell stock">
                <span className="cell-label">Davlat:</span>
                {item.country}
              </div>
              <div className="product-cell price">
                <span className="cell-label">Like:</span>
                {item.like}
              </div>

              <div className="product-cell price">
                <button
                  className="app-content-headerButton bg-red-600 me-3 hover:bg-red-600"
                  onClick={() => props.deleteMovie(item.id)}
                >
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </button>
                <button
                  className="app-content-headerButton"
                  onClick={() => {
                    showModal();
                    clickBtnEdit(item);
                  }}
                >
                  <i className="fa-sharp fa-solid fa-pencil"></i>
                </button>
              </div>
            </div>
          ))}
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
      >
        <Input
          placeholder="Name..."
          className="my-3"
          name="movie_name"
          value={inputItems.movie_name}
          onChange={(e) => changeInputs(e, e.target.name)}
        />

        <Input
          placeholder="Chiqqan yilini kiriting ..."
          className="my-3"
          name="movie_year"
          value={inputItems.movie_year}
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Input
          placeholder="Chiqqan davlatni kiriting ..."
          className="my-3"
          name="movie_country"
          value={inputItems.movie_country}
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Input
          name="movie_video_link"
          value={inputItems.movie_video_link}
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
          value={inputItems.movie_janrs}
          onChange={handleChangeSelectJanr}
          optionLabelProp="label"
        >
          {props.dataJanr.data.map((item, index) => {
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
          value={inputItems.movie_foto}
          className="my-3"
          onChange={(e) => changeInputs(e, e.target.name)}
        />
        <Input
          placeholder="Description kiriting ..."
          className="my-3"
          name="movie_title"
          value={inputItems.movie_title}
          onChange={(e) => changeInputs(e, e.target.name)}
        />

        <div className="flex items-center justify-end">
          <button className="app-content-headerButton" onClick={putMovie}>
            Ozgartirish
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MoviesTable;
