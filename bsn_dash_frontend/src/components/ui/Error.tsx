
type TErrorProps = {message?:string|undefined|null,className?:string}
const Error = ({className,message}:TErrorProps) => {
    return (
        <p className={`mt-1 text-sm text-red-600 h-6 ${message?.length ? "" :"opacity-0"}`} id="email-error">
        {message}
      </p>
    );
};

export default Error;