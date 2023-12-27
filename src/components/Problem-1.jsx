import React, {useEffect, useState} from "react";
import {addToArray, getArray} from "../api/problem1";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const status = form.status.value;
    const newObject = {name, status};
    addToArray(newObject);
    form.reset();
    updateData();
  };

  const updateData = () => {
    let storedArray = getArray();
    if (show === "all") {
      storedArray.sort((a, b) => {
        if (a.status === "active" && b.status !== "active") return -1;
        if (b.status === "active" && a.status !== "active") return 1;
        if (a.status === "completed" && b.status !== "completed") return -1;
        if (b.status === "completed" && a.status !== "completed") return 1;
        return 0;
      });
      setData(storedArray);
    }
    if (show === "active") {
      setData(storedArray.filter((obj) => obj.status === "active"));
    }
    if (show === "completed") {
      setData(storedArray.filter((obj) => obj.status === "completed"));
    }
  };

  useEffect(() => {
    updateData();
  }, [show]);

  const statuses = ["active", "completed", "pending", "archived"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  const names = ["John", "Doe", "Jane", "Doe", "Foo", "Bar", "Baz"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                defaultValue={randomName}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
                defaultValue={randomStatus}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((obj, index) => (
                <tr key={index}>
                  <td>{obj.name}</td>
                  <td>{obj.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
