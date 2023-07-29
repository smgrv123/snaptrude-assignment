import React, { FC } from 'react';

import { NavigationButtonProps } from '@/types';

const NavigationButton: FC<NavigationButtonProps> = ({
  buttonText,
  onClick,
  extraStyles,
}) => {
  return (
    <button
      className={`py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 bg-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 text-sm ${extraStyles} `}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default NavigationButton;
