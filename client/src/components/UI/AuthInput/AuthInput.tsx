import React, { FC } from "react";
import classes from "./AuthInput.module.css";

interface AuthInputProps {
  type: "text" | "password";
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput: FC<AuthInputProps> = ({
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <div>
      <input
        className={
          type === "text" ? classes.Auth_inpt_login : classes.Auth_inpt_password
        }
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default AuthInput;
