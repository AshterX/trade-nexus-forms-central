
import React, { useRef } from "react";
import { FilePlus, FileText } from "lucide-react";

interface DocumentUploadProps {
  label?: string;
  onFileChange: (file: File | null) => void;
  value: File | null;
  accept?: string;
  error?: string;
}

export function DocumentUpload({ label = "Upload Document", onFileChange, value, accept, error }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      onFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <label
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer p-6 bg-white hover:bg-gray-50 transition ${error ? "border-red-500" : "border-gray-300"}`}
        tabIndex={0}
      >
        <FilePlus size={32} className="text-violet-500 mb-2" />
        <span className="font-medium text-gray-700 mb-1">{label}</span>
        <span className="text-xs text-gray-500 mb-2">(PDF, JPG, PNG)</span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept ?? ".pdf,.jpg,.jpeg,.png"}
          onChange={handleFileChange}
        />
        {value && (
          <div className="flex items-center mt-2 text-gray-600">
            <FileText size={18} className="mr-1" />
            <span className="truncate max-w-[150px]">{value.name}</span>
          </div>
        )}
      </label>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
}
