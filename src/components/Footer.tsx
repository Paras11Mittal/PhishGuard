import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-8">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} PhishGuard Security. All rights reserved. may not be 100% accurate. Always exercise caution and use your own judgment.
      </p>
    </footer>
  );
};

export default Footer;