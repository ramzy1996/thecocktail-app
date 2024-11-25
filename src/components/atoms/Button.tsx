/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
type buttonProps = {
  onClick: any;
  isDisabled?: boolean;
  className?: string;
  buttonText: string;
};
const Button = ({
  onClick,
  isDisabled,
  className,
  buttonText,
}: buttonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`p-2 text-white rounded-md text-sm sm:text-base ${
        isDisabled && "!bg-gray-400 cursor-not-allowed"
      } ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
