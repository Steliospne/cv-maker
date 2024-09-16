"use client";
import style from "./contact.module.css";
import InputField from "./input";

export default function Contact({ data, isEditable, onChange }) {
  const personalDetailFields = Object.keys(data);

  return (
    <div className={style.contact}>
      <h1>Contact</h1>
      {personalDetailFields.map((field, index) => {
        return (
          <div key={index}>
            <label htmlFor={field}>
              {field[0].toUpperCase() + field.slice(1) + ": "}
            </label>
            {isEditable ? (
              <InputField field={field} data={data} onChange={onChange} />
            ) : (
              <p>{data && data[field].value}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
