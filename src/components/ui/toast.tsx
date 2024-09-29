import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps) {
  return <Sonner theme="light" closeButton={false} richColors position="top-center" {...props} />;
}

export { toast } from 'sonner';
