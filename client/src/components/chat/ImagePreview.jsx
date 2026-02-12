import { X } from 'lucide-react';

export function ImageStagingArea({ images, onRemove }) {
  if (!images || images.length === 0) return null;

  return (
    <div style={{
      display: 'flex', gap: 8, padding: '8px 16px',
      overflowX: 'auto', flexWrap: 'nowrap',
    }}>
      {images.map((img, i) => (
        <div key={i} style={{
          position: 'relative', width: 64, height: 64,
          borderRadius: 10, overflow: 'hidden', flexShrink: 0,
          border: '1px solid var(--border-color)',
        }}>
          <img
            src={img.previewUrl}
            alt={`Staged ${i + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={() => onRemove(i)}
            style={{
              position: 'absolute', top: 2, right: 2,
              width: 20, height: 20, borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)', border: 'none',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0,
            }}
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function MessageImages({ imageUrls }) {
  if (!imageUrls || imageUrls.length === 0) return null;

  return (
    <div style={{
      display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8,
    }}>
      {imageUrls.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`Attached ${i + 1}`}
          style={{
            width: 120, height: 90, objectFit: 'cover',
            borderRadius: 8, cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onClick={() => window.open(url, '_blank')}
        />
      ))}
    </div>
  );
}
