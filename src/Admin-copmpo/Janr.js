import { useContext, useState } from "react";
import { ContextApi } from "../Api";
import { useQuery, useQueryClient } from "react-query";
import { Input, Modal } from "antd";
import JanrTable from "./JanrTable";

let JanrAdmin = () => {
  let api = useContext(ContextApi);
  let queryClient = useQueryClient();
  let [handleCard, setHandleCard] = useState(false);
  let [moonSun, setMoonSun] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addInput, setAddInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    data: dataJanr,
    isLoading: isLodingJanr,
    isError: isErrorJanr,
    error: errorJanr,
  } = useQuery("janrs", async () => await api.get("/janr"));

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

  const deleteMovie = async (movieId) => {
    await api.delete(`/janr/${movieId}`);
    queryClient.invalidateQueries("janrs");
  };

  const postMovie = async () => {
    await api.post(`/janr`, {
      name: addInput,
    });

    queryClient.invalidateQueries("janrs");
    setAddInput("");
    handleOk();
  };
  return (
    <>
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">Janr</h1>
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
            Add Janr
          </button>
        </div>
        <div className="app-content-actions">
          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
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
        <div
          className={
            handleCard
              ? "products-area-wrapper gridView"
              : "products-area-wrapper tableView"
          }
        >
          <div className="products-header">
            <div className="product-cell image">ID</div>
            <div className="product-cell category">Name</div>
            <div className="product-cell delete-post">Action</div>
          </div>

          {dataJanr.data
            .filter((item) =>
              item.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((item, index) => (
              <JanrTable item={item} index={index} deleteMovie={deleteMovie} />
            ))}
        </div>
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Input
          placeholder="Name..."
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
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

export default JanrAdmin;
