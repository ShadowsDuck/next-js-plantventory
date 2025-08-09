"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { useState } from "react";

interface imageUploadProps {
  uploadedImageUrl: string;
  handleImageUpload: (url: string) => void;
  handleRemoveImage: () => void;
  setIsUploading: (uploading: boolean) => void;
}

export default function ImageUpload({
  uploadedImageUrl,
  handleImageUpload,
  handleRemoveImage,
  setIsUploading,
}: imageUploadProps) {
  return (
    <div className="space-y-4">
      {uploadedImageUrl ? (
        <div className="relative">
          <img
            src={uploadedImageUrl}
            alt="Uploaded plant"
            className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <UploadDropzone
            endpoint="PostImage"
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                handleImageUpload(res[0].ufsUrl);
              }
              setIsUploading(false);
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload error: ${error.message}`);
              setIsUploading(false);
            }}
            onUploadBegin={() => {
              setIsUploading(true);
            }}
            className="w-full"
          />
          <div className="text-center mt-2">
            <span className="text-sm text-gray-500">or</span>
          </div>
          <div className="flex justify-center mt-2">
            <UploadButton
              endpoint="PostImage"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  handleImageUpload(res[0].ufsUrl);
                }
                setIsUploading(false);
              }}
              onUploadError={(error: Error) => {
                toast.error(`Upload error: ${error.message}`);
                setIsUploading(false);
              }}
              onUploadBegin={() => {
                setIsUploading(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
