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

const db = admin.database();

interface User {
    email: string;
    password: string;
    name: string;
    role: string;
    joinDate: string;
    oauth: boolean;
    googleId?: string;
    gitHubUsername?: string;
    username?: string;
    preferences: {
        mdPreview: boolean;
        menuOpen: boolean;
        categories: string[];
    };
}

interface CleanUser {
    id: string;
    name: string;
    role: string;
    joinDate: string;
    oauth: string;
}

interface CleanNote {
    creationDate: string;
    viewDate: string;
}

export async function getCleanUsers() {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const users: Record<string, User> = snapshot.val() || {};

    const cleanUsers: CleanUser[] = Object.entries(users).map(([id, user]) => {
        return {
            id,
            name: user.name,
            role: user.role,
            joinDate: user.joinDate,
            oauth: user.googleId
                ? "Google"
                : user.gitHubUsername || user.oauth
                ? "GitHub"
                : "Email",
        };
    });
    return cleanUsers;
}

export async function getTempNoteStats() {
    const tempNotesRef = db.ref("temp-notes");
    const snapshot = await tempNotesRef.once("value");
    const tempNotes: Record<string, CleanNote> = snapshot.val() || {};

    const noteStats = Object.entries(tempNotes).map(([id, note]) => {
        return {
            id,
            creationDate: note.creationDate,
            viewDate: note.viewDate || "",
        };
    });

    return noteStats as CleanNote[];
}
