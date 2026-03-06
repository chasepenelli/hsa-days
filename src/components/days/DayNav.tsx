import Link from "next/link";
import Image from "next/image";

interface DayNavProps {
  currentDay: number;
  isStandalone?: boolean;
}

export function DayNav({ currentDay, isStandalone }: DayNavProps) {
  const hasPrev = currentDay > 1;
  const hasNext = currentDay < 30;

  return (
    <div
      className={`${isStandalone ? "mb-20" : "sticky bottom-0"} flex justify-between items-center px-5 py-3 z-10`}
      style={{
        background: "rgba(250,248,245,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        paddingBottom: isStandalone ? "12px" : "calc(12px + env(safe-area-inset-bottom))",
      }}
    >
      {hasPrev ? (
        <Link
          href={`/days/${currentDay - 1}`}
          className="flex items-center gap-2 no-underline transition-colors hover:text-sage min-h-11 px-2 rounded-lg"
          style={{ color: "var(--text-muted)", fontSize: "0.88rem", fontWeight: 500 }}
        >
          <Image
            src="/illustrations/icons/icon-arrow-left.webp"
            alt=""
            width={16}
            height={16}
            style={{ objectFit: "contain", opacity: 0.7 }}
          />
          <span>
            <span className="hidden sm:inline">Day </span>
            {currentDay - 1}
          </span>
        </Link>
      ) : (
        <span
          className="flex items-center gap-2 px-2 min-h-11 opacity-25 text-[0.88rem]"
          style={{ color: "var(--text-muted)" }}
        >
          <Image
            src="/illustrations/icons/icon-arrow-left.webp"
            alt=""
            width={16}
            height={16}
            style={{ objectFit: "contain" }}
          />
          Start
        </span>
      )}

      <Link
        href="/days"
        className="text-[0.8rem] font-medium no-underline transition-colors hover:text-sage px-3 py-1.5 rounded-lg hidden sm:block"
        style={{
          color: "var(--text-muted)",
          background: "rgba(91,123,94,0.06)",
        }}
      >
        All Days
      </Link>

      {hasNext ? (
        <Link
          href={`/days/${currentDay + 1}`}
          className="flex items-center gap-2 no-underline transition-colors hover:text-sage min-h-11 px-2 rounded-lg"
          style={{ color: "var(--text-muted)", fontSize: "0.88rem", fontWeight: 500 }}
        >
          <span>
            <span className="hidden sm:inline">Day </span>
            {currentDay + 1}
          </span>
          <Image
            src="/illustrations/icons/icon-arrow-right.webp"
            alt=""
            width={16}
            height={16}
            style={{ objectFit: "contain", opacity: 0.7 }}
          />
        </Link>
      ) : (
        <span
          className="flex items-center gap-2 px-2 min-h-11 opacity-25 text-[0.88rem]"
          style={{ color: "var(--text-muted)" }}
        >
          End
          <Image
            src="/illustrations/icons/icon-arrow-right.webp"
            alt=""
            width={16}
            height={16}
            style={{ objectFit: "contain" }}
          />
        </span>
      )}
    </div>
  );
}
