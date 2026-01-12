type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: T[];
  className?: string;
};

export default function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps<T>) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        alignItems: "center",
        marginBottom: "10px",
        gap: "10px",
      }}
    >
      <label style={{ fontWeight: "bold" }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      >
        {options.map((op: T) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
