import { FaEye, FaEyeSlash } from 'react-icons/fa';

type PasswordEyeProps = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordEye: React.FC<PasswordEyeProps> = ({
  showPassword,
  setShowPassword,
}) => {
  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <span
      className="absolute top-10 right-2 w-6 h-6 text-light-silverSteel dark:text-dark-silverSteel cursor-pointer"
      onClick={tooglePasswordVisibility}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  );
};

export default PasswordEye;
