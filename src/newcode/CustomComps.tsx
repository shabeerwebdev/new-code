import { Input, InputNumber, Select, DatePicker, TreeSelect } from "antd";
import withFloatingLabel from "../withFloatingLabel";
import { countryMetaData, formatCurrency, formatMobile } from "../utilities";

const TextInput = withFloatingLabel(({ value, onChange, ...props }) => {
  return (
    <Input
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
});

const NumberInput = withFloatingLabel(({ value, onChange, ...props }) => (
  <InputNumber
    style={{ width: "100%" }}
    value={value}
    onChange={onChange}
    {...props}
  />
));

const CurrencyInput = withFloatingLabel(
  ({ isFocused, value, onChange, countryCode, ...props }) => {
    const prefix =
      isFocused || value ? countryMetaData[countryCode].symbol : <span />;

    return (
      <InputNumber
        style={{ width: "100%" }}
        value={value}
        onChange={onChange}
        formatter={(value, info) => formatCurrency(value, info, countryCode)}
        prefix={prefix}
        parser={(value) =>
          value ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : undefined
        }
        {...props}
      />
    );
  }
);

const MobileInput = withFloatingLabel(
  ({ isFocused, value, onChange, countryCode, ...props }) => {
    const prefix = isFocused || value ? `(+${countryCode})` : <span />;

    return (
      <InputNumber
        style={{ width: "100%" }}
        value={value}
        onChange={onChange}
        prefix={prefix}
        formatter={(value, info) => formatMobile(value, info)}
        parser={(value) => (value ?? "").replace(/\D/g, "")}
        maxLength={13}
        {...props}
      />
    );
  }
);

const SelectInput = withFloatingLabel(
  ({ value, onChange, options, ...props }) => (
    <Select
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      options={options}
      {...props}
    />
  )
);

const DateInput = withFloatingLabel(({ value, onChange, ...props }) => (
  <DatePicker
    style={{ width: "100%" }}
    value={value}
    onChange={onChange}
    placeholder=""
    {...props}
  />
));

const TreeSelectInput = withFloatingLabel(
  ({ value, onChange, treeData, ...props }) => (
    <TreeSelect
      value={value}
      onChange={onChange}
      treeData={treeData}
      {...props}
    />
  )
);

export {
  TextInput,
  NumberInput,
  CurrencyInput,
  MobileInput,
  SelectInput,
  DateInput,
  TreeSelectInput,
};
