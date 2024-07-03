import React, { Dispatch, SetStateAction } from 'react';

type FileUploaderProps = {
    label: string;
    name: string;
    accept?: string;
    disabled?: boolean;
    errorMessage?: string | null;
    className?: string;
    onChange?: (file: File | null, name?: string) => void; // Change the type here to File | null
    setState?: Dispatch<SetStateAction<any>>;
};

const BsnFileUploader: React.FC<FileUploaderProps> = ({
    label,
    name,
    accept = '*',
    onChange,
    setState,
    disabled = false,
    errorMessage = '',
    className = '',
}) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (setState) {
            setState((prevState: Record<string, any>) => ({
                ...prevState,
                [name]: file,
            }));
        }

        if (onChange) {
            onChange(file, name);
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type="file"
                    id={name}
                    name={name}
                    accept={accept}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm ${className}`}
                    disabled={disabled}
                    onChange={onChangeHandler}
                />
            </div>
            <p className={`mt-1 text-sm text-red-600 ${errorMessage ? "" : "opacity-0"}`} id={`${name}-error`}>
                {errorMessage}
            </p>
        </div>
    );
};

export default BsnFileUploader;
