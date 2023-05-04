import "./user.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";

const Users = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQueryByUsername, setSearchQueryByUsername] = useState("");
  const [seeMore, setSeeMore] = useState(3);

  useEffect(() => {
    const searchObject = { username: searchQueryByUsername };
    if (searchQueryByUsername?.length > 0) {
      console.log("here");
      axios
        .post("/api/auth/searchUserByUsername", searchObject)
        .then((res) => {
          setAllUsers(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios.get("/api/auth/getAllUsers").then((res) => {
        setAllUsers(res.data);
      });
    }
  }, [searchQueryByUsername]);
  const handleSeeMore = () => {
    setSeeMore((prevState) => prevState + 5);
  };

  const makeTechnical = (id) => {
    axios
      .post("/api/auth/maketechnical", { userId: id })
      .then((res) => {
        notify("user become technical", toast, "info");
      })
      .catch((err) => console.log(err));
  };

  const makeManager = (id) => {
    console.log(id);
    axios
      .post("/api/auth/makemanager", { userId: id })
      .then((res) => {
        notify("user become manager", toast, "info");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ToastContainer />

      <main className="main-content-wrapper">
        <div className="container">
          <div className="row mb-8">
            <div className="col-md-12">
              <div className="d-md-flex justify-content-between align-items-center">
                <div>
                  <h2>Customers</h2>
                  {/* breacrumb */}
                  <nav aria-label="breadcrumb"></nav>
                </div>
                {/*   <div>
                  <a href='#!' className='btn btn-primary'>
                    Add New Customer
                  </a>
                </div>
                */}
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-xl-12 col-12 mb-5">
              <div className="card h-100 card-lg">
                <div className="p-6">
                  <div className="row justify-content-between">
                    <div className="col-md-4 col-12">
                      <form className="d-flex" role="search">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Customers"
                          aria-label="Search"
                          value={searchQueryByUsername}
                          onChange={(e) =>
                            setSearchQueryByUsername(e.target.value)
                          }
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0 ">
                  <div className="table-responsive">
                    <table className="table table-centered table-hover table-borderless mb-0 table-with-checkbox text-nowrap">
                      <thead className="bg-light">
                        <tr>
                          <th className="column ">Full Name</th>
                          <th className="column disposable">Email</th>
                          <th className="column disposable disposable2">Verified</th>
                          <th className="column disposable disposable2">Phone</th>
                          <th className="column ">Change role(default User)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers?.slice(0, seeMore).map((user, index) => {
                          return (
                            <tr key={index}>
                              <td className="column">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={`http://localhost:5001/uploads/${user?.image}`}
                                    alt=""
                                    className="avatar avatar-xs rounded-circle"
                                  />
                                  <div className="ms-2">
                                    <a href="#" className="text-inherit">
                                      {user.username}
                                    </a>
                                  </div>
                                </div>
                              </td>
                              <td className="column disposable">{user.email}</td>
                              <td className="column disposable disposable2">
                                {user?.verified ? "Verified" : "Not Verified"}
                              </td>
                              <td className="column disposable disposable2">{user.phoneNumber}</td>
                              <td className="column justify-content-center"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    lineHeight: "3.1rem",
                                  }}
                                >
                                  <div className="dropdown eye-field2">
                                    <a
                                      href="#"
                                      className="text-reset"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="feather-icon icon-eye fs-5" />
                                    </a>
                                    <ul className="dropdown-menu dropdownForcedAttributes" >
                                      <li className="line eye-field">
                                        <a className="dropdown-item">
                                          <span className="">Full Name :</span>#
                                          {user.username}
                                        </a>
                                      </li>
                                      <li className="line eye-field ">
                                        <a className="dropdown-item">
                                          <span className="">Email :</span>
                                          {user.email}
                                        </a>
                                      </li>
                                      <li className="line eye-field eye-field2">
                                        <a
                                          className="dropdown-item"
                                        >
                                          <span className="">Verified :</span>
                                          {user?.verified ? "Verified" : "Not Verified"}
                                        </a>
                                      </li>
                                      <li className="line eye-field eye-field2">
                                        <a className="dropdown-item">
                                          <span className="">Phone :</span>
                                          {user.phoneNumber}
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                <div className="dropdown">
                                  <a
                                    href="#"
                                    className="text-reset"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="feather-icon icon-more-vertical fs-5" />
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <span
                                        className="dropdown-item"
                                        onClick={() => makeTechnical(user._id)}
                                      >
                                        Technical
                                      </span>
                                    </li>
                                    <li>
                                      <span
                                        className="dropdown-item"
                                        onClick={() => makeManager(user._id)}
                                      >
                                        Manager
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="border-top d-md-flex justify-content-between align-items-center p-6">
                    <span>Users: {allUsers.length}</span>
                    {allUsers.length > seeMore && (
                      <nav className="mt-2 mt-md-0">
                        <ul className="pagination mb-0 ">
                          <li className="page-item">
                            <span className="page-link" onClick={handleSeeMore}>
                              More
                            </span>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Users;
