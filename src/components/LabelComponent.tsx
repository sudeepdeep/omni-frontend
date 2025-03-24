import React from "react";

interface LabelComponentProps {
  children: React.ReactNode; // To accept any valid JSX elements
  label?: string; // Optional label prop
  style?: string;
}

const LabelComponent: React.FC<LabelComponentProps> = ({
  children,
  label = "",
  style = "",
}) => {
  return (
    <div className={`${style} text-white`}>
      {label && (
        <label
          htmlFor="about" // Consider making this dynamic based on props if necessary
          className="block text-sm font-medium leading-6 "
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export const LabelComponent2: React.FC<LabelComponentProps> = ({
  children,
  label = "",
  style = "",
}) => {
  return (
    <div className={`${style} text-black`}>
      {label && (
        <label
          htmlFor="about" // Consider making this dynamic based on props if necessary
          className="block text-sm font-medium leading-6 "
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};

export default LabelComponent;
