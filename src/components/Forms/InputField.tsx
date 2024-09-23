import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;

  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  readonly?: boolean;

  type?: string;
  error?: FieldError | any;
  [key: string]: any;
}

const InputField = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  required,
  readonly,
  error,
  type = 'text',
  ...props
}: InputFieldProps) => {
  const validationRules = required
    ? { required: 'This field is required' }
    : {};

  return (
    <div className="w-full">
      <label className="mb-0.5 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        defaultValue={defaultValue}
        readOnly={readonly}
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...props}
      />
      {error && <span className="text-red-500">{error?.[name]?.message}</span>}
    </div>
  );
};

export default InputField;
