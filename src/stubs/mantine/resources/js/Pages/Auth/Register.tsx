import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Anchor, Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Register" />

      <form onSubmit={onSubmit}>
        <div>
          <TextInput
            id="name"
            label="Name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            error={form.errors.name}
            onChange={e => form.setData('name', e.currentTarget.value)}
            required
            autoFocus
          />
        </div>

        <div className="mt-4">
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
        </div>

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

        <div className="mt-4">
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
        </div>

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <Checkbox
              name="terms"
              label={
                <>
                  I agree to the
                  <Anchor href={route('terms.show')} target="_blank" inherit>
                    Terms of Service
                  </Anchor>
                  and
                  <Anchor href={route('policy.show')} target="_blank" inherit>
                    Privacy Policy
                  </Anchor>
                </>
              }
              size='md'
              checked={form.data.terms}
              onChange={(event) => form.setData('terms', event.currentTarget.checked)}
            />
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Already registered?
          </Link>

          <Button
            variant='filled'
            className='ml-4'
            type='submit'
            loading={form.processing}
          >
            Register
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
