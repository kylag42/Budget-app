import dotenv from "dotenv"
dotenv.config()
import admin, {type ServiceAccount} from "firebase-admin"

function requireEnv(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing env variable: ${name}`)
    }
    return value
}

const serviceAccount: ServiceAccount = {
    projectId: requireEnv("FIREBASE_PROJECT_ID"),
    clientEmail: requireEnv("FIREBASE_CLIENT_EMAIL"),
    privateKey: requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

    })

export const db = admin.firestore()