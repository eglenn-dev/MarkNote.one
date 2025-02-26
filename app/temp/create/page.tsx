import CreateTempNote from "./create-note";

export const metadata = {
    title: "Create Temp Note | MarkNote.one",
    description:
        "Create a temporary note that will be automatically deleted after being read.",
};

export default async function CreateTempPage() {
    return <CreateTempNote />;
}
