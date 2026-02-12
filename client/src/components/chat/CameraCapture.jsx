import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Camera } from 'lucide-react';

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.name === 'NotAllowedError'
              ? 'Camera access denied. Please allow camera permissions.'
              : 'Could not access camera. Try uploading an image instead.'
          );
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file);
      }
    }, 'image/jpeg', 0.85);
  }, [onCapture]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      background: '#000', display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px', background: 'rgba(0,0,0,0.8)',
      }}>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Take Photo</span>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none',
          color: '#fff', padding: 8, borderRadius: 8, cursor: 'pointer',
          display: 'flex',
        }}>
          <X size={18} />
        </button>
      </div>

      {/* Viewfinder */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {error ? (
          <p style={{ color: '#f87171', textAlign: 'center', padding: 20, fontSize: 14 }}>{error}</p>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Capture button */}
      {ready && !error && (
        <div style={{
          padding: '20px 0', display: 'flex', justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)',
        }}>
          <button onClick={handleCapture} style={{
            width: 64, height: 64, borderRadius: '50%',
            border: '4px solid #fff', background: 'rgba(34,197,94,0.8)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Camera size={24} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
}
