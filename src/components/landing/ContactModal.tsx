import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="sm:max-w-lg"
      onInteractOutside={(e) => e.preventDefault()}
    >
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Agenda tu auditoría <span className="text-brand-ia">gratuita</span>
        </DialogTitle>
        <DialogDescription>
          Completa el formulario y un experto en IA analizará tu caso.
        </DialogDescription>
      </DialogHeader>
      <ContactForm onSuccess={() => setTimeout(() => onOpenChange(false), 3000)} />
    </DialogContent>
  </Dialog>
);

export default ContactModal;
