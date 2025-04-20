
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload as UploadIcon, FileText as FileTextIcon, Loader2 } from "lucide-react";

interface PDFUploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
}

const PDFUploader = ({ onUpload, isProcessing }: PDFUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-cv-blue">Upload Your CV</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-cv-blue bg-blue-50" : "border-gray-300"
          } transition-colors`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-3">
              <FileTextIcon className="w-12 h-12 mx-auto text-cv-blue" />
              <p className="text-lg font-medium">{selectedFile.name}</p>
              <p className="text-sm text-cv-gray">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <UploadIcon className="w-12 h-12 mx-auto text-cv-gray" />
              <p className="text-lg font-medium">Drag & drop your CV here</p>
              <p className="text-sm text-cv-gray">or click to browse</p>
            </div>
          )}
          <Input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="cv-upload"
          />
          <label htmlFor="cv-upload">
            <Button 
              variant="outline" 
              className="mt-4 cursor-pointer"
              onClick={() => document.getElementById("cv-upload")?.click()}
              disabled={isProcessing}
            >
              Select PDF File
            </Button>
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedFile || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Analyze My CV"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PDFUploader;
