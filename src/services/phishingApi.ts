import { AnalysisResult } from '../types/analysis';

export class PhishingAnalysisError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'PhishingAnalysisError';
  }
}

export async function analyzeContent(
  content: string,
  type: string
): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_GOOGLE_SAFEBROWSING_API_KEY;

  if (!apiKey) {
    throw new PhishingAnalysisError(
      "API key not configured. Please check your environment variables."
    );
  }

  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  // Safe Browsing only works on URLs
  if (type !== "url") {
    return {
      riskLevel: "Safe",
      summary: "Safe Browsing only scans URLs. Input was not a URL.",
      redFlags: []
    };
  }

  const payload = {
    client: {
      clientId: "phishguard-app",
      clientVersion: "1.0.0"
    },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION"
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: content }]
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new PhishingAnalysisError(
        `API request failed with status ${response.status}: ${errorBody}`,
        response.status
      );
    }

    const result = await response.json();

    if (result && result.matches && result.matches.length > 0) {
      return {
        riskLevel: "High Risk",
        summary: "This URL is flagged by Google Safe Browsing.",
        redFlags: result.matches.map((match: any) => ({
          indicator: match.threatType,
          explanation: `URL flagged for ${match.threatType} on ${match.platformType}`
        }))
      };
    }

    return {
      riskLevel: "Safe",
      summary: "No threats detected by Google Safe Browsing.",
      redFlags: []
    };
  } catch (error) {
    if (error instanceof PhishingAnalysisError) {
      throw error;
    }

    throw new PhishingAnalysisError(
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
}
