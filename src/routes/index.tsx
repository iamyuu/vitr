import { createFileRoute } from '@tanstack/react-router';
import { Button, FormField, Input, cardStyles, toast } from 'ui';
import { z } from 'zod';
import { useForm } from '~/hooks/use-form';

const schema = z.object({
  id: z.string(),
  username: z.string().min(3),
  password: z.string().min(8),
});

function SimpleForm() {
  const form = useForm({ schema });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);

    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: 'Creating event...',
      success: 'Event has been created',
      error: 'Event has not been created',

      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  });

  return (
    <form className={cardStyles().root({ class: 'm-4' })} onSubmit={onSubmit}>
      <FormField label="ID" {...form.getFieldProps('id')}>
        <Input />
      </FormField>

      <FormField label="Username" description="Should be unique" {...form.getFieldProps('username')}>
        <Input startAdornment="@" />
      </FormField>

      <FormField label="Password" {...form.getFieldProps('password')}>
        <Input
          type="password"
          endAdornment={
            <Button appearance="ghost" size="tiny" tone="neutral">
              <span className="i-ph:eye" />
            </Button>
          }
        />
      </FormField>

      <Button {...form.getButtonSubmitProps()}>Submit</Button>
    </form>
  );
}

export const Route = createFileRoute('/')({
  component: SimpleForm,
});
