import React from 'react'

type ButtonProps = {
    onClick: () => Promise<void>;
    textButton: string;
  };

const Button = ({textButton, onClick}: ButtonProps) => {
  return (
    <button
        onClick={onClick}
      className="my-2 p-2 bg-transparent placeholder:text-slate-400 text-slate-800 text-sm border border-slate-400 rounded-md hover:text-slate-400 hover:bg-slate-800"
    >
      {textButton}
    </button>
  );
}

export default Button