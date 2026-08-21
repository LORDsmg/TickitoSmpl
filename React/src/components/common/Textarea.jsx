function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
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

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-[#333] bg-[#242424] px-4 py-3 text-white outline-none transition focus:border-yellow-400"
      />
    </div>
  );
}

export default Textarea;