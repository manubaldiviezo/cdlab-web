import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/config";

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink("Hola CDLab, quisiera más información.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cdlab-green text-cdlab-blue shadow-xl transition-transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
