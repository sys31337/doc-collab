import { cn } from "@lib/utils";
import React from "react";

type Props = {
  name?: string;
  color: string;
  x: number;
  y: number;
};

export default function Cursor({ name, color, x, y }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      className='flex gap-0'
    >
      <svg
        width="16"
        height="36"
        viewBox="0 0 16 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      {name && (
        <p style={{ background: color, }} className={cn(
          'text-xs p-0 h-5 text-black/60 font-bold px-2 rounded-full flex items-center'
        )}>
          {name}
        </p>)
      }
    </div>
  );
}
