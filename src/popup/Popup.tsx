// To recognize dom types (see https://bun.sh/docs/typescript#dom-types):
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import React from 'react';
import { CSSProperties, useEffect, useState } from 'react';
import './css/Popup.css';
import { usePopupLayout } from '../layout/usePopupLayout';
import { PopupProps } from './PopupProps';

//  Hack until I get proper CSS to work
const OVERLAP: CSSProperties = {
  position: 'absolute',
};

const POPUP_CSS: CSSProperties = {
  outline: '3px solid #fff',
  backgroundColor: 'black',
  borderRadius: 12,
  padding: 3,
  boxShadow: '10px 5px 0px #000000cc',
  transition: 'outline-color .3s',
};

const DOUBLE_BORDER_CSS: CSSProperties = {
  border: '3px solid white',
  borderRadius: 10,
  outline: '3px solid black',
  color: 'white',
  cursor: 'pointer',
  transition: 'border-color .3s',
  userSelect: 'none',
};

const DOUBLE_BORDER_HEIGHT_OFFSET = 25;
const DEFAULT_FONT_SIZE = 24;

export function Popup({
  children,
  layout,
  style,
  disabled,
  removed,
  onBack,
  fit,
  zIndex,
  clickThrough,
  leaveBorderUnchanged,
  setVisible,
  visible,
}: PopupProps): JSX.Element {
  const [h, setH] = useState(0);
  useEffect(() => {
    requestAnimationFrame(() => setH(100));
  }, [setH]);

  const [localVisible, setLocalVisible] = useState(true);
  const { top, left, right, bottom, width, height, valid } = usePopupLayout({
    layout,
    setVisible: setVisible ?? setLocalVisible,
  });

  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh", zIndex,
      pointerEvents: clickThrough ? "none" : undefined,
    }}>
      {onBack ? <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }} onClick={onBack} /> : undefined}
      <div style={{
          ...OVERLAP,
          left, top, right, bottom, width, height: fit ? 0 : height,
          fontSize: style?.fontSize ?? DEFAULT_FONT_SIZE,
          display: valid && (visible ?? localVisible) ? "" : "none",
        }}>
        <div className="pop-up"
        style={{
            ...POPUP_CSS,
            marginTop: `${removed ? height ? `${height}px` : "80%" : "0px"}`,
            width: '100%',
            height: removed ? 0 : fit ? undefined : `${h}%`,
            overflow: 'hidden',
            opacity: removed ? 0 : 1,
            transition: 'height .2s, margin-top .2s, opacity .2s',
            outlineColor: !leaveBorderUnchanged && disabled ? "whitesmoke" : "white",
          }}
        >
          <div
            className="double-border"
            style={{
              ...DOUBLE_BORDER_CSS,
              height: fit ? undefined : `calc(100% - ${DOUBLE_BORDER_HEIGHT_OFFSET}px)`,
              borderColor: !leaveBorderUnchanged && disabled ? "silver" : "white",
              overflow: "hidden",
            }}
          >
            {removed ? undefined : children}
          </div>
        </div>
      </div>
    </div>
  );
}
