import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import { Button, TextInput } from '@mantine/core';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });
  const recoveryCodeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  function toggleRecovery(e: React.FormEvent) {
    e.preventDefault();
    const isRecovery = !recovery;
    setRecovery(isRecovery);

    setTimeout(() => {
      if (isRecovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('two-factor.login'));
  }

  return (
    <AuthenticationCard>
      <Head title="Two-Factor Confirmation" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {recovery
          ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
          : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'}
      </div>

      <form onSubmit={onSubmit}>
        {recovery ? (
          <TextInput
            id="recovery_code"
            label="Recovery Code"
            type="text"
            className="mt-1 block w-full"
            value={form.data.recovery_code}
            error={form.errors.recovery_code}
            onChange={e => form.setData('recovery_code', e.currentTarget.value)}
            required
            autoFocus
            ref={recoveryCodeRef}
          />
        ) : (
          <TextInput
            id="code"
            label="Code"
            type="text"
            className="mt-1 block w-full"
            value={form.data.code}
            error={form.errors.code}
            onChange={e => form.setData('code', e.currentTarget.value)}
            required
            autoFocus
            ref={codeRef}
            autoComplete="one-time-code"
          />
        )}

        <div className="flex items-center justify-end mt-4">
          <button
            type="button"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"
            onClick={toggleRecovery}
          >
            {recovery ? 'Use an authentication code' : 'Use a recovery code'}
          </button>

          <Button
            type='submit'
            variant='filled'
            loading={form.processing}
          >
            Log in
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}
