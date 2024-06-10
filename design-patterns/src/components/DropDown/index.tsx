import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";
interface SelectContext {
  activeOption: string;
  setActiveOption: (key: string) => void;
}
/**
 * Compound Component: Select
 *
 * This component provides a custom Select and Option implementation using React context.
 * It allows for dynamic selection handling with a built-in mechanism for setting and
 * retrieving the active option state. The Select component manages the context and state,
 * while the Option component leverages this context to display options and handle clicks.
 *
 * Key Features:
 * - **SelectContext**: Provides the active option and a function to update it.
 * - **Select**: Main component that provides the context and renders a select dropdown.
 * - **Option**: Sub-component that renders individual options and updates the active option.
 * - **useSelectContext**: Custom hook to ensure context usage within Select.
 * - **onOptionChange Callback**: Allows parent components to handle option changes.
 * - **Styling**: Customizable styling through className props.
 *
 *
 **/

const SelectContext = createContext<SelectContext | undefined>(undefined);
interface SelectProps extends PropsWithChildren {
  className?: string;
  onOptionChange?: (key: string) => void;
}

const Select = ({ children, className, onOptionChange }: SelectProps) => {
  const [activeOption, setActiveOption] = React.useState<string>("");

  const handleSetActiveOption = (key: string) => {
    setActiveOption(key);
    if (onOptionChange) onOptionChange(key);
  };

  const selectContextValue = useMemo(
    () => ({ activeOption, setActiveOption: handleSetActiveOption }),
    [activeOption, setActiveOption]
  );

  return (
    <SelectContext.Provider value={selectContextValue}>
      <select
        className={`rounded-md bg-green-700 p-2 hover:cursor-pointer ${className}`}
      >
        {children}
      </select>
    </SelectContext.Provider>
  );
};

interface OptionProps extends PropsWithChildren {
  key: string;
  className?: string;
}

const Option = ({ key, children, className }: OptionProps) => {
  const { activeOption, setActiveOption } = useSelectContext();

  const isActive = key === activeOption;
  const finalClassName = `${className} ${
    isActive ? "bg-gray-500" : "bg-while"
  }`;
  return (
    <option
      key={key}
      onClick={() => setActiveOption(key)}
      className={finalClassName}
    >
      {children}
    </option>
  );
};

Select.Option = Option;

export default Select;

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context)
    throw new Error(
      "useSelectContext should be used within the scope of a Select component"
    );
  return context;
};
