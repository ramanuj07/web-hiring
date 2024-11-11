const Select: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}> = ({ value, onChange, options, className }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`border rounded-md p-2 w-full ${className}`} // Spread className
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Select;
