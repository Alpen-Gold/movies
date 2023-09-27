import { NavLink } from "react-router-dom";

let MovieCard = (props) => {
  let { item } = props;

  return (
    <>
      <div
        class="card_home"
        style={{
          backgroundImage: `url("${item.img}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 160%",
        }}
      >
        <h2 class="card-title pb-3 text-white">{item.name}</h2>
        <div class="overlay">
          <div class="overlay-text">
            <h2>{item.movieyear} yil</h2>
            <h2>{item.country}</h2>
            <p>{item.name}</p>
            <br />
            <NavLink to={`/${item.name}/${item.id}`} className="">
              <button>Korish</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
