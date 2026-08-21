function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-[#333] bg-[#242424] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
      />
    </div>
  );
}

export default Input;