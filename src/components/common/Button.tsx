import { MouseEvent } from 'react';

interface ButtonProps {
  buttonName: string;
  bgColor?: string;
  textColor?: string;
  paddingY?: string;
  marginY?: string;
  buttonWidth?: string;
  boxShadow?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  buttonName,
  bgColor,
  textColor,
  paddingY,
  marginY,
  buttonWidth,
  boxShadow,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={`${bgColor ? bgColor : 'bg-[#FF7A85]'} rounded-lg ${
        textColor ? textColor : 'text-white'
      } font-semibold ${marginY ? marginY : 'px-0'} ${paddingY ? paddingY : 'py-4'} ${
        buttonWidth ? buttonWidth : 'w-[240px]'
      } shadow-main-btn 
        ${boxShadow ? boxShadow : 'shadow-main-btn'}`}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default Button;
