"use client";

export function ShareButton() {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("İlan linki kopyalandı.");
    }
  };

  return (
    <button 
      className="btn-ghost w-full"
      style={{ justifyContent: "center", opacity: 0.7 }}
      onClick={handleShare}
    >
      İlanı Paylaş
    </button>
  );
}
