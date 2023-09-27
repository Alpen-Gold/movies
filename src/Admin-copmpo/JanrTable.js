import { Input, Modal } from "antd";
import { useContext, useState } from "react";
import { ContextApi } from "../Api";
import { useQueryClient } from "react-query";

let JanrTable = (props) => {
  let api = useContext(ContextApi);
  let queryClient = useQueryClient();
  let [inputItem, setInputItem] = useState("");
  const [clickItem, setClickItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const clickBtnEdit = (item) => {
    setInputItem(item.name);
    setClickItem(item);
  };

  const putMovie = async () => {
    await api.put(`/janr/${clickItem.id}`, {
      name: inputItem,
    });

    queryClient.invalidateQueries("janrs");
    setInputItem("");
    handleOk();
  };

  return (
    <>
      <div className="products-row" key={props.item.id}>
        <div className="product-cell status-cell">
          <span className="cell-label">Index:</span>
          {props.index + 1}
        </div>

        <div className="product-cell status-cell">
          <span className="cell-label">Name:</span>
          {props.item.name}
        </div>

        <div className="product-cell price">
          <button
            className="app-content-headerButton bg-red-600 me-3 hover:bg-red-600"
            onClick={() => props.deleteMovie(props.item.id)}
          >
            <i className="fa-sharp fa-solid fa-trash"></i>
          </button>
          <button
            className="app-content-headerButton"
            onClick={() => {
              showModal();
              clickBtnEdit(props.item);
            }}
          >
            <i className="fa-sharp fa-solid fa-pencil"></i>
          </button>
        </div>
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
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
        />

        <div className="flex items-center justify-end mt-3" onClick={putMovie}>
          <button className="app-content-headerButton">Ozgartirish</button>
        </div>
      </Modal>
    </>
  );
};

export default JanrTable;
