import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactsOperations, contactsSelectors } from "redux/contacts";
import { Button, TextField } from "@material-ui/core";
import PositionedSnackbar from "../Snackbar";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [alreadyInContacts, setAlreadyInContacts] = useState(false);
  const isButtonDisable = name === "" || number === "";

  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAlreadyInContacts(false);
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "number":
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contacts && contacts.find((contact) => contact.name === name)) {
      setAlreadyInContacts(true);
      return;
    }

    setAlreadyInContacts(false);

    dispatch(contactsOperations.addContact({ name: name, number: number }));

    (async () => {
      await dispatch(
        contactsOperations.DB_postContact({
          name: name,
          number: number,
        })
      );
      await dispatch(contactsOperations.DB_fetchContacts());
    })();

    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <>
      {alreadyInContacts && (
        <PositionedSnackbar message={name + " is already in contacts"} />
      )}
      <form
        className={styles.contactForm}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={styles.name}
          onChange={handleChange}
          name="name"
          type="text"
          value={name}
          size="small"
          label="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          variant="outlined"
        />

        <TextField
          className={styles.number}
          onChange={handleChange}
          name="number"
          type="tel"
          value={number}
          size="small"
          label="Number"
         
          variant="outlined"
        />
        <Button
          className={styles.button}
          disabled={isButtonDisable}
          type="submit"
          size="small"
          variant="contained"
        >
          Add contact
        </Button>
      </form>
    </>
  );
}
