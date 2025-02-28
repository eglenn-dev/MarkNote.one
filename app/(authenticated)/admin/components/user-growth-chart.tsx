"use client";
import { useEffect, useRef } from "react";
import { subDays, format, differenceInDays } from "date-fns";

interface CleanUser {
    id: string;
    name: string;
    role: string;
    joinDate: string;
    oauth: boolean;
}

interface UserGrowthChartProps {
    users: CleanUser[];
}

export default function UserGrowthChart({ users }: UserGrowthChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const today = new Date();
        const dailySignups: number[] = [];
        const labels: string[] = [];

        for (let i = 89; i >= 0; i--) {
            const date = subDays(today, i);
            dailySignups.push(0);
            labels.push(format(date, "MMM d"));
        }

        users.forEach((user) => {
            const joinDate = new Date(user.joinDate);
            const daysAgo = differenceInDays(today, joinDate);

            if (daysAgo >= 0 && daysAgo < 90) {
                dailySignups[89 - daysAgo]++;
            }
        });

        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const barWidth = (width - 60) / 90;
        const maxSignups = Math.max(...dailySignups, 5);

        ctx.beginPath();
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1;
        ctx.moveTo(40, 20);
        ctx.lineTo(40, height - 40);
        ctx.lineTo(width - 20, height - 40);
        ctx.stroke();

        dailySignups.forEach((count, index) => {
            const x = 40 + index * barWidth;
            const barHeight = (count * (height - 60)) / maxSignups;

            ctx.fillStyle = "#3b82f6";
            ctx.fillRect(x, height - 40 - barHeight, barWidth - 1, barHeight);

            if (index % 15 === 0) {
                ctx.fillStyle = "#64748b";
                ctx.font = "10px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(labels[index], x + barWidth / 2, height - 25);
            }
        });

        for (let i = 0; i <= 5; i++) {
            const y = height - 40 - (i * (height - 60)) / 5;
            const value = Math.round((i * maxSignups) / 5);

            ctx.fillStyle = "#64748b";
            ctx.font = "10px sans-serif";
            ctx.textAlign = "right";
            ctx.fillText(value.toString(), 35, y + 3);

            ctx.beginPath();
            ctx.strokeStyle = "#e2e8f0";
            ctx.setLineDash([2, 2]);
            ctx.moveTo(40, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Daily New Users", width / 2, 15);
    }, [users]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-full"
            />
        </div>
    );
}
