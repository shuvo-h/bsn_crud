import React from 'react';
import Paper from '../Paper';

type BsnFormProps = {
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
};

const BsnForm: React.FC<BsnFormProps> = ({ children, onSubmit, className = '' }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {children}
        </form>
    );
};

export default BsnForm;
