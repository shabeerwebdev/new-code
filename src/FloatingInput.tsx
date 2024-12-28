import React, { useState, forwardRef, ReactNode, FocusEvent } from "react";
import {
  Input,
  InputRef,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
} from "antd";
import "./styles.css";
import { formatCurrency, formatMobile, countryMetaData } from "./utilities";

interface FloatingInputProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  type?:
    | "text"
    | "number"
    | "select"
    | "date"
    | "treeSelect"
    | "currency"
    | "mobile";
  options?: { label: string; value: any }[];
  treeData?: any[];
  countryCode?: string;
  [key: string]: any;
}

const FloatingInput = forwardRef<InputRef, FloatingInputProps>(
  (
    {
      label,
      value,
      onChange,
      type = "text",
      options = [],
      treeData = [],
      countryCode = "971",
      ...props
    },
    ref
  ) => {
    console.log(value, onchange, "dick");
    
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = (e: FocusEvent<HTMLElement>) => setIsFocused(true);
    const handleBlur = (e: FocusEvent<HTMLElement>) => setIsFocused(false);

    const hasValue =
      value !== undefined &&
      value !== null &&
      value.toString().trim().length > 0;
    const labelClass = isFocused || hasValue ? "label label-float" : "label";

    const renderInput = () => {
      switch (type) {
        case "currency":
          return (
            <InputNumber
              style={{ width: "100%" }}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              prefix={
                isFocused || (value !== 0 && value?.length > 0)
                  ? countryMetaData[countryCode || "1"].symbol
                  : ""
              }
              {...props}
              formatter={(value, info) => formatCurrency(value, info, countryCode)}
              parser={(value) =>
                value ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : 0
              }
            />
          );
        case "mobile":
          return (
            <InputNumber
              ref={ref as React.Ref<HTMLInputElement>}
              style={{ width: "100%" }}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              prefix={
                isFocused || (value && value.toString().length > 0)
                  ? `(+${countryCode})`
                  : ""
              }
              onBlur={handleBlur}
              formatter={(value, info) => formatMobile(value, info)}
              parser={(value) => (value ?? "").replace(/\D/g, "")}
              maxLength={13}
            />
          );
        case "number":
          return <InputNumber value={value} onChange={onChange} {...props} />;
        case "select":
          return (
            <Select
              value={value}
              onChange={onChange}
              options={options}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
          );
        case "date":
          return (
            <DatePicker
              style={{ width: "100%" }}
              placeholder=""
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
          );
        case "treeSelect":
          return (
            <TreeSelect
              value={value}
              onChange={onChange}
              treeData={treeData}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
          );
        default:
          return (
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
              ref={ref}
            />
          );
      }
    };

    return (
      <div className="float-label">
        {renderInput()}
        <label className={labelClass}>{label}</label>
      </div>
    );
  }
);

export default FloatingInput;
