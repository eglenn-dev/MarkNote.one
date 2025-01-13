import Header from "@/components/header";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col">
            <Header />
            {children}
        </div>
    );
}
