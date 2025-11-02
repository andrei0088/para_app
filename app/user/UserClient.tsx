"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import blankProfile from "@/public/blank-profile.png";
import change_password from "./change-password";
import delete_user from "./delete/delete";
import change_name from "./change_name"; // ✅ IMPORTAT
import { useRouter } from "next/navigation";

interface UserClientProps {
  initialUser: { name: string; email: string; image?: string } | null;
}

export default function UserClient({ initialUser }: UserClientProps) {
  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(initialUser?.name || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // ✅ FORMATĂM NUMELE (fiecare cuvânt Capitalize)
  const formatName = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Upload imagine
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) setProfileImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // ✅ HANDLE SAVE modificat să trimită la server + capitalize
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
    } catch (err: any) {
      setMessage(`❌ ${err?.message || "Unexpected error occurred"}`);
    } finally {
      setLoading(false);
      const router = useRouter();

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
    } catch (err: any) {
      setMessage(err?.message || "Unexpected error occurred");
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
    <div className="w-full max-w-3xl mx-auto mt-10 p-8 bg-white shadow-md rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* PROFILE IMAGE */}
      <div
        {...getRootProps()}
        className={`w-36 h-36 mx-auto mb-6 flex flex-col items-center justify-center rounded-full border-2 border-dashed cursor-pointer overflow-hidden transition
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}`}
      >
        <input {...getInputProps()} />

        {profileImage ? (
          <Image src={URL.createObjectURL(profileImage)} alt="Preview" width={144} height={144} className="object-cover rounded-full" />
        ) : user.image ? (
          <Image src={user.image} alt="Profile" width={144} height={144} className="object-cover rounded-full" />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <Image src={blankProfile} alt="Blank profile" width={64} height={64} className="mb-2" />
            <span className="text-sm">Drag a picture here</span>
          </div>
        )}
      </div>

      {/* NAME + EMAIL */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700 w-32">Name:</span>

          {editing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span className="flex-1">{user.name}</span>
          )}

          {editing ? (
            <>
              <button onClick={handleSave} disabled={loading} className="bg-green-500 text-white px-3 py-1 rounded">
                Save
              </button>
              <button onClick={handleCancel} className="bg-gray-300 px-3 py-1 rounded">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
              Edit
            </button>
          )}
        </div>

        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      {/* RESET PASSWORD (identic, nu am modificat nimic) */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>

        <form
          action={async (formData) => {
            const result = await change_password(formData);
            setPwMessage(result.message);
          }}
          className="space-y-4"
        >
          {pwMessage && <p className="mt-2 text-center text-sm text-blue-600">{pwMessage}</p>}

          <input type="password" name="oldPassword" placeholder="Current password" required className="w-full px-3 py-2 border rounded-lg" />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            required
            onChange={(e) => {
              setNewPassword(e.target.value);
              evaluateStrength(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              className={[
                "h-full rounded transition-all",
                passwordStrength === 1 && "w-1/4 bg-red-500",
                passwordStrength === 2 && "w-1/2 bg-orange-500",
                passwordStrength === 3 && "w-3/4 bg-yellow-500",
                passwordStrength === 4 && "w-full bg-green-500",
              ]
                .filter(Boolean)
                .join(" ")}
            ></div>
          </div>

          <input type="password" name="confirmPassword" placeholder="Confirm new password" required className="w-full px-3 py-2 border rounded-lg" />

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Change Password</button>
        </form>
      </div>

      {/* DELETE */}
      <button
        onClick={handleDeleteAccount}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </div>
  );
}
