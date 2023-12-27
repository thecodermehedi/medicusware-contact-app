import axios from "axios";

export const getAllContacts = async () => {
  const {data} = await axios.get("https://contact.mediusware.com/api/contacts");
  return data.results;
};

export const getUSContacts = async () => {
  const {data} = await axios.get(
    "https://contact.mediusware.com/api/country-contacts/United%20States/"
  );
  return data.results;
};
