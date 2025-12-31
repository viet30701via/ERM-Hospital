import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div style={overlay}>
      <div style={box}>
        <button style={closeBtn} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const box: React.CSSProperties = {
  background: "rgba(21, 72, 81, 0.5)",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "400px",
  position: "relative",
};

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
};
