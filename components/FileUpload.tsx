import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'}`}
    >
      <input {...getInputProps()} />
      <Upload
        className={`w-16 h-16 mx-auto mb-6 ${isDragActive ? 'text-primary' : 'text-gray-400'}`}
      />
      <p className="text-xl font-medium text-gray-900">
        {isDragActive
          ? 'Drop your CSV file here'
          : 'Drag & drop your CSV file here'}
      </p>
      <p className="mt-2 text-sm text-gray-600">or click to select a file</p>
    </div>
  );
}
