import { MouseEvent } from 'react';

interface ButtonProps {
  buttonName: string;
  bgColor?: string;
  textColor?: string;
  paddingY?: string;
  marginX?: string;
  buttonWidth?: string;
  boxShadow?: string;
  border?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  buttonName,
  bgColor,
  textColor,
  paddingY,
  marginX,
  buttonWidth,
  boxShadow,
  border,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={`${bgColor ? bgColor : 'bg-[#FF7A85]'} rounded-lg ${
        textColor ? textColor : 'text-white'
      } font-semibold ${marginX ? marginX : 'px-0'} ${paddingY ? paddingY : 'py-4'} ${
        buttonWidth ? buttonWidth : 'w-[240px]'
      }
        ${boxShadow ? boxShadow : 'shadow-main-btn'}
        ${border ? `${border} border border-solid` : ''} `}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default Button;
