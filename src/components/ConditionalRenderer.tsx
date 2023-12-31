import React, { ReactNode } from 'react';

interface ConditionalRendererProps {
  isShowContent: boolean;
  children: ReactNode;
}

const ConditionalRenderer: React.FC<ConditionalRendererProps> = ({ isShowContent, children }) => {
  return isShowContent ? <>{children}</> : null;
};

export default ConditionalRenderer;
