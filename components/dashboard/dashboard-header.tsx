import Image from "next/image";
import Link from "next/link";

const USER_NAME = "Madhu";

/** Dashboard top bar: logo left, signed-in user chip right. */
export function DashboardHeader() {
  return (
    <header className="relative z-20 border-b border-[#1A2B56]/8 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:h-[88px] sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label="Finkuby Technologies home"
          className="inline-flex items-center gap-3"
        >
          <span className="relative block h-10 w-[140px] overflow-hidden sm:h-11 sm:w-[154px]">
            <Image
              src="/logo11.png"
              alt="Finkuby Technologies"
              fill
              sizes="154px"
              priority
              className="object-cover object-center"
            />
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-[#5b6b82] sm:inline">
            {USER_NAME}
          </span>
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2B56] text-sm font-bold text-white"
          >
            {USER_NAME.slice(0, 1)}
          </span>
        </div>
      </div>
    </header>
  );
}
