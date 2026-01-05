type InputFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
  error?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  error,
}: InputFieldProps) {
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      {error && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
