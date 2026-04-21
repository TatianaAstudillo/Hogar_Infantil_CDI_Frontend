export const PriorityDot = ({ level }: { level: string }) => {
  const colors: any = {
    alta: "bg-red-500",
    media: "bg-yellow-400",
    baja: "bg-green-500",
  };

  return (
    <div className={`w-4 h-4 rounded-full ${colors[level]}`} />
  );
};