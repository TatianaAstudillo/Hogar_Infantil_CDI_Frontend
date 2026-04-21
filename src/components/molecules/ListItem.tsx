interface Props {
  title: string;
  subtitle: string;
}

export const ListItem = ({ title, subtitle }: Props) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg">
      <p className="font-medium">{title}</p>
      <span className="text-sm text-gray-500">{subtitle}</span>
    </div>
  );
};