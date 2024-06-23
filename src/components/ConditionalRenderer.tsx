import { ReactNode } from 'react';

interface ConditionalRendererProps {
  isShowContent: boolean;
  children: ReactNode;
}

function ConditionalRenderer({ isShowContent, children }: ConditionalRendererProps) {
  return isShowContent ? children : null;
}

export default ConditionalRenderer;
