import { Scene } from '@babylonjs/core';
import { Dispatch, SetStateAction } from 'react';

type ViewPortTypes = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type CubiodModelType = {
  antialias: boolean;
  onSceneReady: (scene: Scene) => void;
  id: string;
};

type GeocoderType = {
  setviewport: Dispatch<SetStateAction<ViewPortTypes>>;
  viewport: ViewPortTypes;
};

type NavigationButtonProps = {
  buttonText: string;
  hrefPathname: string;
  onClick?: () => void;
};

export type {
  ViewPortTypes,
  CubiodModelType,
  GeocoderType,
  NavigationButtonProps,
};
