import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/common/Container";

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-md rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8">
          <p className="font-semibold tracking-widest text-yellow-400">
            PASSWORD HELP
          </p>
          <h1 className="mt-2 text-4xl font-bold">Reset password</h1>
          {sent ? (
            <p className="mt-6 rounded-xl bg-green-500/10 p-4 text-green-400">
              Reset link sent. This is a demo screen, so no email is actually
              sent.
            </p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="mt-8 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400"
              />
              <button className="mt-5 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black">
                Send Reset Link
              </button>
            </form>
          )}
          <Link
            to="/login"
            className="mt-6 inline-block text-sm text-yellow-400"
          >
            Back to sign in
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default ForgotPassword;
