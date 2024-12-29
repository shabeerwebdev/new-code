import React, { useState, ReactNode, cloneElement } from "react";
import "./styles.css";

interface FloatingLabelProps {
  children: ReactNode;
  label: string;
  value?: any;
}

const FloatingLabel: React.FC<FloatingLabelProps> = ({
  children,
  label,
  value,
}) => {
  const [focus, setFocus] = useState(false);

  const hasValue =
    value !== undefined && value !== null && value.toString().trim().length > 0;
  const labelClass = focus || hasValue ? "label label-float" : "label";

  const childWithProps = cloneElement(children as React.ReactElement, {
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    value,
  });

  return (
    <div className="float-label">
      {childWithProps}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatingLabel;
