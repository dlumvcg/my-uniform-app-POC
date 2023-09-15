import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer';
import Thumbnail from '../Thumbnail';
import Search from '../Search';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import axios from 'axios';

export type VideoContainerProps = ComponentProps<{
  channelId: string;
  part: string;
  maxResults: number;
}>;

interface YouTubeResponseType {
  id: {
    videoId: string;
    kind: string;
  };
  snippet: {
    title: string;
    description: string;
  };
}
[];

const VideoPlayerContainer: React.FC<VideoContainerProps> = ({ channelId, part, maxResults }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [YouTubeArr, setYouTubeArr] = useState<YouTubeResponseType | []>([]);
  const [userQueryString, setUserQueryString] = useState('');
  const YouTubeURL = `https://www.googleapis.com/youtube/v3/search?key=${
    process.env.YOUTUBE_API_KEY
  }&channelId=${channelId}&part=${part}&maxResults=${maxResults}${userQueryString ? '&q=' + userQueryString : ''}`;

  const handleThumbnailClick = (index: number) => {
    setSelectedVideoIndex(index);
  };

  const handleSearch = (searchTerm: string) => {
    setUserQueryString(searchTerm);
    console.log(`Searching for: ${searchTerm}`);
  };

  const searchYouTube = () => {
    axios
      .get(YouTubeURL)
      .then(res => {
        setYouTubeArr(res.data.items);
      })
      .catch(err => {
        console.error('Error performing YouTube Search: ', err);
      });
  };

  useEffect(() => {
    searchYouTube();
  }, []);

  useEffect(() => {
    searchYouTube();
  }, [userQueryString]);

  return (
    <div className="video-container">
      <Search onSearch={handleSearch} />
      <VideoPlayer
        id={YouTubeArr[selectedVideoIndex]?.id.videoId}
        source={'YouTube'}
        title={YouTubeArr[selectedVideoIndex]?.snippet.title}
        description={YouTubeArr[selectedVideoIndex]?.snippet.description}
        component={<></>}
      />
      <div className="thumbnails">
        {YouTubeArr.map((video, index) => (
          <Thumbnail
            key={video.id.videoId}
            videoId={video.id.videoId}
            title={video.snippet.title}
            onSelect={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'videoPlayerContainer',
  component: VideoPlayerContainer,
});

export default VideoPlayerContainer;
