function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = "",
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-[#333] bg-[#242424] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
      >
        <option value="">Select</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;