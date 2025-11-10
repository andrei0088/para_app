"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import blankProfile from "@/public/blank-profile.png";
import { add_picture, delete_picture } from "./functions";

interface UpdateImageProps {
  currentImage?: string;
}

export default function UpdateImage({ currentImage }: UpdateImageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [msg, setMsg] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  async function handleSubmit() {
    if (!selectedFile) return;

    try {
      // Trimitem arrayBuffer direct către funcția server
      const arrayBuffer = await selectedFile.arrayBuffer();
      const filename = selectedFile.name.split(".")[0];

      const rez = await add_picture(
        arrayBuffer,
        filename,
        preview || undefined
      );

      if (rez.success) {
        setPreview(rez.url || null);
        setSelectedFile(null);
        setMsg("Profile picture updated successfully");
        window.location.reload();
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setMsg("Failed to update profile picture");
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile picture? This action cannot be undone."
    );
    if (!confirmed) return;

    const rez = await delete_picture();
    if (rez.success) {
      setPreview(null);
      setMsg("Profile picture deleted successfully");
      window.location.reload();
    } else {
      setMsg(rez.message || "Failed to delete profile picture");
    }
  }

  return (
    <>
      <h2 className="text-red-600 mb-2">
        Your profile image will be public and cannot be private!
      </h2>

      <div
        {...getRootProps()}
        className={`w-36 h-36 mx-auto mb-6 flex flex-col items-center justify-center rounded-full border-2 border-dashed cursor-pointer overflow-hidden transition-all duration-300
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50 "
              : "border-gray-300 bg-gray-50 "
          }`}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            width={144}
            height={144}
            className="object-cover rounded-full"
          />
        ) : preview ? (
          <CldImage
            src={preview}
            width={200}
            height={200}
            crop="fill"
            gravity="auto"
            alt="Profile picture"
            quality="auto"
            radius="max"
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <Image
              src={blankProfile}
              alt="Blank profile"
              width={64}
              height={64}
              className="mb-2"
            />
            <span className="text-sm">Drag a picture here</span>
          </div>
        )}
      </div>

      <div className="flex gap-5 items-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        {msg && <p className="text-green-600">{msg}</p>}
      </div>

      <hr className="my-4" />
    </>
  );
}
