import { useState } from "react";

let Chats = (props) => {
  let [inputItem, setInputItem] = useState("");

  return (
    <div class="chat">
      <div class="chat-header">Comment !</div>
      <div class="chat-window">
        {props.selectedMovie?.chat?.map((item, index) => {
          return (
            <div key={index}>
              <div class="message sent flex items-center gap-3">
                <img
                  className="w-[30px] rounded-[50%] h-[30px]"
                  src="https://avatars.mds.yandex.net/i?id=b2964adf48652e65a9a0c64d7b025576a34b0aaf-9853136-images-thumbs&n=13"
                  alt=""
                />
                <p className="p-0 m-0">
                  <sub></sub>
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div class="input-area">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          class="message-input me-2"
          value={inputItem}
          onChange={(e) => setInputItem(e.target.value)}
        />
        <button
          class="send-button"
          onClick={() => {
            props.putSetMassega(inputItem);
            setInputItem("");
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chats;
