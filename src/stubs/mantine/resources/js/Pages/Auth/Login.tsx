import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="login" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <TextInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          error={form.errors.email}
          label="Email"
          onChange={e => form.setData('email', e.currentTarget.value)}
          required
          autoFocus
        />

        <div className="mt-4">
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
        </div>

        <div>

          <Checkbox
            name="remember"
            label="Remember me"
            checked={form.data.remember === 'on'}
            onChange={e =>
              form.setData('remember', e.currentTarget.checked ? 'on' : '')
            }
          />
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 mt-4">
          {canResetPassword && (
            <div>
              <Link
                href={route('password.request')}
                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              >
                Forgot your password?
              </Link>
            </div>
          )}

          <div className="flex items-center justify-end">
            <Link
              href={route('register')}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Need an account?
            </Link>

            <Button
              type='submit'
              variant='filled'
              className='ml-4'
              loading={form.processing}
            >
              Log in
            </Button>
          </div>
        </div>
      </form>
    </AuthenticationCard >
  );
}
