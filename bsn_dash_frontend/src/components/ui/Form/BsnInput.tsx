import React, { Dispatch, SetStateAction } from 'react';


type InputFieldProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    errorMessage?: string | null;
    className?: string;
    onChange?: (value:string,name?:string) => void;
    onBlur?: (value:string,name?:string) => void;
    setState?:  Dispatch<SetStateAction<any>>;
};

const BsnInput: React.FC<InputFieldProps> = ({
    label,
    name,
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    onBlur,
    setState,
    disabled = false,
    errorMessage='',
    className = '',
}) => {
    const validClass = errorMessage?.length
    ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
    : 'text-gray-700 ring-gray-300 focus:ring-blue-300 placeholder:text-gray-300 focus:ring-blue-500 ';


    const onBlurHandler = (value:string,name:string) =>{
        if (setState) {
            setState((pre:Record<string,any>)=>{
                return {...pre,[name]:value}
            })
        }
        if (onBlur) {
            onBlur(value,name)
        }
    }

    return (
        <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={name}
          className={`block w-full rounded-md border-0 py-1.5 px-1.5 pr-10  ring-1 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 outline-none ${validClass}`}
          placeholder={placeholder}
        //   defaultValue="adamwathan"
          aria-invalid="true"
          aria-describedby="email-error"
          onChange={(e)=> onChange && onChange(e.target.value,name)}
          onBlur={(e)=> onBlurHandler(e.target.value,name)}
        />
      </div>
      <p className={`mt-1 text-sm text-red-600 h-6 ${errorMessage?.length ? "" :"opacity-0"}`} id="email-error">
        {errorMessage}
      </p>
    </div>
    );
};

export default BsnInput;
