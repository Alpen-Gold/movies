import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

let LeyoutAdmin = () => {
  let [activePage, setActivePage] = useState("movies");

  return (
    <>
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">
              <i className="fa-brands fa-slack text-[30px]"></i>
            </div>
          </div>
          <ul className="sidebar-list">
            <li
              className={
                activePage === "movies"
                  ? "sidebar-list-item active"
                  : "sidebar-list-item"
              }
              onClick={() => setActivePage("movies")}
            >
              <NavLink to={"movies"}>
                <i className="fa-solid fa-video me-3"></i>
                <span>Movies</span>
              </NavLink>
            </li>
            <li
              className={
                activePage === "janr"
                  ? "sidebar-list-item active"
                  : "sidebar-list-item"
              }
              onClick={() => setActivePage("janr")}
            >
              <NavLink to={"janr"}>
                <i className="fa-solid fa-film me-3"></i>
                <span>Janr</span>
              </NavLink>
            </li>
          </ul>
          <div className="account-info">
            <div className="account-info-picture">
              <img
                src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx3b21hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="Account"
              />
            </div>
            <div className="account-info-name">Monica G.</div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default LeyoutAdmin;
