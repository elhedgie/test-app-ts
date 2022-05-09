import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/addDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EditForm from "../editForm/EditForm";
import style from "./item.module.css";
import Button from "../../../common/Button/Button";
import { deleteContactAction } from "../../../reducers/Action Creators/action creators";

function Item(props: { item: { name: string; phone: string; id: string } }) {
  const [visibility, setVisibility] = useState(false);
  const [editName, setEditName] = useState({ name: props.item.name });
  let res = useTypedSelector((state) => state.contacts.contacts);
  const [editNumber, setEditNumber] = useState({ number: props.item.phone });
  let dispatch = useAppDispatch();
  const editContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVisibility(!visibility);
  };
  const deleteContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return () => {
      dispatch(
        deleteContactAction(res.filter((item) => item.id !== props.item.id))
      );
    };
  };
  return (
    <li>
      <EditForm
        editNumber={editNumber}
        setEditNumber={setEditNumber}
        editName={editName}
        setEditName={setEditName}
        setVisibility={setVisibility}
        visibility={visibility}
      ></EditForm>
      <div className={style.itemBlock}>
        <div className={style.infoBlock}>
          <h2>
            {props.item.name === editName.name
              ? props.item.name
              : editName.name}
          </h2>
          <span>
            {props.item.phone === editNumber.number
              ? props.item.phone
              : editNumber.number}
          </span>
        </div>
        <div className={style.buttonBlock}>
          <Button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => editContact(e)}
          >
            Редактировать
          </Button>
          <Button
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              dispatch(deleteContact(e))
            }
          >
            Удалить
          </Button>
        </div>
      </div>
    </li>
  );
}

export default Item;
