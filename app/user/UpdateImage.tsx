"use client";

import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
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

  const [scale, setScale] = useState(1.2);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const editorRef = useRef<AvatarEditor>(null);

  // Dropzone - ONLY when image is not being edited
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setSelectedFile(acceptedFiles[0]);
    setPreview(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    disabled: selectedFile !== null, // IMPORTANT: disable when editing
  });

  // Upload cropped image
  async function handleSubmit() {
    if (!selectedFile) return;

    let finalFile = selectedFile;

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/jpeg")
      );
      finalFile = new File([blob], selectedFile.name, { type: "image/jpeg" });
    }

    const arrayBuffer = await finalFile.arrayBuffer();
    const filename = finalFile.name.split(".")[0];

    const rez = await add_picture(arrayBuffer, filename, preview || undefined);

    if (rez.success) {
      setPreview(rez.url || null);
      setSelectedFile(null);
      setMsg("Profile picture updated successfully");
      window.location.reload();
    } else {
      setMsg("Failed to update profile picture");
    }
  }

  // Delete profile picture
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete your profile picture?"))
      return;

    const rez = await delete_picture();

    if (rez.success) {
      setPreview(null);
      setMsg("Profile picture deleted successfully");
      window.location.reload();
    } else {
      setMsg("Failed to delete picture");
    }
  }

  return (
    <>
      <h2 className="text-red-600 mb-2">
        Your profile image will be public and cannot be private!
      </h2>

      {/* IMAGE AREA */}
      <div className="w-40 mx-auto mb-6 flex flex-col items-center justify-center">
        {/* --- STATE 1: EDITING (Avatar Editor) --- */}
        {selectedFile ? (
          <div className="cursor-grab active:cursor-grabbing">
            <AvatarEditor
              ref={editorRef}
              image={URL.createObjectURL(selectedFile)}
              width={200}
              height={200}
              border={0}
              borderRadius={100}
              scale={scale}
              position={position}
              onPositionChange={setPosition}
              className="rounded-full"
            />

            <p className="text-xs text-gray-500 mt-2">
              Drag to reposition the image
            </p>
          </div>
        ) : (
          /* --- STATE 2: DROPZONE (BEFORE UPLOAD) --- */
          <div
            {...getRootProps()}
            className={`w-40 h-40 flex items-center justify-center rounded-full 
              border-2 border-dashed cursor-pointer overflow-hidden transition
              ${
                isDragActive
                  ? "border-slate-500 bg-slate-50"
                  : "border-gray-300 bg-gray-50"
              }`}
          >
            <input {...getInputProps()} />

            {preview ? (
              <CldImage
                src={preview}
                width={200}
                height={200}
                crop="fill"
                gravity="auto"
                radius="max"
                alt="Profile picture"
                quality="auto"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Image
                  src={blankProfile}
                  alt="Blank profile"
                  width={70}
                  height={70}
                  className="mb-2 opacity-60"
                />
                <span className="text-sm">Drag a picture here</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ZOOM SLIDER */}
      {selectedFile && (
        <div className="flex flex-col items-center mb-4">
          <label className="mb-1 text-sm">Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-40"
          />
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-5 items-center">
        <button
          onClick={handleSubmit}
          className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600 transition"
        >
          Submit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>

        {msg && <p className="text-slate-600">{msg}</p>}
      </div>

      <hr className="my-4" />
    </>
  );
}
