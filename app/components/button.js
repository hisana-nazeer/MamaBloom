// components/Button.jsx
export default function Button({ children, onClick, variant = 'primary', className }) {
  const base = "rounded-lg px-4 py-2 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary: "bg-pink-400 text-white hover:bg-pink-500 focus:ring-pink-300",
    secondary: "bg-purple-300 text-white hover:bg-purple-400 focus:ring-purple-300",
    danger: "bg-red-400 text-white hover:bg-red-500 focus:ring-red-300",
    light: "bg-white border border-pink-300 text-pink-500 hover:bg-pink-100 focus:ring-pink-200",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
}
