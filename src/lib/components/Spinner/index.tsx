import clsx from "clsx";
import { ComponentProps } from "react";
import styles from "./Spinner.module.css";

export interface Props extends ComponentProps<"svg"> {
  size?: number;
}

const Spinner: React.FC<Props> = ({ size = 16, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className, styles.spinner)}
      {...props}
    >
      <path
        d="M14 8a6 6 0 1 1-6-6"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const DocumentSpinner = () => {
  return (
    <div className={styles.documentSpinner}>
      <Spinner size={24} />
    </div>
  );
}

export default DocumentSpinner;
