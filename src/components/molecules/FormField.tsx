import { Input } from "../atoms/Input";
import { Label } from "../atoms/label";

type Props ={
  label: string;
  type?: string;
  register: any;
  name: string;
  error?: string;
}

export const FormField = ({
  label,
  type = "text",
  register,
  name,
  error,
}: Props) => {
  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <Input type={type} {...register(name)} error={error} />
    </div>
  );
};