import { Toaster } from '~/components/ui/toast';

export function ThemeProvider(props: React.PropsWithChildren) {
  return (
    <>
      <Toaster />
      {props.children}
    </>
  );
}
