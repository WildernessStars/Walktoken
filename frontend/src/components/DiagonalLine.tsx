interface DiagonalLineProps {
  color?: string;
}

export default function DiagonalLine({ color = 'red' }: DiagonalLineProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-0 left-0 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rotate-45 border-t-4 border-${color}-500`}
      ></div>
    </div>
  );
}

