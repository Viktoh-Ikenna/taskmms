import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef } from "react";

export default function SignIn({ csrfToken }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      username: enteredEmail,
      password: enteredPassword,
    });
    if (result.ok === true) {
      console.log("finished signIn call");
      console.log(result);
      router.push("/");
    } else {
      console.log("error");
    }
  };
  return (
    // <form method="post" action="/api/auth/callback/credentials">

    //   <label>
    //     Username
    //     <input name="username" type="text" />
    //   </label>
    //   <label>
    //     Password
    //     <input name="password" type="password" />
    //   </label>
    //   <button type="submit">Sign in</button>
    // </form>
    <form
      method="post"
      onSubmit={loginHandler}
      action="/api/auth/callback/credentials"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="min-h-screen bg-purple-400 flex justify-center items-center">
        <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer ">
              Login
            </h1>
          </div>
          <div className="space-y-4">
            <input
              name="username"
              ref={emailInputRef}
              type="text"
              placeholder="Email Addres"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <input
              name="password"
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
            >
              Login
            </button>
            <p className="mt-4 text-sm">
              Dont Have an Account yet?{" "}
              <span className="underline cursor-pointer"> Create-Account</span>
            </p>
          </div>
        </div>
        <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </form>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
