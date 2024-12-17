import { FieldError, UseFormRegister } from 'react-hook-form';

interface TextAreaFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;

  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  readonly?: boolean;

  rows?: number;
  error?: FieldError | any;
  [key: string]: any;
}

const TextAreaField = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  required,
  readonly,
  rows = 4,
  error,
  ...props
}: TextAreaFieldProps) => {
  const validationRules = required
    ? { required: 'This field is required' }
    : {};

  return (
    <div className="w-full">
      <label className="mb-0.5 block text-black dark:text-white">{label}</label>
      <textarea
        placeholder={placeholder}
        {...register(name, validationRules)}
        defaultValue={defaultValue}
        readOnly={readonly}
        rows={rows}
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...props}
      />
      {error && <span className="text-red-500">{error?.[name]?.message}</span>}
    </div>
  );
};

export default TextAreaField;
