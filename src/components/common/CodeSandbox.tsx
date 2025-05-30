// src/components/common/CodeSandbox.tsx

import React from 'react';

type CodeSandboxProps = {
  sandboxUrl: string;
  height?: string;
};

const CodeSandbox: React.FC<CodeSandboxProps> = ({
  sandboxUrl,
  height = '500px',
}: CodeSandboxProps) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <iframe
        src={sandboxUrl}
        style={{ width: '100%', height, border: 'none' }}
        allow="accelerometer; camera; microphone; geolocation; midi; clipboard-write; encrypted-media;"
        allowFullScreen
        title="CodeSandbox Embed"
      />
    </div>
  );
};

export default CodeSandbox;
