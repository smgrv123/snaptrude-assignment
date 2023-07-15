import React, { useEffect } from 'react';
import {
  ArcRotateCamera,
  Vector3,
  Texture,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Scene,
  StandardMaterial,
} from '@babylonjs/core';
import { useRouter } from 'next/router';

import { Cubiod } from '../components/CuboidModel';
import { RootState, useAppSelector } from '@/redux/store';
import NavigationButton from '@/components/NavigationButton';

function Rendered() {
  const selector = useAppSelector(
    (state: RootState) => state.image.imageString
  );

  const router = useRouter();

  useEffect(() => {
    if (!selector) router.push('/');
  }, []);

  let box: Mesh | undefined;

  const cubiodReady = (scene: Scene) => {
    var camera = new ArcRotateCamera(
      'camera1',
      4.5,
      1,
      8,
      new Vector3(0, 0, 0),
      scene
    );

    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    light.intensity = 0.3;

    box = MeshBuilder.CreateBox(
      'box',
      { height: 2.5, width: 5, depth: 1.75 },
      scene
    );

    var cubeTexture = new Texture(selector, scene);
    var cubeMat = new StandardMaterial('box', scene);
    cubeMat.emissiveTexture = cubeTexture;
    box.material = cubeMat;

    box.position.y = 0.3;
    box.position.z = 0;
  };

  return (
    <>
      <Cubiod antialias onSceneReady={cubiodReady} id="my-canvas" />
      <NavigationButton
        buttonText={'Want To Try Again!'}
        hrefPathname={'/'}
        extraStyles="absolute bottom-6 left-6"
      />
    </>
  );
}

export default Rendered;
