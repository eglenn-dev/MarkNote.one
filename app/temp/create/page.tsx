import CreateTempNote from "./create-note";
import { headers } from "next/headers";

export const metadata = {
    title: "Create Temp Note | MarkNote.one",
    description:
        "Create a temporary note that will be automatically deleted after being read.",
};

export default async function CreateTempPage() {
    const headerList = await headers();
    const host = headerList.get("host") || "temp.marknote.one";
    return <CreateTempNote host={host} />;
}
