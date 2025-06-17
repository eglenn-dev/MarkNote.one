import {
    createTestEntry,
    readTestEntry,
    deleteTestEntry,
} from "@/models/test-db";

export async function GET() {
    const data = {
        name: "Test Entry",
    };

    const key = await createTestEntry(data);
    if (!key) {
        return new Response("Failed to create test entry", { status: 500 });
    }

    const entry = await readTestEntry(key);
    if (!entry) {
        return new Response("Failed to read test entry", { status: 500 });
    }

    if (entry.name !== data.name) {
        return new Response("Test entry data mismatch", { status: 500 });
    }

    const response = await deleteTestEntry(key);
    if (!response) {
        return new Response("Failed to delete test entry", { status: 500 });
    }

    return new Response("Online!", { status: 200 });
}
