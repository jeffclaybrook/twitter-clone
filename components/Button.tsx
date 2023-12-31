interface ButtonProps {
 label: string;
 secondary?: boolean;
 fullWidth?: boolean;
 large?: boolean;
 onClick: () => void;
 disabled?: boolean;
 outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
 label,
 secondary,
 fullWidth,
 onClick,
 large,
 disabled,
 outline
}) => {
 return (
  <button
   disabled={disabled}
   onClick={onClick}
   className={`
   ${fullWidth ? "w-full" : "w-fit"}
   ${secondary ? "bg-white text-black border-black" : "bg-sky-500 text-white border-sky-100"}
   ${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"}
   ${outline ? "bg-transparent border-white text-white" : ""}
   disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition border-2`}
  >
   {label}
  </button>
 )
}

export default Button