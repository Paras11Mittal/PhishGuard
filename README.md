# PhishGuard - AI Phishing Detection

A modern React application that uses AI to detect and explain phishing threats in emails, messages, and URLs.

## Features

- **AI-Powered Analysis**: Uses Google Safe Browsing API for intelligent phishing detection
- **Multi-Format Support**: Analyze emails, SMS/chat messages, and website URLs
- **Client-Side Heuristics**: Additional local analysis for common phishing patterns
- **Visual Highlighting**: Suspicious domains and content are highlighted in results
- **Analysis History**: Keep track of your last 5 analyses with localStorage
- **Copy Reports**: Export analysis results as JSON
- **Phishing Tips**: Educational tips to help users recognize threats
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure API Key**
   - Copy `.env` to your local environment
   - Add your Google Safe Browsing API key
   - Get your API key from: https://makersuite.google.com/app/apikey

3. **Development**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build:prod
   ```

## Deployment

### Environment Variables
Set the following environment variable in your hosting platform:
- `VITE_GOOGLE_SAFEBROWSING_API_KEY`: Your Google Safe Browsing API key

### Supported Platforms
- Netlify
- Vercel
- Any static hosting service

## Security Notes

- API keys are handled securely through environment variables
- No sensitive data is stored permanently
- Analysis history is stored locally in the browser only
- All API calls are made client-side to Google's secure endpoints

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **AI API**: Google Safe Browsing 2.0 Flash
- **Storage**: localStorage for history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Disclaimer

PhishGuard is an AI tool and may not be 100% accurate. Always exercise caution and use your own judgment when dealing with suspicious content.
