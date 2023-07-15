import Link from 'next/link';
import React, { FC } from 'react';

type NavigationButtonProps = {
  buttonText: string;
  hrefPathname: string;
  onClick?: () => void;
};

const NavigationButton: FC<NavigationButtonProps> = ({
  buttonText,
  hrefPathname,
  onClick,
}) => {
  return (
    <Link
      className="py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 bg-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 text-sm"
      onClick={onClick}
      href={hrefPathname}
    >
      {buttonText}
    </Link>
  );
};

export default NavigationButton;
