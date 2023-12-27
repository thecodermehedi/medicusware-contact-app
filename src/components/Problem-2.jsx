import {useState} from "react";
import Modal from "react-modal";
import {useSearchParams} from "react-router-dom";
import {getAllContacts, getUSContacts} from "../api/problem2";

const Problem2 = () => {
  const [modalType, setModalType] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const openModal = async (type) => {
    setModalType(type);
    console.log(type);
    setSearchParams({contacts: type});
    if (type === "all") {
      const data = await getAllContacts();
      setContacts(data);
    }
    if (type === "us") {
      const data = await getUSContacts();
      setContacts(data);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSearchParams({contacts: ""});
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    //TODO: Implement search functionality here
  };

  const handleScroll = (event) => {
    //TODO: Implement infinite scrolling here
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => openModal("all")}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => openModal("us")}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
        <Modal isOpen={modalType !== null} onRequestClose={closeModal}>
          <button
            onClick={() => openModal("all")}
            className={`btn ${
              modalType === searchParams.get("contacts")
                ? "btn-primary"
                : "btn-primary-outline"
            } me-2`}
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => openModal("us")}
            className={`btn ${
              modalType === searchParams.get("contacts")
                ? "btn-secondary"
                : "btn-secondary-outline"
            } me-2`}
          >
            US Contacts
          </button>
          <button onClick={closeModal} className="btn btn-outline-primary">
            Close
          </button>

          <input
            type="checkbox"
            checked={onlyEven}
            onChange={(e) => setOnlyEven(e.target.checked)}
            className="mx-2"
          />
          <label>Only even</label>

          <input type="text" value={search} onChange={handleSearch} />

          <div onScroll={handleScroll}>
            {contacts.map((contact) => (
              <div key={contact.id}>{contact.name}</div>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Problem2;
