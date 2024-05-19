import React from 'react';
import { Layout } from '../layout/Layout';
import { Style } from "./Style";

export interface PopupProps {
  layout: Layout;
  style?: Style;
  disabled?: boolean;
  removed?: boolean;
  children: React.ReactNode;
  onBack?(): void;
  fit?: boolean;
  zIndex?: number;
  clickThrough?: boolean;
  leaveBorderUnchanged?: boolean;
  setVisible?(visible: boolean): void;
  visible?: boolean;
}
