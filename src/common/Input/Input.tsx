import style from "./input.module.css";

function Input(props:{id?: string, value: string, type: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void}) {
    return (
        <input
        id={props.id} 
        onChange={props.onChange}
        className={style.input}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
      />
    );
}

export default Input;