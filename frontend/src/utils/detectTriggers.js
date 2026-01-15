import { triggerDictionary } from "./triggerDictionary";

export function detectTriggers(text) {
  const foundTriggers = new Set();
  const lowerText = text.toLowerCase();

  for (const [trigger, keywords] of Object.entries(triggerDictionary)) {
    for (const word of keywords) {
      if (lowerText.includes(word)) {
        foundTriggers.add(trigger);
        break; // stop checking more words for this trigger
      }
    }
  }

  return Array.from(foundTriggers);
}
