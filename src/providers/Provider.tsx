import { PropsWithChildren } from 'react';
import QueryProvider from '@/providers/QueryProvider';

const Provider = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Provider;
