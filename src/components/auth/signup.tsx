'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {eye, eyeOff, google, logo} from '@/assets/images';

export default function Signup() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function signUp(formData: {email: string; password: string}) {
    const {error} = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg(
        'Success! Please check your email for further instructions.',
      );
    }

    router.push('/');
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 md:pt-28 mx-auto max-w-[480px] px-4 lg:px-0">
      <Image alt="logo" src={logo} width={118} height={26} priority />
      <h1 className="mt-8 text-md text-center font-medium">
        Create a free account
      </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = {
            email: (
              e.currentTarget.elements.namedItem('email') as HTMLInputElement
            ).value,
            password: (
              e.currentTarget.elements.namedItem('password') as HTMLInputElement
            ).value,
          };
          signUp(formData);
        }}
        className="mt-8 flex flex-col gap-8 w-full"
      >
        <button
          type="button"
          className="bg-grey flex items-center justify-center gap-4 text-sm font-bold h-12 rounded transition-all duration-300 outline outline-1 outline-grey-900 hover:outline-white focus:outline-white focus:bg-grey-950 active:bg-grey-950"
        >
          <Image
            alt="google icon"
            src={google}
            width={24}
            height={24}
            priority
          />
          <span>Sign up with Google</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-full h-[1px] bg-grey-900" />
          <p className="text-sm font-medium">or</p>
          <div className="w-full h-[1px] bg-grey-900" />
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="email" className="flex flex-col gap-2">
            Email
            <input
              id="email"
              type="email"
              aria-label="Email"
              required
              data-auth
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2 relative">
            Password
            <input
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              aria-label="Password"
              required
              data-auth
            />
            <button
              type="button"
              title="View/Hide password"
              className="w-6 h-6 absolute right-4 bottom-3"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Image
                alt={isPasswordVisible ? 'Hide password' : 'View password'}
                src={isPasswordVisible ? eye : eyeOff}
                width={24}
                height={24}
              />
            </button>
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary flex items-center justify-center gap-4 text-sm font-bold h-12 rounded transition-all duration-300 outline outline-1 outline-primary hover:outline-primary-900 focus:outline-primary-900 active:bg-primary-900"
        >
          Sign up
        </button>
      </form>
      {errorMsg && <div className="text-danger">{errorMsg}</div>}
      {successMsg && <div className="text-black">{successMsg}</div>}
      <p className="mt-4 text-semi-sm">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
