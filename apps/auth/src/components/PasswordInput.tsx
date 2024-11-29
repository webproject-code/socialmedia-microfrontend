import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input } from '@social-media/evoke-ui';
import { useState } from 'react';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  isError,
  errorMessage,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const tooglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Input
      {...props}
      name="password"
      type={showPassword ? 'text' : 'password'}
      label={label}
      placeholder={placeholder || '********'}
      error={isError}
      errorMessage={errorMessage}
      icon={
        <span className="hover:text-light-secondary dark:hover:text-dark-secondary cursor-pointer">
          {showPassword ? (
            <FaEyeSlash onClick={tooglePasswordVisibility} />
          ) : (
            <FaEye onClick={tooglePasswordVisibility} />
          )}
        </span>
      }
      iconPosition="right"
    />
  );
};

export default PasswordInput;
