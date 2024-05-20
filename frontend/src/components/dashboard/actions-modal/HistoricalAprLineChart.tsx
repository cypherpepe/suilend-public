import { useEffect, useMemo, useRef } from "react";

import BigNumber from "bignumber.js";
import { format } from "date-fns";
import { capitalize } from "lodash";
import * as Recharts from "recharts";
import { useLocalStorage } from "usehooks-ts";

import { Side } from "@suilend/sdk/types";

import { useActionsModalContext } from "@/components/dashboard/actions-modal/ActionsModalContext";
import Button from "@/components/shared/Button";
import TokenLogo from "@/components/shared/TokenLogo";
import {
  TBody,
  TLabel,
  TLabelSans,
  TTitle,
} from "@/components/shared/Typography";
import { Separator } from "@/components/ui/separator";
import { AppData, useAppContext } from "@/contexts/AppContext";
import useBreakpoint from "@/hooks/useBreakpoint";
import useIsTouchscreen from "@/hooks/useIsTouchscreen";
import { LOGO_MAP, NORMALIZED_SUI_COINTYPE } from "@/lib/coinType";
import {
  DAYS,
  Days,
  RESERVE_EVENT_SAMPLE_INTERVAL_S_MAP,
  calculateBorrowAprPercent,
  calculateDepositAprPercent,
  calculateSuiRewardsDepositAprPercent,
} from "@/lib/events";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

const DAY_S = 24 * 60 * 60;

type ChartData = {
  index: number;
  timestampS: number;
  depositAprPercent?: number;
  depositSuiRewardsAprPercent?: number;
  borrowAprPercent?: number;
};

interface TooltipContentProps {
  side: Side;
  data?: ChartData;
}

