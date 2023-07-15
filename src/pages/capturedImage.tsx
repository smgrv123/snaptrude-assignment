import React, { useEffect } from 'react';
import { RootState, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';

import NavigationButton from '../components/NavigationButton';

function CapturedImage() {
  const selector = useAppSelector(
    (state: RootState) => state.image.imageString
  );

  const router = useRouter();

  useEffect(() => {
    if (!selector) router.push('/');
  }, []);

  return (
    <div className="flex flex-row justify-evenly items-center my-4">
      <img
        id="mapImage"
        className="h-[50rem] w-[70rem] border-white border-4 rounded-xl"
        src={selector}
        alt=""
      />
      <div className="flex flex-col h-32 justify-between ">
        <NavigationButton
          buttonText="Convert to 3D Model"
          hrefPathname="/rendered"
        />
        <NavigationButton
          buttonText="Capture the image again"
          hrefPathname="/"
        />
      </div>
    </div>
  );
}

export default CapturedImage;
