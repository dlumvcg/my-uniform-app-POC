import React from 'react';

interface ThumbnailProps {
  videoId: string;
  title: string;
  onSelect: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ videoId, title, onSelect }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

  return (
    <div className="thumbnail" onClick={onSelect}>
      <h2>{title}</h2>
      <img src={thumbnailUrl} alt={`Thumbnail for video ${videoId}`} />
    </div>
  );
};

export default Thumbnail;
