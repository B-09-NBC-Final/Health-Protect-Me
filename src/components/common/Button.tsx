import { MouseEvent } from 'react';

interface ButtonProps {
  buttonName: string;
  bgColor?: string;
  textColor?: string;
  paddingY?: string;
  marginY?: string;
  buttonWidth?: string;
  hover?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ buttonName, bgColor, textColor, paddingY, marginY, buttonWidth, hover, onClick }: ButtonProps) => {
  return (
    <button
      className={`${bgColor ? bgColor : 'bg-[#FF7A85]'} rounded-lg ${
        textColor ? textColor : 'text-white'
      } font-semibold ${marginY ? marginY : 'px-0'} ${paddingY ? paddingY : 'py-4'} ${
        hover ? 'hover:box-shadow: 0px 8px 16px 0px rgba(255, 122, 133, 0.40)' : ''
      }  ${buttonWidth ? buttonWidth : 'w-[240px]'}`}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default Button;
