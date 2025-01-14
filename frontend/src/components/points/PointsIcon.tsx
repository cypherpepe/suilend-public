import { ClassValue } from "clsx";

import {
  COINTYPE_LOGO_MAP,
  NORMALIZED_SEND_POINTS_COINTYPE,
} from "@suilend/frontend-sui";

import TokenLogo from "@/components/shared/TokenLogo";
import { cn } from "@/lib/utils";

interface PointsIconProps {
  className?: ClassValue;
}

export default function PointsIcon({ className }: PointsIconProps) {
  return (
    <TokenLogo
      className={cn("h-4 w-4", className)}
      token={{
        coinType: NORMALIZED_SEND_POINTS_COINTYPE,
        symbol: "SEND Points",
        iconUrl: COINTYPE_LOGO_MAP[NORMALIZED_SEND_POINTS_COINTYPE],
      }}
    />
  );
}
