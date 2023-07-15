import { FC, useEffect, useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';

import { CubiodModelType } from '@/types';

const Cubiod: FC<CubiodModelType> = ({ antialias, onSceneReady, id }) => {
  const reactCanvas = useRef(null);
  useEffect(() => {
    const canvas = reactCanvas.current;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias);
    const scene = new Scene(engine);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => +scene.render());

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [antialias, onSceneReady]);

  return (
    <canvas
      ref={reactCanvas}
      style={{
        height: '100vh',
        width: '100vw',
      }}
      id={id}
    />
  );
};

export { Cubiod };
