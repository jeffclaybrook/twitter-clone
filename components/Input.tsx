interface InputProps {
 placeholder?: string;
 value?: string;
 type?: string;
 disabled?: boolean;
 label?: string;
 onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
 placeholder,
 value,
 type = "text",
 onChange,
 disabled,
 label
}) => {
 return (
  <div className="w-full">
   {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
   <input
    type={type}
    placeholder={placeholder}
    value={value}
    disabled={disabled}
    onChange={onChange}
    className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
   />
  </div>
 )
}

export default Input