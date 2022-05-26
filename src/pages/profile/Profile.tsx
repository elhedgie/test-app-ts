import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/addDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IContact } from "../../reducers/contactsReducer";
import AddForm from "./addForm/AddForm";
import fetchContacts from "../fetchContacts";
import Item from "./item/Item";
import style from "./profile.module.css";
import Input from "../../common/Input/Input";

export default function Profile() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState<IContact[]>([]);
  const dispatch = useAppDispatch();
  let log = useTypedSelector((state) => state.login.isLogged);
  let res = localStorage.getItem("loggedIn");
  let auth = res !== null ? JSON.parse(res) : log;
  let list = useTypedSelector((state) => state.contacts.contacts);
  let loading = useTypedSelector((state) => state.contacts.loading);

  useEffect(() => dispatch(fetchContacts), []);
  useEffect(() => {
    let result = list.filter(
      (elem) =>
        elem.name.includes(searchValue) || elem.phone.includes(searchValue)
    );
    setFilteredList(result);
  }, [searchValue, list, loading]);

  const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return auth ? (
    <div className={style.container}>
      <nav className={style.nav}>
        <Link
          onClick={() => {
            dispatch({ type: "AUTH_LOGOUT" });
          }}
          className={style.link}
          to={"/"}
        >
          Выход
        </Link>
        <Link className={style.link} to={"/profile"}>
          Профиль
        </Link>
      </nav>
      {loading ? (
        <h1 className={style.headingOne}>Loading...</h1>
      ) : (
        <div className={style.mainBlock}>
          <h1 className={style.headingOne}>Контакты</h1>
          <div className={style.contactBlock}>
            <Input
              onChange={(e) => searchFunc(e)}
              placeholder="Поиск по контактам"
              type="text"
              value={searchValue}
            />
            <AddForm></AddForm>
            <ul className={style.itemList}>
              {filteredList
                ? filteredList.map((item) => <Item key={item.id} item={item} />)
                : list.map((item) => <Item key={item.id} item={item} />)}
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
}
