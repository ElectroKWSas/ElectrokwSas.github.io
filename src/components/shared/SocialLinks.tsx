import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/config/site";
import { cn } from "@/utils/cn";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

const PLATFORMS = [
  { key: "instagram" as const, Icon: FaInstagram, label: "Instagram" },
  { key: "facebook" as const, Icon: FaFacebook, label: "Facebook" },
  { key: "tiktok" as const, Icon: FaTiktok, label: "TikTok" },
];

export default function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {PLATFORMS.map(({ key, Icon, label }) => {
        const href = SOCIAL_LINKS[key];
        if (!href) {
          return (
            <span
              key={key}
              title={`${label}: próximamente`}
              aria-label={`${label} (próximamente)`}
              className={cn(
                "flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary/50",
                iconClassName
              )}
            >
              <Icon size={16} />
            </span>
          );
        }
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-primary transition hover:border-primary hover:text-primary dark:text-text-primary-dark",
              iconClassName
            )}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
