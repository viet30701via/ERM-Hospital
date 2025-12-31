type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
};

export default function SelectField({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) {
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
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      >
        {options.map((op: string) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
