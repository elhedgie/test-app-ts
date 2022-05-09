import React from "react";
import Button from "../../../common/Button/Button";
import style from "./editForm.module.css";

function EditForm(props: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  editName: { name: string };
  editNumber: { number: string };
  setEditName: React.Dispatch<
    React.SetStateAction<{
      name: any;
    }>
  >;
  setEditNumber: React.Dispatch<
    React.SetStateAction<{
      number: any;
    }>
  >;
}) {
  const editSubmit = () => {
    props.setVisibility(!props.visibility);
  };
  const closeEditForm = () => {
    props.setVisibility(false);
  };
  return (
    <div
      className={
        props.visibility
          ? `${style.editBlock} + ' ' + ${style.shown}`
          : style.editBlock
      }
    >
      <span onClick={closeEditForm} className={style.closeBtn} />
      <input
        className={style.editInput}
        type="text"
        onChange={(e) => props.setEditName({ name: e.target.value })}
        value={props.editName.name}
      />
      <input
        className={style.editInput}
        type="text"
        onChange={(e) => props.setEditNumber({ number: e.target.value })}
        value={props.editNumber.number}
      />
      <Button onClick={editSubmit} type="button">
        Внести изменения
      </Button>
    </div>
  );
}

export default EditForm;
