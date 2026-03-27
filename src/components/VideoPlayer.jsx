import { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoFile, autoPlay = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, [videoFile, autoPlay]);

  return (
    <div style={styles.container}>
      <video
        ref={videoRef}
        src={`/videos/${videoFile}`}
        style={styles.video}
        controls
        loop
        playsInline
        onError={(e) => console.error('Video error:', e)}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
};

export default VideoPlayer;

// Made with Bob
