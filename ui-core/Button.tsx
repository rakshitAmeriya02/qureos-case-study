import React from "react";
import { clsx } from "@/utils/helpers";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "outlined" | "text";
}

const Button = ({
  children,
  className,
  disabled,
  onClick,
  variant = "outlined",
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        variant === "outlined" &&
        "px-4 py-2 mx-4 mb-4 font-semibold text-gray-700 bg-transparent border border-gray-500 rounded hover:bg-gray-500 hover:text-white hover:border-transparent",
        variant === "text" &&
        "px-8 py-3 font-bold text-gray-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none",
        disabled && "cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
