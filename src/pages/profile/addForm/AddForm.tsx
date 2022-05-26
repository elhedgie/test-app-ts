import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "../../../reducers";
import style from "./addForm.module.css";
import {addContactAction} from "../../../reducers/Action Creators/action creators"
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input/Input";

function AddForm() {
  const [nameState, setNameState] = useState("");
  const [numberState, setNumberState] = useState("");
  let dispatch:AppDispatch = useDispatch();
  const addContact = () => {
    return () => {
      dispatch(addContactAction({id: uuidv4(), name: nameState, phone: numberState}))
    };
    
  };
  const handleChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value)
  }
  const handleChangeNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNumberState(e.target.value)
  }
  return (
    <div className={style.addContactBlock}>
      <Input
        onChange={handleChangeName}
        placeholder="Введите имя"
        type="text"
        value={nameState}
      />
      <Input
        onChange={(handleChangeNumber)}
        placeholder="Введите номер"
        type="text"
        value={numberState}
      />
      <Button
        type="button"
        onClick={dispatch(addContact)}
      >
        Добавить контакт
      </Button>
    </div>
  );
}

export default AddForm;
