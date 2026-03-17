import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import { useTranslation, Trans } from "react-i18next";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            <Trans
              i18nKey="contactModal.title"
              components={{ 1: <span className="text-brand-ia" /> }}
            />
          </DialogTitle>
          <DialogDescription>
            {t("contactModal.description")}
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => setTimeout(() => onOpenChange(false), 3000)} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;