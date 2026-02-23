import Select, { SingleValue } from "react-select";

interface OptionType {
  value: string | null;
  label: string;
  _id: string | null;
}

interface SelectInputProps {
  options: OptionType[];
  onChange: (option: SingleValue<OptionType>) => void;
  value: OptionType;
}

const SelectInput = ({ options, onChange, value }: SelectInputProps) => {
  return (
    <Select<OptionType>
      options={options}
      components={{ IndicatorSeparator: () => null }} // Прибирає вертикальну лінію біля стрілочки
      isSearchable={false} // Вимикає поле вводу (можна тільки вибирати)
      defaultValue={options[0]}
      value={value}
      onChange={(option: SingleValue<OptionType>) => {
        onChange(option);
      }}
      // Детальне налаштування стилів елементів селекта (щоб вони відповідали вашому дизайну)
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "var(--background)",
          border: state.isFocused
            ? "1px solid var(--accent)"
            : "1px solid var(--border)",
          boxShadow: "none",
          borderRadius: "8px",
          padding: "4px 8px",
          minHeight: "44px",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            borderColor: "var(--accent)",
          },
        }),

        valueContainer: (base) => ({
          ...base,
          padding: 0,
          color: "var(--text)",
          fontSize: "16px",
          fontWeight: 500,
        }),

        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
          color: "var(--text)",
        }),

        singleValue: (base) => ({
          ...base,
          color: "var(--text)",
          fontWeight: 400,
          fontSize: "18px",
        }),

        placeholder: (base) => ({
          ...base,
          color: "var(--input-text)",
          fontWeight: 400,
          fontSize: "18px",
        }),

        dropdownIndicator: (base, state) => ({
          ...base,
          padding: "0 4px",
          color: state.isFocused ? "var(--accent)" : "var(--input-text)",
          transition: "transform 0.3s ease, color 0.3s ease",
          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
        }),

        indicatorsContainer: (base) => ({
          ...base,
          padding: 0,
        }),

        menu: (base) => ({
          ...base,
          backgroundColor: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          marginTop: "4px",
          boxShadow: "0 4px 10px var(--opacity-neutral-darkest-10)",
          overflow: "hidden",
        }),

        menuList: (base) => ({
          ...base,
          padding: "4px",
        }),

        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "var(--accent)"
            : state.isFocused
              ? "var(--opacity-neutral-darkest-5)"
              : "transparent",
          color: state.isSelected ? "var(--color-white)" : "var(--text)",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }),
      }}
    />
  );
};

export default SelectInput;
