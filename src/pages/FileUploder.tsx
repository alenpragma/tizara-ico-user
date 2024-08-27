import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';

interface InputFieldProps {
  type: string;
  placeholder?: string;
  label: string;
  name: string;
  control: Control<FieldValues>;
  rules?: Record<string, any>;
}

const FileUploder: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  label,
  name,
  control,
  rules,
}) => {
  return (
    <div>
      {/* <label htmlFor={name}>{label}</label> */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                if (
                  e.target.files?.[0] &&
                  e.target.files[0].size > 1024 * 1024
                ) {
                  alert('File size should be less than 1 MB');
                } else {
                  field.onChange(e);
                }
              }}
            />
            {fieldState?.error && <span>{fieldState.error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default FileUploder;
