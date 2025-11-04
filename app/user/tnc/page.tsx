"use client";

export default function TermsPage() {

  const termsText = `Para APP (created by Paragliding High) — Terms & Conditions

Effective Date: [Insert Date]

Welcome to Para APP. By creating an account and using our services, you agree to the following Terms and Conditions. If you do not agree, do not create an account or use the app.

1. Acceptance of Terms
By registering and using Para APP, you agree to comply with these Terms and Conditions and our Privacy Policy. These terms apply to all users, visitors, and account holders.

2. Account Responsibilities
- You are responsible for keeping your login credentials secure.
- You must provide accurate and valid information.
- You are fully responsible for any activity performed through your account.

3. Content Ownership
- You retain ownership of content you create.
- Para APP may use your content only to provide core functionality of the app.
- You agree not to upload illegal, harmful, or abusive content.

4. Privacy & Data Protection
- We take appropriate steps to protect your data, but we cannot guarantee absolute security.
- Para APP is not liable for unauthorized access, data loss, or service interruption.
- Your data may be processed in accordance with applicable data laws.

5. Limitation of Liability
Para APP and Paragliding High are not responsible for:
- Data loss or data leakage
- Account compromise due to weak passwords
- Service disruptions or outages
- Any indirect or consequential damages

6. Termination
We may suspend or terminate accounts that violate these Terms.

7. Changes to Terms
We may update these Terms at any time. Continued use means acceptance.

By proceeding, you confirm that you have read and agree to the Terms & Conditions.`;

  const handleContinue = () => {
    window.location.href = "/user/register";
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Title */}
      <header className="p-6 pb-2">
        <h1 className="text-3xl font-semibold">Para APP — Terms & Conditions</h1>
        <p className="text-sm text-gray-500">created by Paragliding High</p>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4 text-[15px] leading-relaxed whitespace-pre-wrap">
        {termsText}
      </main>

      {/* Bottom Button */}
      <footer className="p-6 border-t flex justify-center">
        <button
          onClick={handleContinue}
          className="px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition text-lg"
        >
          Continue
        </button>
      </footer>

    </div>
  );
}
