import admin from "firebase-admin";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountString) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
}

const serviceAccount = JSON.parse(serviceAccountString);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
        databaseURL: "https://marknotes-f903b-default-rtdb.firebaseio.com/",
    });
}

export async function createTestEntry(
    data: Record<string, string>
): Promise<string> {
    const db = admin.database();
    const testRef = db.ref("test");
    const newTestRef = testRef.push();
    await newTestRef.set(data);
    return newTestRef.key || "";
}

export async function readTestEntry(
    key: string
): Promise<Record<string, string> | null> {
    const db = admin.database();
    const testRef = db.ref("test").child(key);
    const snapshot = await testRef.once("value");
    return snapshot.val();
}

export async function deleteTestEntry(key: string): Promise<boolean> {
    try {
        const db = admin.database();
        const testRef = db.ref("test").child(key);
        await testRef.remove();
        return true;
    } catch (error) {
        console.error("Error deleting test entry:", error);
        return false;
    }
}
