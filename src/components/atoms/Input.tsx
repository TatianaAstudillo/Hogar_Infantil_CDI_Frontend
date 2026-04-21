interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = ({ error, ...props }: InputProps) => {
  return (
    <div>
      <input
        className={`w-full px-4 py-2 border rounded-lg outline-none 
        ${error ? "border-red-500" : "border-gray-300"} 
        focus:ring-2 focus:ring-blue-500`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};