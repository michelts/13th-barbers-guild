import type { Level } from "./data";

export const reset = () => new CustomEvent("reset");

export const potionClick = (color: string) =>
  new CustomEvent("potionClick", { bubbles: true, detail: { color } });

export const potionRelease = (color: string) =>
  new CustomEvent("potionRelease", { bubbles: true, detail: { color } });

export const cauldronDrop = (color: string) =>
  new CustomEvent("cauldronDrop", { bubbles: true, detail: { color } });

export const cauldronPrepared = (color: string) =>
  new CustomEvent("cauldronPrepared", { bubbles: true, detail: { color } });

export const notify = (messages: string[], onDismissed?: () => void) =>
  new CustomEvent("notify", { detail: { messages, onDismissed } });

export const dismiss = () => new CustomEvent("dismiss");

export const newLevel = (level: Level) =>
  new CustomEvent("newLevel", { detail: { level } });
