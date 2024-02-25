import { CanvasController } from '@common/controllers';
import {createContext, ReactNode, useContext} from 'react';

export interface CanvasProviderProps {
  children: ReactNode;
}

interface ICanvasContext {
  init: ($canvas: HTMLCanvasElement) => void;
  controller: CanvasController;
}

const CanvasContext = createContext({} as ICanvasContext);

export const useCanvas = () => {
    return useContext(CanvasContext);
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  const controller = new CanvasController();

  const init = ($canvas: HTMLCanvasElement) => {
    controller.init($canvas);
  };

  return <CanvasContext.Provider value={{ init, controller }}>{children}</CanvasContext.Provider>;
}
