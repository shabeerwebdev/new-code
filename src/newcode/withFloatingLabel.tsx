import React, {
    useState,
    forwardRef,
    FocusEvent,
    ChangeEvent,
  } from "react";
  
  interface WithFloatingLabelProps {
    label: string;
    value: string | number | undefined | null;
    onChange: (value: string | number) => void;
    [key: string]: any;
  }
  
  const withFloatingLabel = <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ) => {
    return forwardRef<HTMLInputElement, WithFloatingLabelProps & P>(
      ({ label, value, onChange, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
  
        const handleFocus = (e: FocusEvent<HTMLElement>) => setIsFocused(true);
        const handleBlur = (e: FocusEvent<HTMLElement>) => setIsFocused(false);
  
        const hasValue =
          value !== undefined &&
          value !== null &&
          value.toString().trim().length > 0;
        const labelClass = isFocused || hasValue ? "label label-float" : "label";
  
        return (
          <div className="float-label">
            <WrappedComponent
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.value)
              }
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={ref}
              {...(props as P)}
            />
            <label className={labelClass}>{label}</label>
          </div>
        );
      }
    );
  };
  
  export default withFloatingLabel;
  