import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContextApi } from "../Api";
import { QueryClient } from "react-query";

let MovieCard = (props) => {
  let { item } = props;
  let api = useContext(ContextApi);

  // const putMovie = async () => {
  //   await api.put(`/kinolar/${item.id}`, {});
  //   QueryClient.invalidateQueries("movies");
  // };

  return (
    <>
      <NavLink to={`/${item.name}/${item.id}`} className="">
        <div
          class="card_home"
          style={{
            backgroundImage: `url("${item.img}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 160%",
          }}
        >
          <h2 class="card-title pb-3 text-white">{item.name}</h2>

          {/* <span className="like">
            <i class="fa-regular fa-heart"></i>
          </span> */}
        </div>
      </NavLink>
    </>
  );
};

export default MovieCard;
