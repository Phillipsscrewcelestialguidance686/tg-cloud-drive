import { TelegramClient, Api } from "telegram";
import type { TopicFolder, DriveConfig } from "../types";
import bigInt from "big-integer";

/**
 * List all forum topics in the drive supergroup.
 * Returns them mapped to our TopicFolder shape.
 */
export async function getTopics(
  client: TelegramClient,
  config: DriveConfig
): Promise<TopicFolder[]> {
  try {
    const peer = new Api.InputPeerChannel({ channelId: bigInt(config.chatId), accessHash: bigInt(config.accessHash) });
    const result = await client.invoke(
      new Api.channels.GetForumTopics({
        channel: peer,
        limit: 100,
        offsetDate: 0,
        offsetId: 0,
        offsetTopic: 0,
      })
    );

    const topics = (result as Api.messages.ForumTopics).topics ?? [];
    return topics
      .filter((t): t is Api.ForumTopic => t.className === "ForumTopic")
      .map((t) => ({
        id: t.id,
        title: t.title,
        iconColor: t.iconColor ?? 0x6c63ff,
        date: t.date,
        messageCount: 0,
      }));
  } catch (err) {
    console.error("Failed to load topics:", err);
    return [];
  }
}

/**
 * Create a new topic (folder) inside the drive group.
 */
export async function createTopic(
  client: TelegramClient,
  config: DriveConfig,
  title: string
): Promise<TopicFolder | null> {
  try {
    const peer = new Api.InputPeerChannel({ channelId: bigInt(config.chatId), accessHash: bigInt(config.accessHash) });
    const result = await client.invoke(
      new Api.channels.CreateForumTopic({
        channel: peer,
        title,
        randomId: bigInt(Math.floor(Math.random() * 0xffffffff)),
      })
    );
    const updates = result as Api.Updates;
    // The new topic ID comes from the first MessageService in updates
    for (const upd of updates.updates) {
      if (upd.className === "UpdateNewChannelMessage") {
        const msg = (upd as Api.UpdateNewChannelMessage).message;
        return {
          id: msg.id,
          title,
          iconColor: 0x6c63ff,
          date: Math.floor(Date.now() / 1000),
          messageCount: 0,
        };
      }
    }
    return null;
  } catch (err) {
    console.error("Failed to create topic:", err);
    return null;
  }
}

export async function renameTopic(
  client: TelegramClient,
  config: DriveConfig,
  topicId: number,
  title: string
): Promise<boolean> {
  try {
    const peer = new Api.InputPeerChannel({
      channelId: bigInt(config.chatId),
      accessHash: bigInt(config.accessHash),
    });
    await client.invoke(
      new Api.channels.EditForumTopic({
        channel: peer,
        topicId,
        title,
      })
    );
    return true;
  } catch (err) {
    console.error("Failed to rename topic:", err);
    return false;
  }
}

/**
 * Delete a forum topic entirely.
 */
export async function deleteTopic(
  client: TelegramClient,
  config: DriveConfig,
  topicId: number
): Promise<boolean> {
  try {
    const peer = new Api.InputPeerChannel({ channelId: bigInt(config.chatId), accessHash: bigInt(config.accessHash) });
    await client.invoke(
      new Api.channels.DeleteTopicHistory({
        channel: peer,
        topMsgId: topicId,
      })
    );
    return true;
  } catch {
    return false;
  }
}
