import { FieldError } from 'react-hook-form';

export default function FormInput({
  name,
  register,
  error,
  ...props
}: {
  name: string;
  register?: object;
  error?: FieldError | undefined;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{name}</label>
      <input
        type="text"
        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-slate-500"
        {...register}
        {...props}
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
}
