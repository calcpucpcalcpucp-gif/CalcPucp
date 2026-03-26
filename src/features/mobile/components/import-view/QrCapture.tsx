import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { Exception, NotFoundException } from "@zxing/library";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const QrCapture = ({
  onBack,
  onError,
  onCapture,
}: {
  onBack?: () => void;
  onError?: (e: Exception | unknown) => void;
  onCapture?: (text: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const hasScannedRef = useRef(false); // 🔥 evitar múltiples lecturas

  // 🔐 pedir permiso explícito
  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // 📱 cámara trasera
      });

      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch (err) {
      onError?.(err);
      return false;
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const codeReader = new BrowserQRCodeReader();

    const startScanner = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      try {
        const controls = await codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current!,
          (result, error) => {
            if (result && !hasScannedRef.current) {
              hasScannedRef.current = true;

              const text = result.getText();

              // 🔥 vibración en móvil
              if (navigator.vibrate) {
                navigator.vibrate(100);
              }

              onCapture?.(text);

              // 🛑 detener cámara después de escanear
              controlsRef.current?.stop();
            }

            // ⚠️ ignorar error típico de "no encontró QR"
            if (error && !(error instanceof NotFoundException)) {
              onError?.(error);
            }
          },
        );

        controlsRef.current = controls;
      } catch (err) {
        onError?.(err);
      }
    };

    startScanner();

    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-50 p-6 flex flex-col">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>

      <div className="relative flex-1 rounded-xl overflow-hidden bg-black border-2 border-primary">
        <video ref={videoRef} className="w-full h-full object-cover" />
        <div className="absolute inset-0 border-40 border-black/40 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white/50 rounded-lg" />
        </div>
      </div>
      <p className="text-center mt-4 text-sm text-muted-foreground">
        Apunta tu cámara al código QR del curso
      </p>
    </div>
  );
};
