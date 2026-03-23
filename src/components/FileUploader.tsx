import React, { useRef } from 'react';
import { Upload, X, FileType } from 'lucide-react';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';

interface FileUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ label, value, onChange, icon, placeholder }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split('.').pop()?.toLowerCase();

    try {
      if (extension === 'docx') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        onChange(result.value);
      } else if (extension === 'xlsx' || extension === 'xls') {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        let fullText = '';
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const csv = XLSX.utils.sheet_to_csv(worksheet);
          fullText += `--- Sheet: ${sheetName} ---\n${csv}\n\n`;
        });
        onChange(fullText.trim());
      } else {
        // Fallback for text files
        const reader = new FileReader();
        reader.onload = (event) => {
          onChange(event.target?.result as string);
        };
        reader.readAsText(file);
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      alert(`Failed to parse ${extension?.toUpperCase()} file. Please ensure it is not corrupted.`);
    }
    
    // Reset input so the same file can be uploaded again if cleared
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          {icon} {label}
        </label>
        {value && (
          <button 
            onClick={() => onChange('')}
            className="text-[10px] text-rose-500 hover:text-rose-600 flex items-center gap-1 font-bold uppercase"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>
      
      <div 
        className={`relative group border-2 border-dashed rounded-xl transition-all duration-200 min-h-[120px] flex flex-col ${
          value ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-200 hover:border-indigo-400 bg-white'
        }`}
      >
        {value ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-4 text-sm font-mono bg-transparent border-none focus:ring-0 resize-none min-h-[120px]"
          />
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-4 text-center"
          >
            <Upload className="text-slate-300 mb-2 group-hover:text-indigo-500 transition-colors" size={24} />
            <p className="text-xs text-slate-400 group-hover:text-slate-600">
              Click to upload Word, Excel, or Text
            </p>
            <p className="text-[10px] text-slate-300 mt-1">.docx, .xls, .xlsx, .txt, .md</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".txt,.md,.json,.csv,.docx,.xls,.xlsx"
        />
      </div>
    </div>
  );
};
