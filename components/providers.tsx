import { ReactNode } from 'react';
import { AssistantProvider } from '@/context/AssistantContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AssistantProvider>
      {children}
    </AssistantProvider>
  );
}
