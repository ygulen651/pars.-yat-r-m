"use client";

export function VideoPlayer({ url }: { url: string | null }) {
  if (!url) return null;

  // Helper to get YouTube ID
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYoutubeId(url);

  return (
    <div className="reveal-up">
      <h2 className="display-md mb-8">İlan Videosu</h2>
      <div 
        className="relative aspect-video overflow-hidden bg-void-2 shadow-xl"
        style={{ border: "1px solid rgba(28,23,18,0.05)" }}
      >
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video 
            src={url} 
            controls 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
