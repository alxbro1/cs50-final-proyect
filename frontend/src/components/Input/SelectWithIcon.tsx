import { ErrorMessage, type FieldInputProps, type FormikProps } from "formik";
import type { IconType } from "react-icons";
import styles from "./index.module.css";

interface SelectWithIconProps<Values> {
  field: FieldInputProps<string>;
  form: FormikProps<Values>;
  placeholder: string;
  icon: IconType;
  gradientColor1: string;
  gradientColor2: string;
  color?: boolean;
  options: { value: string; label: string }[];
  [key: string]: unknown;
}

const GradientIcon = ({
  icon: IconComponent,
  gradientId,
}: { icon: IconType; gradientId: string }) => (
  <IconComponent style={{ fill: `url(#${gradientId})` }} />
);

export const SelectWithIcon = <Values,>({
  field,
  form,
  placeholder,
  icon,
  gradientColor1,
  gradientColor2,
  color,
  options,
  ...props
}: SelectWithIconProps<Values>) => (
  <div className={styles.inputWrapper}>
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradient-select" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: gradientColor1, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: gradientColor2, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
    <div className={color ? styles.inputWithIconV : styles.inputWithIconG}>
      <span className={styles.icon}>
        <GradientIcon icon={icon} gradientId="gradient-select" />
      </span>
      <select
        {...field}
        className={
          form.errors[field.name as keyof Values] && form.touched[field.name as keyof Values]
            ? styles.inputError
            : ""
        }
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
    <ErrorMessage name={field.name} component="div" className={styles.error} />
  </div>
);