function TooltipContent({ side, data }: TooltipContentProps) {
  if (!data) return null;

  return (
    // TooltipContent className
    <div className="rounded-md border bg-popover px-3 py-1.5 shadow-md animate-in fade-in-0 zoom-in-95">
      <div className="flex w-full flex-col gap-1">
        <TLabelSans>
          {format(new Date(data.timestampS * 1000), "MM/dd HH:mm")}
        </TLabelSans>

        {side === Side.DEPOSIT && data.depositAprPercent !== undefined ? (
          <>
            <div className="mt-1 flex w-full flex-row items-center justify-between gap-4">
              <TLabel className="uppercase">Base APR</TLabel>
              <TBody className="text-success">
                {formatPercent(new BigNumber(data.depositAprPercent))}
              </TBody>
            </div>

            {data.depositSuiRewardsAprPercent !== undefined && (
              <>
                <div className="flex w-full flex-row items-center justify-between gap-4">
                  <TLabel className="uppercase">SUI Rewards</TLabel>

                  <div className="flex flex-row items-center gap-1.5">
                    <TokenLogo
                      className="h-4 w-4"
                      coinType={NORMALIZED_SUI_COINTYPE}
                      symbol="SUI"
                      src={LOGO_MAP[NORMALIZED_SUI_COINTYPE]}
                    />
                    <TBody className="text-primary-foreground">
                      {formatPercent(
                        new BigNumber(data.depositSuiRewardsAprPercent),
                      )}
                    </TBody>
                  </div>
                </div>

                <Separator />

                <div className="flex w-full flex-row items-center justify-between gap-4">
                  <TTitle className="text-xs uppercase">Total APR</TTitle>
                  <TBody>
                    {formatPercent(
                      new BigNumber(
                        data.depositAprPercent +
                          data.depositSuiRewardsAprPercent,
                      ),
                    )}
                  </TBody>
                </div>
              </>
            )}
          </>
        ) : side === Side.BORROW && data.borrowAprPercent !== undefined ? (
          <>
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <TLabel className="uppercase">Base APR</TLabel>
              <TBody className="text-success">
                {formatPercent(new BigNumber(data.borrowAprPercent))}
              </TBody>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

interface ChartProps {
  side: Side;
  isLoading: boolean;
  data: ChartData[];
}

function Chart({ side, isLoading, data }: ChartProps) {
  const { sm } = useBreakpoint();
  const isTouchscreen = useIsTouchscreen();

  const sampleIntervalS =
    data.length > 0 ? data[1].timestampS - data[0].timestampS : 1;
  const samplesPerDay = DAY_S / sampleIntervalS;
  const days = data.length / samplesPerDay;

  // Max
  const maxY = Math.max(
    ...(data
      .map((d) =>
        side === Side.DEPOSIT
          ? (d.depositAprPercent ?? 0) + (d.depositSuiRewardsAprPercent ?? 0)
          : d.borrowAprPercent,
      )
      .filter(Boolean) as number[]),
  );

  // Ticks
  const ticksX = useMemo(() => {
    return data
      .filter((d) => {
        if (days === 1) return d.timestampS % ((sm ? 4 : 8) * 60 * 60) === 0;
        if (days === 7) return d.timestampS % ((sm ? 1 : 2) * DAY_S) === 0;
        if (days === 30) return d.timestampS % ((sm ? 5 : 10) * DAY_S) === 0;
        return false;
      })
      .map((d) => d.timestampS);
  }, [data, days, sm]);
  const ticksY = Array.from({ length: sm ? 4 : 3 }).map(
    (_, index, array) => Math.ceil(maxY / (array.length - 1)) * index,
  );

  const tickXFormatter = (timestampS: number) => {
    if (days === 1) return format(new Date(timestampS * 1000), "HH:mm");
    return format(new Date(timestampS * 1000), "MM/dd");
  };
  const tickYFormatter = (value: number) => value.toString();

  const tickMargin = 2;
  const tick = {
    fontSize: 11,
    fontFamily: "var(--font-geist-sans)",
    fill: "hsl(var(--muted-foreground))",
  };
  const tickLine = {
    stroke: "transparent",
  };

  // Domain
  const domainX = [
    Math.min(...data.map((d) => d.timestampS)),
    Math.max(...data.map((d) => d.timestampS)),
  ];
  const domainY = [0, maxY];

  return (
    <Recharts.ResponsiveContainer
      width="100%"
      height="100%"
      className="relative z-[1]"
      data-loading={data.length > 0}
    >
      <Recharts.AreaChart
        data={data}
        margin={{ top: 8, right: 16, bottom: -12, left: -15 }}
      >
        <Recharts.CartesianGrid
          strokeDasharray="1 4"
          stroke="hsla(var(--secondary) / 20%)"
          fill="transparent"
        >
          <div className="inset absolute bg-[red]" />
        </Recharts.CartesianGrid>
        <Recharts.XAxis
          type="number"
          dataKey="timestampS"
          ticks={ticksX}
          tickMargin={tickMargin}
          tick={tick}
          axisLine={{
            stroke: "#1A4176", // 25% var(--secondary) on var(--popover)
          }}
          tickLine={tickLine}
          tickFormatter={tickXFormatter}
          domain={domainX}
        />
        <Recharts.YAxis
          type="number"
          ticks={ticksY}
          tickMargin={tickMargin}
          tick={tick}
          axisLine={{
            stroke: "#1A4176", // 25% var(--secondary) on var(--popover)
          }}
          tickLine={tickLine}
          tickFormatter={tickYFormatter}
          domain={domainY}
          unit="%"
        >
          <Recharts.Label
            value={`${capitalize(side)} APR`}
            style={{
              fontSize: 12,
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 400,
              lineHeight: "12px",
              textAnchor: "middle",
              fill: "hsl(var(--muted-foreground))",
            }}
            position="insideLeft"
            angle={-90}
            offset={20}
          />
        </Recharts.YAxis>
        <Recharts.Area
          type="monotone"
          stackId="1"
          dataKey={
            side === Side.DEPOSIT ? "depositAprPercent" : "borrowAprPercent"
          }
          isAnimationActive={false}
          stroke="hsl(var(--success))"
          fill="hsla(var(--success) / 25%)"
          dot={{
            stroke: "transparent",
            strokeWidth: 0,
            fill: "transparent",
          }}
          strokeWidth={2}
        />
        {side === Side.DEPOSIT && (
          <Recharts.Area
            type="monotone"
            stackId="1"
            dataKey="depositSuiRewardsAprPercent"
            isAnimationActive={false}
            stroke="hsl(var(--secondary))"
            fill="hsla(var(--secondary) / 25%)"
            dot={{
              stroke: "transparent",
              strokeWidth: 0,
              fill: "transparent",
            }}
            strokeWidth={2}
          />
        )}
        {!isLoading && (
          <Recharts.Tooltip
            isAnimationActive={false}
            filterNull={false}
            cursor={{ stroke: "hsl(var(--foreground))", strokeWidth: 1 }}
            trigger={isTouchscreen ? "hover" : "hover"}
            content={({ active, payload }) => (
              <TooltipContent
                side={side}
                data={!!active ? payload?.[0]?.payload : undefined}
              />
            )}
          />
        )}
      </Recharts.AreaChart>
    </Recharts.ResponsiveContainer>
  );
}

interface HistoricalAprLineChartProps {
  reserveId: string;
  side: Side;
}

export default function HistoricalAprLineChart({
  reserveId,
  side,
}: HistoricalAprLineChartProps) {
  const appContext = useAppContext();
  const data = appContext.data as AppData;
  const { reserveAssetDataEventsMap, fetchReserveAssetDataEvents } =
    useActionsModalContext();

  const reserveMapRef = useRef<AppData["reserveMap"]>(data.reserveMap);

  // Events
  const [days, setDays] = useLocalStorage<Days>(
    "historicalAprLineChartDays",
    7,
  );

  const suiReserveId = data.reserveMap[NORMALIZED_SUI_COINTYPE].id;
  const suiEvents = useMemo(
    () => reserveAssetDataEventsMap?.[suiReserveId],
    [reserveAssetDataEventsMap, suiReserveId],
  );

  const didFetchInitialReserveAssetDataEventsRef = useRef<boolean>(false);
  useEffect(() => {
    const events = reserveAssetDataEventsMap?.[reserveId]?.[days];
    if (events === undefined) {
      if (didFetchInitialReserveAssetDataEventsRef.current) return;

      fetchReserveAssetDataEvents(reserveId, days);
      didFetchInitialReserveAssetDataEventsRef.current = true;
    }
  }, [reserveAssetDataEventsMap, reserveId, days, fetchReserveAssetDataEvents]);

  const onDaysClick = (value: Days) => {
    setDays(value);

    const events = reserveAssetDataEventsMap?.[reserveId]?.[value];
    if (events === undefined) fetchReserveAssetDataEvents(reserveId, value);
  };

  // Data
  const chartData = useMemo(() => {
    const events = reserveAssetDataEventsMap?.[reserveId]?.[days];
    if (events === undefined) return;

    if (suiEvents === undefined) return;
    for (const days of DAYS) if (suiEvents[days] === undefined) return;

    // Data
    const sampleIntervalS = RESERVE_EVENT_SAMPLE_INTERVAL_S_MAP[days];

    const daysS = days * DAY_S;
    const n = daysS / sampleIntervalS;

    const lastTimestampS =
      Date.now() / 1000 - ((Date.now() / 1000) % sampleIntervalS);
    const timestampsS = Array.from({ length: n })
      .map((_, index) => lastTimestampS - index * sampleIntervalS)
      .reverse();

    const result: ChartData[] = [];
    timestampsS.forEach((timestampS, index) => {
      let depositAprPercent: number | undefined = undefined;
      let depositSuiRewardsAprPercent: number | undefined = undefined;
      let borrowAprPercent: number | undefined = undefined;

      const event = events.findLast((e) => e.sampletimestamp <= timestampS);
      if (!event) {
        result.push({
          index,
          timestampS,
          depositAprPercent,
          depositSuiRewardsAprPercent,
          borrowAprPercent,
        });
        return;
      }

      const reserve = reserveMapRef.current[event.coinType];
      depositAprPercent = calculateDepositAprPercent(reserve, event);
      depositSuiRewardsAprPercent = calculateSuiRewardsDepositAprPercent(
        reserve,
        event,
        suiEvents[days],
      );
      borrowAprPercent = calculateBorrowAprPercent(reserve, event);

      result.push({
        index,
        timestampS,
        depositAprPercent,
        depositSuiRewardsAprPercent,
        borrowAprPercent,
      });
    });

    return result;
  }, [reserveAssetDataEventsMap, reserveId, days, suiEvents]);
  const isLoading = chartData === undefined;

  // Chart
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-end">
      <div className="relative z-[2] -mb-1 -mt-2 mr-4 flex flex-row md:-mt-1">
        {DAYS.map((_days) => (
          <Button
            key={_days}
            className="px-2 text-muted-foreground hover:bg-transparent"
            labelClassName={cn(
              "text-xs uppercase",
              days === _days && "text-primary-foreground",
            )}
            variant="ghost"
            size="sm"
            onClick={() => onDaysClick(_days)}
          >
            {_days}d
          </Button>
        ))}
      </div>

      <div
        ref={containerRef}
        id="historical-apr-line-chart"
        className="relative z-[1] h-[95px] w-full flex-shrink-0 transform-gpu sm:h-[160px]"
        is-loading={isLoading ? "true" : "false"}
      >
        <Chart side={side} isLoading={isLoading} data={chartData ?? []} />
      </div>
    </div>
  );
}