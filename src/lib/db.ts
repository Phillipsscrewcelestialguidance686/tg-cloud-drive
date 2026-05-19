import type { UserProfile } from "../types";

export interface DBAccount {
  userId: string;
  sessionString: string;
  username: string;
  name: string;
  apiId: number;
  apiHash: string;
  phone: string;
}

const DB_URL = import.meta.env.VITE_CLASHDB_URL;
const DB_TOKEN = import.meta.env.VITE_CLASHDB_PASSWORD;

/**
 * Execute a command against Upstash Redis REST API.
 * Gracefully returns null if DB is not configured or fails.
 */
async function executeCommand(command: any[]): Promise<any> {
  if (!DB_URL || !DB_TOKEN) {
    return null;
  }

  try {
    const response = await fetch(DB_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });

    if (!response.ok) {
      console.warn("ClashDB command failed:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.warn("ClashDB connection error:", error);
    return null;
  }
}

/**
 * Fetch all registered accounts from ClashDB.
 */
export async function fetchAccountsFromDB(): Promise<DBAccount[]> {
  const result = await executeCommand(["GET", "tgcd:accounts"]);
  if (!result) return [];
  try {
    return JSON.parse(result) || [];
  } catch {
    return [];
  }
}

/**
 * Save all registered accounts to ClashDB.
 */
export async function saveAccountsToDB(accounts: DBAccount[]): Promise<boolean> {
  const result = await executeCommand(["SET", "tgcd:accounts", JSON.stringify(accounts)]);
  return result === "OK";
}
