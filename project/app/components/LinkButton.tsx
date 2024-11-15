
import Link from "next/link";
import { LinkButtonProps } from "../types";


export default function LinkButton({
  href,
  text,
  onClick,
  className,
}: LinkButtonProps) {
  return (
    <Link href={href} passHref>
      <button
        onClick={onClick}
        className={`w-full py-6 px-4 text-2xl font-bold rounded-[4px] ${className}`}
      >
        {text}
      </button>
    </Link>
  );
}
