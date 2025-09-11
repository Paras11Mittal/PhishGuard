export const phishingTips = [
  "Always check the sender's email address carefully - phishers often use similar-looking domains.",
  "Hover over links to see the real destination before clicking - legitimate companies use their official domains.",
  "Be suspicious of urgent messages asking for personal information - banks never ask for passwords via email.",
  "Look for spelling and grammar mistakes - professional organizations proofread their communications.",
  "When in doubt, contact the company directly through their official website or phone number."
];

export function getRandomTip(): string {
  return phishingTips[Math.floor(Math.random() * phishingTips.length)];
}