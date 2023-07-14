import { RootState, useAppSelector } from '@/redux/store';
import React from 'react';
import NavigationButton from './components/NavigationButton';

function capturedImage() {
  const selector = useAppSelector(
    (state: RootState) => state.image.imageString
  );

  return (
    <div className="flex flex-row justify-evenly items-center my-4">
      <img
        id="mapImage"
        className="h-[50rem] w-[70rem] border-white border-4 rounded-xl"
        src={selector}
        alt=""
      />
      <NavigationButton buttonText='Convert to 3D Model' hrefPathname='/rendered' />
    </div>
  );
}

export default capturedImage;
