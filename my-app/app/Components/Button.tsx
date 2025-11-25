import React from "react";
import { cn } from "@/app/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const variants = {
    primary: cn(
      `bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text`,
    ),
    secondary:
      "bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary-text border-btn-secondary",
    danger: "bg-error hover:bg-error-light text-text-light hover:text-error",
    success: "bg-success hover:bg-success-light text-text-light ",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-6 py-2 rounded-btn rounded-lg font-medium transition cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
