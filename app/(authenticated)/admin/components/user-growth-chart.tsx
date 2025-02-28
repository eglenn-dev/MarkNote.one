"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { subDays, format } from "date-fns";

const chartConfig = {
    users: {
        label: "Users",
        color: "#2563eb",
    },
} satisfies ChartConfig;

interface CleanUser {
    id: string;
    name: string;
    role: string;
    joinDate: string;
    oauth: boolean;
}

interface UserGrowthProps {
    users: CleanUser[];
}

export default function UserGrowthChart({ users }: UserGrowthProps) {
    const chartData = useMemo(() => {
        const today = new Date();
        const startDate = subDays(today, 90);
        const data = Array.from({ length: 90 }, (_, i) => {
            const date = subDays(today, 89 - i);
            return { date: format(date, "yyyy-MM-dd"), users: 0 };
        });

        users.forEach((user) => {
            const joinDate = new Date(user.joinDate);
            if (joinDate >= startDate && joinDate <= today) {
                const index = Math.floor(
                    (joinDate.getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                );
                data[index].users += 1;
            }
        });

        return data;
    }, [users]);

    return (
        <ChartContainer
            config={chartConfig}
            className="min-h-[200px] max-h-[400px] w-full"
        >
            <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="date"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => format(new Date(value), "MM-dd")}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <CartesianGrid vertical={false} />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
