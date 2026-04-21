interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full bg-blue-600 text-white py-2 rounded-lg 
      hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
};