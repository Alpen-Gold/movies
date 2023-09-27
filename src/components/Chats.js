import { useState } from "react";

let Chats = (props) => {
  let [inputItem, setInputItem] = useState("");

  return (
    <div class="chat">
      <div class="chat-header">Chats !</div>
      <div class="chat-window">
        {props.selectedMovie?.chat.map((item, index) => {
          return (
            <div key={index}>
              {item?.type === "me" ? (
                <div class="message received">{item.message}</div>
              ) : (
                <div class="message sent">{item.message}</div>
              )}
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
