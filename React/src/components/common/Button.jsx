function Button({
  children,
  onClick,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black font-semibold px-6 py-3 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;