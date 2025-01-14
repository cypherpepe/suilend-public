import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, ReactNode } from "react";

import { ClassValue } from "clsx";

import {
  TLabelSans,
  labelSansClassNames,
} from "@/components/shared/Typography";
import { cn } from "@/lib/utils";

interface LinkProps extends PropsWithChildren, NextLinkProps {
  href: string;
  activeHref?: string;
  className?: ClassValue;
  isExternal?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
}

export default function Link({
  href,
  activeHref,
  className,
  isExternal,
  startIcon,
  endIcon,
  label,
  children,
  ...props
}: LinkProps) {
  const router = useRouter();
  const isActive = router.asPath.startsWith(activeHref ?? href);

  const Component = isExternal ? "a" : NextLink;

  return (
    <Component
      href={href}
      target={isExternal ? "_blank" : undefined}
      className={cn(
        labelSansClassNames,
        "group flex shrink-0 flex-row items-center gap-1.5 text-sm transition-colors hover:text-foreground",
        isActive && "text-foreground",
        className,
      )}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
      {label && (
        <TLabelSans
          className={cn(
            "rounded-sm bg-muted px-1 text-[10px] leading-4 text-background transition-colors group-hover:bg-foreground",
            isActive && "bg-foreground",
          )}
        >
          {label}
        </TLabelSans>
      )}
    </Component>
  );
}
