import { Fragment, useState } from "react";
import style from "./skills.module.css";

export default function Skills({ data, onAdd, onDelete, isEditable }) {
  const [inputValue, setInputValue] = useState("");

  const existingData = data.length !== 0 && data;

  let toDelete = [];
  function handleCheckedBoxes(e) {
    e.target.checked
      ? toDelete.push(e.target)
      : (toDelete = toDelete.filter((item) => item.id !== e.target.id));
  }

  return (
    <div className={style.skills}>
      <h1>Skills</h1>
      <ul>
        {existingData &&
          existingData.map((skill, i) => (
            <div key={skill.id}>
              <li>{skill.value}</li>
              {isEditable && (
                <input
                  type='checkbox'
                  id={skill.id}
                  onChange={handleCheckedBoxes}
                />
              )}
            </div>
          ))}
      </ul>
      {isEditable && (
        <>
          <input
            type='text'
            value={inputValue}
            maxLength='20'
            placeholder='Type a skill...'
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={style.btnWrapper}>
            <button
              onClick={() => {
                onAdd(inputValue);
                setInputValue("");
              }}
            >
              +
            </button>
            <button onClick={() => onDelete(toDelete)}>-</button>
          </div>
        </>
      )}
    </div>
  );
}
