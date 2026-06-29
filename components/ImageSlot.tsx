'use client';

import { CSSProperties } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'image-slot': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
          shape?: 'rect' | 'rounded' | 'circle' | 'pill';
          radius?: number | string;
          fit?: 'cover' | 'contain' | 'fill';
          position?: string;
          placeholder?: string;
          src?: string;
          mask?: string;
        },
        HTMLElement
      >;
    }
  }
}

type Props = {
  id: string;
  placeholder: string;
  shape?: 'rect' | 'rounded' | 'circle' | 'pill';
  radius?: number;
  style?: CSSProperties;
};

export function ImageSlot({
  id,
  placeholder,
  shape = 'rounded',
  radius = 16,
  style,
}: Props) {
  return (
    <image-slot
      id={id}
      shape={shape}
      radius={radius}
      placeholder={placeholder}
      style={style}
    />
  );
}
