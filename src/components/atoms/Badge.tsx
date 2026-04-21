export const Badge = ({ text }: { text: string }) => {
  return (
    <span className="px-2 py-1 rounded-full text-xs bg-gray-200">
      {text}
    </span>
  );
};