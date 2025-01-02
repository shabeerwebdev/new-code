import React, { useState, FocusEvent, forwardRef } from "react";
import { InputRef } from "antd";
import "./inputstyle.css"
interface FloatingInputHOCProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  [key: string]: any;
}

const withFloatingLabel = (WrappedComponent: React.ComponentType<any>) => {
  return forwardRef<InputRef, FloatingInputHOCProps>(
    ({ label, value, onChange, ...props }, ref) => {
      
      const [isFocused, setIsFocused] = useState(false);
      const hasValue = value && value.toString().trim().length > 0;
      const labelClass = isFocused || hasValue ? "myCustomComponent label label-float" : "myCustomComponent label";

      return (
        <div className="myCustomComponent float-label">
          <WrappedComponent
            {...props}
            ref={ref}
            value={value}
            isFocused={isFocused}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <label className={labelClass}>{label}</label>
        </div>
      );
    }
  );
};

export default withFloatingLabel;
