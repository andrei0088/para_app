// app/user/forgot-password/page.tsx
import ForgotPasswordForm from "./ForgotPasswordForm";
import { sendResetEmail } from "./actions";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
           Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        <ForgotPasswordForm sendResetEmail={sendResetEmail} />
      </div>
    </div>
  );
}
