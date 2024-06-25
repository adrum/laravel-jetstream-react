import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, PasswordInput, TextInput } from '@mantine/core';

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <PasswordInput
          id="password"
          type="password"
          label={"Password"}
          className="mt-1 block w-full"
          value={form.data.password}
          error={form.errors.password}
          onChange={e => form.setData('password', e.currentTarget.value)}
          required
          autoComplete="current-password"
          autoFocus
        />

        <div className="flex justify-end mt-4">
          <Button
            type='submit'
            variant='filled'
            loading={form.processing}
          >
            Confirm
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
