type LabelProps = {
  children: React.ReactNode;
}

export const Label = ({ children }: LabelProps) => {
  return <label className="block text-sm mb-1">{children}</label>;
};