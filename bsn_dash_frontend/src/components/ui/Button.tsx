import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    variant?: "transparent" | "block"
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    loading = false,
    size = 'md',
    className = '',
    variant='block'
}) => {
    // Determine button classes based on size
    let sizeClass = '';
    switch (size) {
        case 'sm':
            sizeClass = 'px-3 py-2 text-sm';
            break;
        case 'lg':
            sizeClass = 'px-6 py-3 text-lg';
            break;
        case 'md':
        default:
            sizeClass = 'px-4 py-2 text-base';
            break;
    }

    let defaultVariant = 'bg-blue-500 hover:bg-blue-600';
    let loaderColor = 'border-white'
    switch (variant) {
        case "transparent":
            defaultVariant = 'bg-transparent hover:bg-blue-100'
            loaderColor = 'border-sky-500'
            break;

        default:
            loaderColor = 'border-white'
            defaultVariant = 'bg-blue-500 hover:bg-blue-600'
            break;
    }



    return (
        <button
            type={type}
            className={`flex  ${defaultVariant} text-white font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out ${sizeClass} ${
                disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <svg
                    className={`animate-spin h-5 w-5 mr-3 ${loaderColor} border-r-2 rounded-full`}
                    viewBox="0 0 24 24"
                ></svg>
            ) : null}
            {children}
        </button>
    );
};

export default Button;
