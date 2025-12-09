"use client";

import { useState } from "react";
import change_password from "./change-password";
import delete_user from "./delete/delete";
import change_name from "./change_name";
import { useRouter } from "next/navigation";
import UpdateImage from "./UpdateImage";

interface UserClientProps {
  initialUser: { name: string; email: string; image?: string } | null;
}

export default function UserClient({ initialUser }: UserClientProps) {
  const router = useRouter(); // 🔹 moved here
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(initialUser?.name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [, setNewPassword] = useState(""); // 🔹 removed unused variable
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Format name (capitalize each word)
  const formatName = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Handle save
  const handleSave = async () => {
    const formattedName = formatName(newName);
    if (!formattedName) return setMessage("Name cannot be empty.");

    setLoading(true);
    setMessage("");

    try {
      const result = await change_name(formattedName);

      if (result.success) {
        setUser((prev) => prev && { ...prev, name: formattedName });
        setEditing(false);
        setMessage("✅ Name updated successfully.");
      } else {
        setMessage(`❌ ${result.message || "Error updating name."}`);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error occurred";
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const handleCancel = () => {
    setNewName(user?.name || "");
    setEditing(false);
    setMessage("");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ Are you absolutely sure you want to delete your account?\n\nThis action is irreversible!"
    );
    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    try {
      const data = await delete_user();

      if (data.success) {
        alert("Your account has been deactivated. Goodbye! 👋");
        window.location.href = "/user/delete";
      } else {
        const errorMsg = data.error
          ? `${data.error}${data.details ? ": " + data.details : ""}`
          : data.message || "Unknown error occurred";
        setMessage(errorMsg);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error occurred";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-red-500">You are not logged in.</p>;

  // Password strength
  const evaluateStrength = (value: string) => {
    let s = 0;
    if (/[A-Z]/.test(value)) s++;
    if (/[a-z]/.test(value)) s++;
    if (/\d/.test(value)) s++;
    if (value.length >= 6) s++;
    setPasswordStrength(s);
  };

  return (
    <div className="w-full dark:text-gray-800 max-w-4xl mx-auto mt-10 p-8 bg-white  shadow-lg rounded-2xl border border-gray-200  transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900  text-center sm:text-left">
        Your setings
      </h1>

      {/* PROFILE IMAGE */}
      <UpdateImage currentImage={user.image} />

      {/* NAME + EMAIL */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-semibold text-gray-700  w-32">Name:</span>
          {editing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 "
            />
          ) : (
            <span className="flex-1 text-gray-900 ">{user.name}</span>
          )}

          <div className="flex gap-2 mt-2 sm:mt-0">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-3 py-1 rounded-lg transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-700 ">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      {/* RESET PASSWORD */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 ">
          Reset Password
        </h2>

        <form
          action={async (formData: FormData) => {
            const result = await change_password(formData);
            setPwMessage(result.message);
          }}
          className="space-y-4"
        >
          {pwMessage && (
            <p className="mt-2 text-center text-sm text-blue-600">
              {pwMessage}
            </p>
          )}

          <input
            type="password"
            name="oldPassword"
            placeholder="Current password"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            required
            onChange={(e) => {
              setNewPassword(e.target.value);
              evaluateStrength(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg  focus:ring-2 focus:ring-blue-400"
          />

          <div className="h-2 w-full bg-gray-200  rounded">
            <div
              className={[
                "h-full rounded transition-all duration-300",
                passwordStrength === 1 && "w-1/4 bg-red-500",
                passwordStrength === 2 && "w-1/2 bg-orange-500",
                passwordStrength === 3 && "w-3/4 bg-yellow-500",
                passwordStrength === 4 && "w-full bg-green-500",
              ]
                .filter(Boolean)
                .join(" ")}
            ></div>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            required
            className="w-full px-3 py-2 border rounded-lg  focus:ring-2 focus:ring-blue-400"
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
            Change Password
          </button>
        </form>
      </div>

      {/* DELETE ACCOUNT */}
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg disabled:opacity-50 transition"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </div>
  );
}
