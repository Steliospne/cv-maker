import InputField from "./input";
import style from "./education.module.css";
import DeleteLogo from "./logo/deleteLogo";

export default function Education({
  data,
  isEditable,
  onChange,
  onAdd,
  onDelete,
}) {
  const existingData = data.length !== 0 && data;

  return (
    <div className={style.education}>
      <h1>Education</h1>
      {isEditable && (
        <button className={style.addEdu} onClick={onAdd} disabled={!isEditable}>
          +
        </button>
      )}
      {existingData &&
        existingData.map((component, i) => (
          <div className={style.eduEntry} key={component.id}>
            <EducationEntry
              data={component}
              isEditable={isEditable}
              onChange={(e) => onChange(e, i)}
            />
            {isEditable && (
              <button
                className={style.deleteEdu}
                id={component.id}
                onClick={onDelete}
                disabled={!isEditable}
              >
                <DeleteLogo id={component.id} className='logo' />
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

function EducationEntry({ data, isEditable, onChange }) {
  const eduFields = Object.keys(data);
  const options = {
    year: "numeric",
    month: "numeric",
  };
  return (
    <>
      {isEditable ? (
        eduFields.map((field, i) => {
          if (field === "id") return;
          return (
            <div key={i}>
              <label htmlFor={field}>
                {field[0].toUpperCase() + field.slice(1) + ": "}
              </label>
              <InputField field={field} data={data} onChange={onChange} />
            </div>
          );
        })
      ) : (
        <>
          <p>{data.degreeTitle.value}</p>
          <p>{data.instituteName.value}</p>
          <div className={style.dateDisplay}>
            <p>
              {data.startPeriod.value &&
                new Date(data.startPeriod.value).toLocaleDateString(
                  undefined,
                  options
                )}
            </p>
            {data.startPeriod.value && <p>-</p>}
            {data.startPeriod.value && !data.endPeriod.value && <p>Present</p>}
            <p>
              {data.endPeriod.value &&
                data.startPeriod.value &&
                new Date(data.endPeriod.value).toLocaleDateString(
                  undefined,
                  options
                )}
            </p>
          </div>
        </>
      )}
    </>
  );
}
