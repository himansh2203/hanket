import "../style/ForgetPassword.css";

import React, { useState, useEffect } from "react"; // make sure this path matches where you saved the CSS file

/**
 * ForgotPassword.jsx
 * - Plain React (no Tailwind, no external libs)
 * - Uses the isolated CSS file `premium-forgot-password.css` created earlier
 * - 2-step flow: request reset (email) -> verify OTP & set new password
 * - Replace mockApi with your real API endpoints
 */

// --- Mock API (replace with your backend) ---
const mockApi = {
  requestReset: async (email) => {
    await new Promise((r) => setTimeout(r, 800));
    if (!email || !email.includes("@"))
      throw new Error("Please enter a valid email address.");
    return { ok: true, resetToken: "demo-reset-token" };
  },
  verifyOtpAndReset: async ({ token, otp, newPassword }) => {
    await new Promise((r) => setTimeout(r, 800));
    if (otp !== "123456") throw new Error("Invalid OTP. (demo OTP is 123456)");
    if (!newPassword || newPassword.length < 8)
      throw new Error("Password must be 8+ characters.");
    return { ok: true };
  },
};

export default function ForgotPassword() {
  const [step, setStep] = useState("email"); // email | otp | done
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resetToken, setResetToken] = useState(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // clear messages when step changes
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const passwordScore = (pw) => {
    let score = 0;
    if (!pw) return 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0..4
  };

  const handleRequestReset = async (e) => {
    e && e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await mockApi.requestReset(email.trim());
      if (res.ok) {
        setResetToken(res.resetToken);
        setSuccess("Reset code sent to your email. (demo OTP: 123456)");
        setStep("otp");
      }
    } catch (err) {
      setError(err.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e) => {
    e && e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await mockApi.verifyOtpAndReset({
        token: resetToken,
        otp: otp.trim(),
        newPassword,
      });
      if (res.ok) {
        setSuccess(
          "Password reset successful. You can now sign in with your new password."
        );
        setStep("done");
      }
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setEmail("");
    setOtp("");
    setNewPassword("");
    setError("");
    setSuccess("");
    setResetToken(null);
    setStep("email");
  };

  return (
    <div className="forgot-wrapper">
      <div
        className="forgot-card"
        role="region"
        aria-label="Forgot password form"
      >
        <h2 className="forgot-title">Forgot Password</h2>
        <div className="forgot-subtitle">
          Enter your email to receive a one-time code to reset your password.
        </div>

        {error && (
          <div className="msg-error" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="msg-success" role="status">
            {success}
          </div>
        )}

        {step === "email" && (
          <form onSubmit={handleRequestReset} className="email-form">
            <label className="forgot-label">Email address</label>
            <input
              className="forgot-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              aria-label="Email address"
            />

            <button className="forgot-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send reset code"}
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="forgot-clear-btn"
            >
              Clear
            </button>

            <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
              Tip: Check your spam folder if you don't see the email.
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyAndReset} className="otp-form">
            <label className="forgot-label">Enter OTP</label>
            <input
              className="forgot-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="6-digit code"
              required
            />

            <label className="forgot-label" style={{ marginTop: 10 }}>
              New password
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="forgot-input"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a strong password"
                minLength={8}
                required
                aria-label="New password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div style={{ marginTop: 8 }}>
              <div className="strength-bar" aria-hidden>
                <div
                  className="strength-fill"
                  style={{
                    width: `${(passwordScore(newPassword) / 4) * 100}%`,
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                Use 8+ characters, mix uppercase, numbers & symbols.
              </div>
            </div>

            <button
              className="forgot-btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: 12 }}
            >
              {loading ? "Verifying..." : "Verify & Reset"}
            </button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="back-btn"
            >
              Back
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="done-box">
            <h3>All set — password updated</h3>
            <p>You can now sign in with your new password.</p>

            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <a
                href="/login"
                className="forgot-btn"
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                Back to Sign in
              </a>
              <button
                className="forgot-clear-btn"
                onClick={clearAll}
                style={{ flex: 1 }}
              >
                Reset another
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, fontSize: 12, color: "#9ca3af" }}>
          Secure reset — handled server-side.
        </div>
      </div>
    </div>
  );
}
