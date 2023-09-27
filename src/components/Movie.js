import { useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import { ContextApi } from "../Api";
import Chats from "./Chats";

let Movie = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const api = useContext(ContextApi);
  let { id } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    "movies",
    async () => await api.get("/kinolar")
  );

  let queryClient = useQueryClient();

  useEffect(() => {
    const movie = data?.data.find((item) => item.id === +id);

    setSelectedMovie(movie);
  }, [data, id, isLoading]);

  if (isLoading) {
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

  const putSetMassega = async (title) => {
    if (!selectedMovie) return;

    const updatedMovie = {
      ...selectedMovie,
      chat: [
        {
          name: "Йокуб",
          type: "me",
          message: String(title),
          time: "2023-09-20 20-06",
        },
        ...selectedMovie.chat,
      ],
    };

    setSelectedMovie(updatedMovie);

    await api.put(`/kinolar/${selectedMovie.id}`, updatedMovie);

    queryClient.invalidateQueries("movies");
  };

  return (
    <>
      <div className="flex items-center justify-between w-[100%] ">
        <div className="max-h-[100vh] overflow-y-auto w-[75%] ">
          <div
            className="top-card flex items-center justify-between px-10 gap-16 py-7"
            style={{ backgroundColor: "#08142c" }}
          >
            <div>
              <h1 className="top-movie-name m-0">{selectedMovie?.name}</h1>

              <h3 className="movie-year m-0">{selectedMovie?.movieyear}</h3>
              <h3 className="movie-duration">{selectedMovie?.duration}</h3>
              <h3 className="movie-duration">
                <span>Janr: </span>
                {selectedMovie?.genre}
              </h3>
            </div>

            <div className="min-w-[600px]">
              <img
                className="min-w-[100%] max-h-[400px] object-contain rounded-[20px]"
                style={{ boxShadow: "0 0 20px 0 #ffffff5c" }}
                src={selectedMovie?.poster}
                alt=""
              />
            </div>
          </div>

          <div className="card-video px-10 mt-10">
            <video style={{ height: "500px", width: "100%" }} controls>
              <source
                src={data.data.find((item) => item.id === +id).movie}
                type="video/mp4"
              />
              <source src="movie.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className=" text-center">
            <h3 className="movie-duration my-10">
              Koshimcha <span>Kinolar !</span>
            </h3>
          </div>

          <div className="flex px-10 mt-10 justify-center gap-7 mb-20 flex-wrap">
            {data.data
              .filter((item) => item.id !== +id)
              .map((item, index) => (
                <div class="line_card_recoment" key={item.id}>
                  <div
                    class="front"
                    style={{
                      backgroundImage: `url("${item.img}")`,
                    }}
                  >
                    <h1 class="text-shadow">{item.name}</h1>
                  </div>
                  <div class="back">
                    <div className="  w-[100%] text-center">
                      <h2>{item.name}</h2>
                      <p>{item.genre}</p>
                      <p>{item.duration}</p>
                      <NavLink to={`/${item.name}/${item.id}`}>
                        <button className="offset mt-5">Korish</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          className="w-[25%]"
          style={{
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Chats selectedMovie={selectedMovie} putSetMassega={putSetMassega} />
        </div>
      </div>
    </>
  );
};

export default Movie;
