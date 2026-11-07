import { WHATSAPP_URL } from '../data/company';
import { cn } from '../utils/cn';
import { useScrolledPast, mobileRevealClasses } from '../hooks/useScrolledPast';

export default function WhatsAppButton() {
  const revealed = useScrolledPast();
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#1DA851] text-white shadow-xl shadow-black/20 ring-1 ring-white/20 transition duration-300 hover:scale-105",
        mobileRevealClasses(revealed),
      )}
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 sm:h-7 sm:w-7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.199-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.922-2.207-.242-.579-.487-.5-.672-.51-.173-.009-.372-.01-.57-.01s-.52.075-.793.372c-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        />
        <path
          fill="currentColor"
          d="M12.004 2.003C6.486 2.003 2 6.489 2 12.007c0 2.11.636 4.068 1.732 5.713L2 22l4.382-1.152A9.962 9.962 0 0012.004 22c5.52 0 10.003-4.484 10.003-9.993 0-5.517-4.484-9.999-10.003-9.999zm0 18.18a8.12 8.12 0 01-4.43-1.283l-.317-.189-2.596.683.693-2.534-.206-.33A8.12 8.12 0 013.884 12.01c0-4.52 3.678-8.197 8.12-8.197 4.474 0 8.113 3.677 8.113 8.197 0 4.519-3.639 8.196-8.113 8.196z"
        />
      </svg>
    </a>
  );
}
