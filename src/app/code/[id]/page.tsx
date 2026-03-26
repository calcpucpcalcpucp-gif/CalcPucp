import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) {
    return (
      <div className="w-full h-full">
        <Label>Error</Label>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <QRCodeSVG
        value={`admin:${id}`}
        size={200}
        className="mx-auto mb-4"
        bgColor="transparent"
        fgColor="hsl(220,25%,10%)"
      />
    </div>
  );
}
