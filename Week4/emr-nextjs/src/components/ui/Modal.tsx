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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] text-gray-400 hover:text-gray-600 p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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
  background: "rgba(26, 127, 145, 0.5)",
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
