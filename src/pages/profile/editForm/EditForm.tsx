import React from "react";
import Button from "../../../common/Button/Button";
import Input from "../../../common/Input/Input";
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

  const handleEditName = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.setEditName({ name: e.target.value })
  }
  const handleEditNumber = (e:React.ChangeEvent<HTMLInputElement>) => {
    props.setEditNumber({ number: e.target.value })
  }

  return (
    <div
      className={
        props.visibility
          ? `${style.editBlock} + ' ' + ${style.shown}`
          : style.editBlock
      }
    >
      <span onClick={closeEditForm} className={style.closeBtn} />
      <Input
        placeholder="Имя"
        type="text"
        onChange={handleEditName}
        value={props.editName.name}
      />
      <Input
        placeholder="Номер"
        type="text"
        onChange={handleEditNumber}
        value={props.editNumber.number}
      />
      <Button onClick={editSubmit} type="button">
        Внести изменения
      </Button>
    </div>
  );
}

export default EditForm;
