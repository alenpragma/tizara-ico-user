import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  error?: FieldError | any;
  [key: string]: any;
}

const FileUploder = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  required,
  type = 'text',
  error,
  ...props
}: InputFieldProps) => {
  const validationRules = {
    ...(required && { required: 'This field is required' }),
    ...(type === 'file' && {
      validate: {
        fileSize: (files: FileList) => {
          if (files?.length === 0) return true;
          return (
            files[0].size <= 1048576 || 'File size should be less than 1 MB'
          );
        },
      },
    }),
  };

  return (
    <div className="w-full">
      <label className="mb-0.5 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...props}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default FileUploder;
