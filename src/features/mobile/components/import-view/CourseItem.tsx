"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { Pencil, Plus, QrCode, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

export const CourseItem = ({
  name,
  code,
  shareCode,
  onAdd,
  onEdit,
  onDelete,
  admin,
}: {
  name: string;
  code: string;
  shareCode: string;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  admin?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const handleDelete = () => {
    onDelete?.();
    setIsOpen(false);
  };

  return (
    <Item variant="outline" className="min-w-0">
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{code}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10"
          onClick={(e) => {
            e.stopPropagation();
            setIsQrOpen(true);
          }}
        >
          <QrCode className="min-w-5 min-h-5" />
        </Button>
        {admin ? (
          <>
            <Button variant="outline" className="w-10 h-10" onClick={onEdit}>
              <Pencil className="min-w-5 min-h-5" />
            </Button>
            <Button
              variant="destructive"
              className="w-10 h-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              <Trash className="min-w-5 min-h-5 stroke-red-400" />
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10"
            onClick={onAdd}
          >
            <Plus className="min-w-6 min-h-6" />
          </Button>
        )}

        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent
            onClick={(e) => e.stopPropagation()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Eliminará el curso <strong>{name}</strong>. Esta acción no se
                puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDelete}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
          <DialogContent
            onClick={(e) => e.stopPropagation()}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-center">
                Código QR del Curso
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-6 gap-4">
              <p className="text-sm text-muted-foreground text-center">
                Escanea este código para acceder a <strong>{name}</strong>
              </p>
              <QRCodeSVG
                value={`share-code:${shareCode}`}
                size={180}
                className="mx-auto mb-4"
                bgColor="transparent"
                fgColor="hsl(220,25%,10%)"
              />
            </div>
          </DialogContent>
        </Dialog>
      </ItemActions>
    </Item>
  );
};
