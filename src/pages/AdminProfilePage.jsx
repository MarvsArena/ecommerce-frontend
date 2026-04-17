import { useState } from "react";

import { MailIcon, PencilSquareIcon, ShieldIcon, UserCircleIcon } from "../components/Icons";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../context/AuthContext";

const AdminProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setFeedback("");

    try {
      const updatedUser = await updateProfile({
        name: form.name,
        email: form.email,
        ...(form.password ? { password: form.password } : {}),
      });

      setForm({
        name: updatedUser.name,
        email: updatedUser.email,
        password: "",
      });
      setFeedback("Admin profile updated successfully.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update admin profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="luxury-panel p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
            <UserCircleIcon className="h-8 w-8" />
          </div>
          <div>
            <p className="font-display text-3xl text-slate-950 dark:text-white">{user?.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.28em] text-brand-gold/80">Administrator</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="surface-card p-4">
            <div className="flex items-center gap-3 text-slate-950 dark:text-white">
              <MailIcon className="h-4 w-4 text-brand-gold" />
              <span>{user?.email}</span>
            </div>
          </div>
          <div className="surface-card p-4">
            <div className="flex items-center gap-3 text-slate-950 dark:text-white">
              <ShieldIcon className="h-4 w-4 text-brand-gold" />
              <span>Admin-level access to products, orders, and settings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="luxury-panel p-7">
        <div className="flex items-center gap-3">
          <PencilSquareIcon className="h-5 w-5 text-brand-gold" />
          <h2 className="font-display text-3xl text-slate-950 dark:text-white">Update Admin Profile</h2>
        </div>
        <p className="mt-3 text-slate-600 dark:text-white/60">
          Keep your admin account current so order and inventory management stay secure and accurate.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label>
            <span className="field-label">Full Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="input-field"
              required
            />
          </label>

          <label>
            <span className="field-label">Email Address</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="input-field"
              required
            />
          </label>

          <PasswordField
            label="New Password"
            value={form.password}
            onChange={(event) => handleChange("password", event.target.value)}
            placeholder="Leave blank to keep your current password"
            hint="Leave this empty if you do not want to change the password."
          />

          {error && <div className="alert-error">{error}</div>}
          {feedback && <div className="alert-success">{feedback}</div>}

          <button type="submit" disabled={saving} className="button-primary justify-center disabled:opacity-60">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfilePage;
