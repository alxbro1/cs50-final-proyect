import { useState } from "react";
import { ErrorMessage, type FieldInputProps, type FormikProps } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { IconType } from "react-icons";
import styles from "./index.module.css";

interface GradientIconProps {
  icon: IconType;
  gradientId: string;
}

const GradientIcon = ({
  icon: IconComponent,
  gradientId,
}: GradientIconProps) => (
  <IconComponent style={{ fill: `url(#${gradientId})` }} />
);

interface InputWithIconProps<Values> {
  field: FieldInputProps<string>;
  form: FormikProps<Values>;
  type: string;
  placeholder: string;
  icon: IconType;
  gradientColor1: string;
  gradientColor2: string;
  color?: boolean;
  [key: string]: unknown;
}

export const InputWithIcon = <Values,>({
  field,
  form,
  type,
  placeholder,
  icon,
  gradientColor1,
  gradientColor2,
  color,
  ...props
}: InputWithIconProps<Values>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputWrapper}>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: gradientColor1, stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: gradientColor2, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>

      <div className={color ? styles.inputWithIconV : styles.inputWithIconG}>
        <span className={`${styles.icon}`}>
          <GradientIcon icon={icon} gradientId="gradient1" />
        </span>
        <input
          {...field}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          style={{}}
          className={`${
            form.errors[field.name as keyof Values] &&
            form.touched[field.name as keyof Values]
              ? styles.inputError
              : ""
          }`}
          {...props}
        />
        {type === "password" && (
          <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
            <GradientIcon
              icon={showPassword ? FaEyeSlash : FaEye}
              gradientId="gradient1"
            />
          </span>
        )}
      </div>
      <ErrorMessage
        name={field.name}
        component="div"
        className={styles.error}
      />
    </div>
  );
};
