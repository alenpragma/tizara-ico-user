import { useContext, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import MyContext from '../hooks/MyContext';

export type IOptions = {
  label: string;
  value: string;
};
type selectType = {
  name: string;
  control: any;
  label: string;
  defaultValue?: number | string; // ✅ optional now
  placeholder: string;
  options: IOptions | any;
  onChange?: (value: any) => void; // Optional onChange prop
  required?: boolean; // <-- new
};

const SelectOptions = ({
  name,
  control,
  label,
  options,
  defaultValue,
  placeholder = 'Select...',
  onChange,
  required = false, // <-- new
}: selectType) => {
  const { theme } = useContext(MyContext);

  let currentColor: string;
  useEffect(() => {
    currentColor = theme == 'dark' ? '#fff' : '#000';
  }, []);

  const customStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#3cb7ed' : '#3d4d60',
      borderRadius: '4px',
      height: 'full',
      padding: '5px',
      backgroundColor: 'transparent',
      color: currentColor,
    }),
    option: (provided: any, state: any) => ({
      ...provided,

      backgroundColor: state.isSelected ? '#3cb7ed' : 'white',
      color: state.isSelected ? '#3d4d60' : 'black',
      '&:hover': {
        backgroundColor: '#2E3A47',
        color: 'white',
      },
    }),
  };
  return (
    <div>
      <label className="mt-2 mb-1 block   dark:text-white">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={
          typeof defaultValue !== 'undefined' ? options[defaultValue] : null
        }
        rules={required ? { required: 'This field is required' } : {}}
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
            options={options}
            placeholder={placeholder}
            required={true}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                neutral80: `{${currentColor}}`,
              },
            })}
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              if (onChange) {
                onChange(selectedOption);
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default SelectOptions;
