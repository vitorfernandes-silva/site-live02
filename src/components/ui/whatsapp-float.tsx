export const WHATSAPP_NUMBER = "5519990110101";

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="flex-none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3C8.832 3 3 8.832 3 16c0 2.313.607 4.568 1.758 6.555L3 29l6.605-1.73A12.95 12.95 0 0 0 16 29c7.168 0 13-5.832 13-13S23.168 3 16 3Zm0 23.625a10.59 10.59 0 0 1-5.402-1.48l-.388-.23-3.918 1.027 1.045-3.82-.252-.4A10.59 10.59 0 0 1 5.375 16C5.375 10.143 10.143 5.375 16 5.375S26.625 10.143 26.625 16 21.857 26.625 16 26.625Zm5.822-7.953c-.319-.16-1.886-.931-2.178-1.038-.292-.106-.505-.16-.718.16-.212.319-.824 1.038-1.01 1.25-.186.213-.372.24-.691.08-.319-.16-1.347-.497-2.565-1.584-.948-.846-1.588-1.89-1.774-2.209-.186-.32-.02-.492.14-.651.143-.143.319-.372.478-.558.16-.186.213-.319.319-.532.106-.212.053-.398-.027-.558-.08-.16-.718-1.729-.984-2.367-.259-.622-.522-.538-.718-.548-.186-.009-.398-.011-.611-.011-.213 0-.558.08-.851.399-.292.319-1.117 1.091-1.117 2.66 0 1.57 1.143 3.086 1.303 3.299.16.213 2.25 3.435 5.45 4.817.761.329 1.356.525 1.819.672.764.243 1.46.209 2.01.127.613-.092 1.886-.771 2.152-1.516.266-.744.266-1.383.186-1.516-.08-.133-.292-.213-.611-.372Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function WhatsAppFloat() {
  return (
    <>
      <style>{WA_FLOAT_CSS}</style>
      <a
        href={buildWhatsAppUrl(
          "Olá! Vim pelo site da JAGWAR e gostaria de conversar sobre o crescimento do meu e-commerce.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Falar no WhatsApp"
      >
        <span className="wa-float-tooltip" aria-hidden="true">
          Falar no WhatsApp
        </span>
        <span className="wa-float-btn">
          <WhatsAppIcon size={28} />
        </span>
      </a>
    </>
  );
}

const WA_FLOAT_CSS = `
.wa-float {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 90;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.wa-float-btn {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: #25D366;
  color: #FFFFFF;
  display: grid;
  place-items: center;
  box-shadow: 0 10px 28px -4px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0, 0, 0, 0.35);
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s, box-shadow 0.2s;
}
.wa-float:hover .wa-float-btn {
  background: #1EBE5D;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 14px 34px -4px rgba(37, 211, 102, 0.68), 0 6px 16px rgba(0, 0, 0, 0.4);
}
.wa-float:focus-visible {
  outline: 2px solid #25D366;
  outline-offset: 4px;
  border-radius: 999px;
}
.wa-float-tooltip {
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(10, 10, 9, 0.9);
  border: 1px solid rgba(239, 228, 212, 0.16);
  color: #F5F0E8;
  font-family: "Inter Display", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 10px 26px -8px rgba(0, 0, 0, 0.55);
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}
.wa-float:hover .wa-float-tooltip {
  opacity: 1;
  transform: translateX(0);
}
@media (max-width: 600px) {
  .wa-float {
    right: 16px;
    bottom: 18px;
  }
  .wa-float-btn {
    width: 54px;
    height: 54px;
  }
  .wa-float-tooltip {
    display: none;
  }
  body:has(.onb-modal-foot) .wa-float {
    bottom: 84px;
    right: 16px;
  }
}
`;
