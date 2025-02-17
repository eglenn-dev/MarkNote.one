import { hashPassword } from "@/lib/hashing";
import { createDemoPost } from "./post-model";
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
    username?: string;
    preferences: {
        mdPreview: boolean;
        menuOpen: boolean;
        categories: string[];
    };
}

export async function getUserByEmail(email: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("email")
        .equalTo(email.toLowerCase())
        .once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    for (const key in user) {
        return user[key];
    }
}

export async function getUserByKey(uid: string) {
    const userSnapshot = await db.ref(`users/${uid}`).once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    return user;
}

export async function getEmailByKey(uid: string) {
    const userSnapshot = await db.ref(`users/${uid}`).once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    return user.email;
}

export async function updateUserEmail(uid: string, email: string) {
    const user = await getUserByKey(uid);
    if (!user) return false;
    if (!(await checkUniqueEmailForUser(email))) return false;
    user.email = email;
    await db.ref(`users/${uid}`).update(user);
    return true;
}

export async function updateUserUsername(uid: string, username: string) {
    const user = await getUserByKey(uid);
    if (!user) return false;
    user.username = username;
    await db.ref(`users/${uid}`).update(user);
    return true;
}

export async function checkUniqueEmailForUser(email: string) {
    if (email === "") return false;
    const user = await getUserByEmail(email);
    return !user || user.email === email;
}

export async function updateUserPassword(uid: string, password: string) {
    const user = await getUserByKey(uid);
    if (!user) return false;
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await db.ref(`users/${uid}`).update(user);
    return true;
}

export async function getKeyByEmail(email: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("email")
        .equalTo(email)
        .once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    for (const key in user) {
        return key;
    }
}

export async function getNameByUsername(username: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("username")
        .equalTo(username)
        .once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    for (const key in user) {
        return user[key].name;
    }
}

export async function getUserRefByUsername(username: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("username")
        .equalTo(username.toLowerCase())
        .once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    for (const key in user) {
        return userSnapshot.ref.child(key);
    }
}

export async function getUserKeyByEmail(email: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("email")
        .equalTo(email.toLowerCase())
        .once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    for (const key in user) {
        return key;
    }
}

export async function createUser(
    email: string,
    name: string,
    password: string
) {
    const hashedPassword = await hashPassword(password);
    const user: User = {
        email,
        name,
        password: hashedPassword,
        role: "user",
        joinDate: new Date().toISOString(),
        oauth: false,
        preferences: {
            mdPreview: true,
            menuOpen: true,
            categories: ["Home", "Work"],
        },
    };
    await db.ref("users").push(user);
    const userId = await getKeyByEmail(email);
    if (!userId) return;
    await createDemoPost(userId);
}

export async function createOauthUser(username: string, primaryEmail: string) {
    const user: User = {
        email: primaryEmail,
        name: username,
        password: "",
        role: "user",
        joinDate: new Date().toISOString(),
        username: username,
        oauth: true,
        preferences: {
            mdPreview: true,
            menuOpen: true,
            categories: ["Home", "Work"],
        },
    };
    await db.ref("users").push(user);
    const userId = await getKeyByUsername(username);
    if (!userId) return;
    await createDemoPost(userId);
}

export async function updateUserPreferences(
    uid: string,
    mdPreview: boolean,
    menuOpen: boolean,
    categories: string[]
) {
    const user = await getUserByKey(uid);
    if (!user) return false;
    user.preferences.mdPreview = mdPreview;
    user.preferences.menuOpen = menuOpen;
    user.preferences.categories = categories;
    await db.ref(`users/${uid}`).update(user);
    return true;
}

export async function getUserCategories(uid: string) {
    const user = await getUserByKey(uid);
    if (!user) return [];
    return user.preferences.categories || [];
}

export async function checkOauthUser(username: string, primaryEmail?: string) {
    try {
        const userSnapshot = await db
            .ref("users")
            .orderByChild("username")
            .equalTo(username)
            .once("value");
        const user = userSnapshot.val();
        const userKey = Object.keys(user || {})[0];
        if (
            primaryEmail &&
            (user[userKey].email === "" || user[userKey].email === null)
        ) {
            await updateUserEmail(userKey, primaryEmail);
        }
        return user !== null;
    } catch (e) {
        console.error("Error checking oauth user: ", e);
        return false;
    }
}

export async function getKeyByUsername(username: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("username")
        .equalTo(username)
        .once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    for (const key in user) {
        return key;
    }
}

export async function getUsernameByKey(uid: string) {
    const userSnapshot = await db.ref(`users/${uid}`).once("value");
    const user = userSnapshot.val();
    if (!user) return null;
    return user.username;
}

export async function checkUniqueEmail(email: string) {
    if (email === "") return false;
    const user = await getUserByEmail(email);
    return !user;
}

export async function createUserIfUnique(
    email: string,
    name: string,
    password: string
) {
    if (email === "" || name === "" || password === "") return;
    if (await checkUniqueEmail(email)) {
        await createUser(email, name, password);
    }
}

export async function addUserPost(username: string, postKey: string) {
    try {
        const getUser = await getUserRefByUsername(username);
        if (!getUser) return;
        const user = await getUser.once("value");
        const userData = user.val();
        if (!userData) return;
        if (!userData.posts) {
            userData.posts = [postKey];
        } else {
            userData.posts.push(postKey);
        }
        await getUser.update(userData);
        return true;
    } catch (error) {
        console.error("Error adding post to user: ", error);
        return false;
    }
}

export async function removeUserPost(username: string, postKey: string) {
    try {
        const getUser = await getUserRefByUsername(username);
        if (!getUser) return;
        const user = await getUser.once("value");
        const userData = user.val();
        if (!userData) return;
        if (!userData.posts) return;
        userData.posts = userData.posts.filter(
            (key: string) => key !== postKey
        );
        await getUser.update(userData);
        return true;
    } catch (error) {
        console.error("Error removing post from user: ", error);
        return false;
    }
}

export async function makeUserAdmin(username: string) {
    try {
        const getUser = await getUserRefByUsername(username);
        if (!getUser) return;
        const user = await getUser.once("value");
        const userData = user.val();
        if (!userData) return;
        userData.role = "admin";
        await getUser.update(userData);
        return true;
    } catch (error) {
        console.error("Error making user admin: ", error);
        return false;
    }
}

export async function makeUserUser(username: string) {
    try {
        const getUser = await getUserRefByUsername(username);
        if (!getUser) return;
        const user = await getUser.once("value");
        const userData = user.val();
        if (!userData) return;
        userData.role = "user";
        await getUser.update(userData);
        return true;
    } catch (error) {
        console.error("Error making user user: ", error);
        return false;
    }
}

export async function getListOfAdmins() {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("role")
        .equalTo("admin")
        .once("value");
    const users = userSnapshot.val();
    if (!users) return null;
    const adminList = [];
    for (const key in users) {
        adminList.push(users[key]);
    }
    return adminList;
}

export async function getListOfAdminUsernames() {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("role")
        .equalTo("admin")
        .once("value");
    const users = userSnapshot.val();
    if (!users) return ["No admins"];
    const adminList = [] as string[];
    for (const key in users) {
        adminList.push(users[key].username);
    }
    return adminList;
}

export async function userCount() {
    const userSnapshot = await db.ref("users").once("value");
    const users = userSnapshot.val();
    if (!users) return 0;
    return Object.keys(users).length;
}

export async function isUsernameTaken(username: string) {
    const userSnapshot = await db
        .ref("users")
        .orderByChild("username")
        .equalTo(username)
        .once("value");
    const user = userSnapshot.val();
    return user !== null;
}
