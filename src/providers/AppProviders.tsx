import { PropsWithChildren } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { PortalHost } from '@rn-primitives/portal';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
      <PortalHost />
    </ThemeProvider>
  );
}
