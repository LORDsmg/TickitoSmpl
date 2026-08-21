function Container({ children, className = "" }) {
  return (
    <div
      className={`w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-10 ${className}`}
      style={{ maxWidth: "1600px" }}
    >
      {children}
    </div>
  );
}

export default Container;