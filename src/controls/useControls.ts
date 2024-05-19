import { useEffect } from "react";
import { PopupControlListener } from "./PopupControlListener";
import { useControlContext } from "../context/controls/ControlContextProvider";

export enum LockStatus {
  UNLOCKED,
  LOCKED,
}

interface Props {
  listener: PopupControlListener;
  active: boolean;
}

export function useControls({ active, listener }: Props) {
  const { popupControl } = useControlContext();

  useEffect((): (() => void) | void => {
    if (active) {
      popupControl.addListener(listener);
      return () => popupControl.removeListener(listener);
    }
  }, [listener, popupControl, active]);

  return { lockState: active ? LockStatus.UNLOCKED : LockStatus.LOCKED, popupControl };
}
