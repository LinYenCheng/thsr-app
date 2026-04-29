import { ComponentChildren } from 'preact';

interface ConditionalRendererProps {
  isShowContent: boolean;
  children: ComponentChildren;
}

function ConditionalRenderer({ isShowContent, children }: ConditionalRendererProps) {
  return isShowContent ? (children as any) : null;
}

export default ConditionalRenderer;
