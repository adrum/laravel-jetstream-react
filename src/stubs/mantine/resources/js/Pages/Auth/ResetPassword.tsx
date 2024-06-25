import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, PasswordInput, TextInput } from '@mantine/core';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Reset Password" />

      <form onSubmit={onSubmit}>
        <TextInput
          id="email"
          type="email"
          label="Email"
          className="mt-1 block w-full"
          value={form.data.email}
          error={form.errors.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
          required
          autoFocus
        />

        <PasswordInput
          id="password"
          type="password"
          label="Password"
          className="mt-1 block w-full"
          value={form.data.password}
          error={form.errors.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          required
          autoComplete="new-password"
        />

        <PasswordInput
          id="password_confirmation"
          type="password"
          label="Confirm Password"
          className="mt-1 block w-full"
          value={form.data.password_confirmation}
          error={form.errors.password_confirmation}
          onChange={e =>
            form.setData('password_confirmation', e.currentTarget.value)
          }
          required
          autoComplete="new-password"
        />

        <div className="flex items-center justify-end mt-4">
          <Button
            type='submit'
            variant='filled'
            loading={form.processing}
          >
            Reset Password
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
