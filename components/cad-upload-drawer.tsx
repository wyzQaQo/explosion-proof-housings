"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Upload,
  FileImage,
  Lock,
  Shield,
  HardDrive,
  Paperclip,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CADUploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

const ACCEPTED_FORMATS = ".step,.stp,.dwg,.dxf,.iges,.igs,.stl,.pdf";
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function CADUploadDrawer({
  isOpen,
  onClose,
  productName,
}: CADUploadDrawerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [projectCountry, setProjectCountry] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      const isAccepted = ACCEPTED_FORMATS.split(",").includes(ext);
      const isSizeValid = file.size <= MAX_FILE_SIZE;
      return isAccepted && isSizeValid;
    });
    setFiles((prev) => [...prev, ...validFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0 || !email) return;

    setIsSubmitting(true);

    // Simulate upload + API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFiles([]);
      setCompany("");
      setEmail("");
      setProjectCountry("");
      setMessage("");
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col border-l border-white/[0.06] bg-zinc-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10">
                  <HardDrive className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="font-mono text-sm font-bold tracking-wider text-zinc-100">
                    CAD PROJECT SUBMISSION
                  </h2>
                  {productName && (
                    <p className="font-mono text-[10px] text-zinc-500">
                      Custom bracket request for {productName}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded border border-white/[0.06] text-zinc-400 transition-colors hover:text-zinc-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10"
                >
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </motion.div>
                <h3 className="font-mono text-lg font-bold tracking-wider text-zinc-100">
                  PROJECT SUBMITTED
                </h3>
                <p className="max-w-sm text-center font-mono text-xs leading-relaxed text-zinc-400">
                  Your CAD files and project details have been securely received.
                  Our engineering team will review your requirements and respond
                  within <span className="text-amber-500">12 business hours</span>.
                  Check your inbox for a confirmation with your project reference.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex-1 space-y-6 px-6 py-6">
                  {/* Upload Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-10 transition-all duration-300",
                      isDragging
                        ? "border-amber-500/50 bg-amber-500/[0.04]"
                        : "border-white/[0.08] hover:border-amber-500/20 hover:bg-amber-500/[0.02]"
                    )}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={ACCEPTED_FORMATS}
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleFiles(Array.from(e.target.files))
                      }
                    />
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02]">
                      <Upload className="h-7 w-7 text-zinc-500" />
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-xs font-semibold tracking-wider text-zinc-300">
                        DRAG YOUR CAD FILES HERE
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-500">
                        .STEP .STP .DWG .DXF .IGES .STL .PDF
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-zinc-600">
                        Max 50MB per file &middot; Up to 5 files
                      </p>
                    </div>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded border border-white/[0.06] bg-white/[0.01] px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <FileImage className="h-4 w-4 text-zinc-500" />
                            <div>
                              <p className="font-mono text-xs text-zinc-300">
                                {file.name}
                              </p>
                              <p className="font-mono text-[10px] text-zinc-600">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="flex h-6 w-6 items-center justify-center rounded text-zinc-600 transition-colors hover:text-red-400"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">
                          COMPANY NAME *
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          required
                          placeholder="Your company or organization"
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">
                          EMAIL *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="engineering@company.com"
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">
                        PROJECT COUNTRY
                      </label>
                      <input
                        type="text"
                        value={projectCountry}
                        onChange={(e) => setProjectCountry(e.target.value)}
                        placeholder="Where will the equipment be deployed?"
                        className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">
                        PROJECT DETAILS
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your camera model, mounting requirements, or any special environmental conditions..."
                        className="w-full resize-none rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                      />
                    </div>
                  </div>

                  {/* Security Badges */}
                  <div className="rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02] px-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-emerald-400">
                        SECURE 256-BIT TLS ENCRYPTED CHANNEL
                      </span>
                    </div>
                    <p className="font-mono text-[10px] leading-relaxed text-zinc-500">
                      Uploaded files are transmitted over an encrypted channel and stored on
                      partitioned, access-controlled cloud storage. We are prepared to sign a mutual
                      Non-Disclosure Agreement (NDA) before quotation. Your CAD data is never shared
                      with third parties and is used exclusively for your custom bracket quotation.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.06] px-6 py-4">
                  <Button
                    type="submit"
                    disabled={files.length === 0 || !email || isSubmitting}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        UPLOADING & ENCRYPTING...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        SUBMIT PROJECT REQUEST
                      </>
                    )}
                  </Button>
                  <p className="mt-2 text-center font-mono text-[10px] text-zinc-600">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="text-zinc-500 underline underline-offset-2 hover:text-zinc-400">
                      Privacy Policy
                    </a>
                    . We&apos;ll never share your data.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
