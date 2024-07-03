type TPaperProps = {
    children: React.ReactNode;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    className?: string;
};

const Paper = ({ children, size, className, rounded }: TPaperProps) => {
    let padding = 'p-1';
    let borderRadius = '';

    // Determine padding based on size
    switch (size) {
        case 'xs':
            padding = 'p-1';
            break;
        case 'sm':
            padding = 'p-2';
            break;
        case 'md':
            padding = 'p-4';
            break;
        case 'lg':
            padding = 'p-6';
            break;
        case 'xl':
            padding = 'p-8';
            break;
        default:
            break;
    }


    switch (rounded) {
        case 'none':
            borderRadius = 'rounded-none';
            break;
        case 'sm':
            borderRadius = 'rounded-sm';
            break;
        case 'md':
            borderRadius = 'rounded-md';
            break;
        case 'lg':
            borderRadius = 'rounded-lg';
            break;
        case 'xl':
            borderRadius = 'rounded-xl';
            break;
        case 'full':
            borderRadius = 'rounded-full';
            break;
        default:
            borderRadius = 'rounded-md';
            break;
    }

    return (
        <div className={`shadow-paper ${padding} ${borderRadius} ${className}`}>
            {children}
        </div>
    );
};

export default Paper;
