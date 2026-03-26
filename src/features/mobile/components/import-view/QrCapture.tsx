import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser";
import { Exception, NotFoundException } from "@zxing/library";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import { useEffect, useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const hasScannedRef = useRef(false);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
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
              if (navigator.vibrate) {
                navigator.vibrate(100);
              }

              onCapture?.(text);
              controlsRef.current?.stop();
            }

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

  // Nueva función para manejar la subida de imagen
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const codeReader = new BrowserQRCodeReader();

    try {
      const result = await codeReader.decodeFromImageUrl(imageUrl);

      if (result && !hasScannedRef.current) {
        hasScannedRef.current = true;
        const text = result.getText();

        if (navigator.vibrate) {
          navigator.vibrate(100);
        }

        onCapture?.(text);
        controlsRef.current?.stop(); // Detenemos la cámara si la imagen es exitosa
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Puedes manejar esto con un toast o una alerta si el QR no se detecta en la imagen
        console.warn("No se encontró un código QR en la imagen.");
      }
      onError?.(error);
    } finally {
      // Limpiamos la URL para evitar fugas de memoria
      URL.revokeObjectURL(imageUrl);
      // Reseteamos el input por si el usuario quiere subir la misma imagen de nuevo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>

        {/* Botón para activar el input de archivo */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ImageIcon className="w-4 h-4" /> Subir QR
        </button>

        {/* Input oculto */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="relative flex-1 rounded-xl overflow-hidden bg-black border-2 border-primary">
        <video ref={videoRef} className="w-full h-full object-cover" />
        <div className="absolute inset-0 border-40 border-black/40 pointer-events-none flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white/50 rounded-lg" />
        </div>
      </div>

      <p className="text-center mt-4 text-sm text-muted-foreground">
        Apunta tu cámara al código QR del curso o sube una imagen
      </p>
    </div>
  );
};
