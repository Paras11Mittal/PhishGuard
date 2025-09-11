import { RedFlag } from '../types/analysis';

export function analyzeClientSideHeuristics(content: string): RedFlag[] {
  const flags: RedFlag[] = [];
  
  // Check for urgency keywords
  const urgencyKeywords = [
    'urgent', 'immediately', 'verify account', 'suspend', 'expire',
    'act now', 'limited time', 'within 24 hours', 'confirm identity',
    'update payment', 'security alert', 'unusual activity'
  ];
  
  const lowerContent = content.toLowerCase();
  const foundUrgencyWords = urgencyKeywords.filter(keyword => 
    lowerContent.includes(keyword)
  );
  
  if (foundUrgencyWords.length > 0) {
    flags.push({
      indicator: 'Sense of Urgency',
      explanation: `Contains urgency-inducing language: "${foundUrgencyWords.join('", "')}" - a common phishing tactic to pressure quick action.`
    });
  }
  
  // Check for suspicious URLs
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  const urls = content.match(urlRegex) || [];
  
  urls.forEach(url => {
    // Long URL check
    if (url.length > 75) {
      flags.push({
        indicator: 'Suspiciously Long URL',
        explanation: `URL is ${url.length} characters long, which may be used to hide the real destination.`
      });
    }
    
    // Obfuscated URL checks
    if (url.includes('@')) {
      flags.push({
        indicator: 'Obfuscated Link',
        explanation: 'URL contains "@" symbol, which can be used to redirect to malicious sites.'
      });
    }
    
    const dashCount = (url.match(/-/g) || []).length;
    if (dashCount > 4) {
      flags.push({
        indicator: 'Obfuscated Link',
        explanation: `URL contains ${dashCount} dashes, which may indicate a suspicious subdomain structure.`
      });
    }
    
    const encodedChars = url.match(/%[0-9A-Fa-f]{2}/g) || [];
    if (encodedChars.length > 2) {
      flags.push({
        indicator: 'Obfuscated Link',
        explanation: `URL contains ${encodedChars.length} encoded characters (${encodedChars.join(', ')}), which may hide malicious content.`
      });
    }
  });
  
  return flags;
}

export function highlightSuspiciousDomains(content: string): string {
  // Common suspicious domain patterns
  const suspiciousPatterns = [
    /[a-z0-9-]+\.tk\b/gi,
    /[a-z0-9-]+\.ml\b/gi,
    /[a-z0-9-]+\.ga\b/gi,
    /[a-z0-9-]+\.cf\b/gi,
    /bit\.ly\/[a-zA-Z0-9]+/gi,
    /tinyurl\.com\/[a-zA-Z0-9]+/gi,
    /t\.co\/[a-zA-Z0-9]+/gi,
    /[a-z0-9-]*paypal[a-z0-9-]*\.[a-z]{2,}/gi,
    /[a-z0-9-]*amazon[a-z0-9-]*\.[a-z]{2,}/gi,
    /[a-z0-9-]*microsoft[a-z0-9-]*\.[a-z]{2,}/gi,
    /[a-z0-9-]*google[a-z0-9-]*\.[a-z]{2,}/gi,
    /[a-z0-9-]*apple[a-z0-9-]*\.[a-z]{2,}/gi,
  ];
  
  let highlightedContent = content;
  
  suspiciousPatterns.forEach(pattern => {
    highlightedContent = highlightedContent.replace(pattern, (match) => {
      return `<span class="bg-red-100 text-red-800 px-1 rounded font-semibold">${match}</span>`;
    });
  });
  
  return highlightedContent;
}