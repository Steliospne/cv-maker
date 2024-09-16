export default function InputField({ field, placeholder, data, onChange }) {
  return data && data[field].type !== "textarea" ? (
    <input
      type={data && data[field].type}
      value={data && data[field].value}
      onChange={onChange}
      name={field}
      id={field}
      placeholder={placeholder}
    />
  ) : (
    <textarea
      name={field}
      value={data && data[field].value}
      id={field}
      onChange={onChange}
      placeholder={placeholder}
      rows='5'
      cols='33'
    ></textarea>
  );
}
