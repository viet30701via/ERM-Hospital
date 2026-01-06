type ButtonProps = {
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({
  type = "button",
  children,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled} // ✅ Bắt buộc
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#28a745",
        color: "white",
      }}
    >
      {children}
    </button>
  );
}
