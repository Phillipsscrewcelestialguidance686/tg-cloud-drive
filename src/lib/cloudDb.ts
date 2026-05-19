import { API_HASH, API_ID } from "../config/telegram";
import type { SavedAccount } from "../types";

const CLOUD_KEY = "tg-cloud-drive/accounts";

function getCloudConfig() {
  const url = import.meta.env.VITE_CLASHDB_URL?.trim();
  const password = import.meta.env.VITE_CLASHDB_PASSWORD?.trim();
  if (!url || !password) return null;
  return {
    url: url.replace(/\/$/, ""),
    password,
  };
}

function accountPayload(accounts: SavedAccount[]) {
  return {
    updatedAt: Date.now(),
    accounts: accounts.map((account) => ({
      userid: account.userId,
      string: account.session,
      username: account.username,
      "id name": account.idName,
      api_hash: account.apiHash || API_HASH,
      api_id: account.apiId || API_ID,
      updatedAt: account.updatedAt,
    })),
  };
}

function normalizeAccounts(data: any): SavedAccount[] {
  const rawAccounts =
    data?.accounts ??
    data?.value?.accounts ??
    data?.data?.accounts ??
    data?.data?.value?.accounts ??
    [];

  if (!Array.isArray(rawAccounts)) return [];

  return rawAccounts
    .map((account) => ({
      userId: String(account.userid ?? account.userId ?? account.id ?? ""),
      session: String(account.string ?? account.session ?? ""),
      username: String(account.username ?? ""),
      idName: String(account["id name"] ?? account.idName ?? account.name ?? ""),
      apiHash: String(account.api_hash ?? account.apiHash ?? API_HASH),
      apiId: Number(account.api_id ?? account.apiId ?? API_ID),
      avatarUrl: null,
      updatedAt: Number(account.updatedAt ?? Date.now()),
    }))
    .filter((account) => account.userId && account.session);
}

export async function loadCloudAccounts(): Promise<SavedAccount[]> {
  const config = getCloudConfig();
  if (!config) return [];

  try {
    const res = await fetch(`${config.url}/api/${CLOUD_KEY}`, {
      method: "GET",
      headers: {
        "x-api-key": config.password,
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return normalizeAccounts(data);
  } catch (error) {
    console.warn("ClashDB load accounts failed:", error);
    return [];
  }
}

export async function saveCloudAccounts(accounts: SavedAccount[]): Promise<void> {
  const config = getCloudConfig();
  if (!config) return;

  const payload = accountPayload(accounts.slice(0, 3));

  try {
    const res = await fetch(`${config.url}/api/${CLOUD_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.password,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn("ClashDB save accounts failed:", res.statusText);
    }
  } catch (error) {
    console.warn("ClashDB connection error during save:", error);
  }
}
