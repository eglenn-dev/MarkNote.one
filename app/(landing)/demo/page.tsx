import LandingHeader from "@/components/landing-header";
import Header from "@/components/header";
import DemoExample from "./demo";
import { getSession } from "@/lib/session";

export const metadata = {
    title: "Demo | MarkNote.one",
    description: "Try out MarkNote.one for yourself!",
};

export default async function DemoPage() {
    const session = await getSession();

    return (
        <div className="container mx-auto min-h-screen p-4 flex flex-col">
            {session?.user ? <Header /> : <LandingHeader />}
            <main className="flex-grow pl-4 pr-4 md:pl-0 md:pr-0 md:w-full mx-auto">
                <DemoExample />
            </main>
        </div>
    );
}
