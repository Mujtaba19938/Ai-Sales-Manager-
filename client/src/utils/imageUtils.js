const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_RAW_SIZE = 20 * 1024 * 1024; // 20MB

export async function compressImage(file, maxWidth = 1024, maxHeight = 1024, quality = 0.7) {
  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  // Use OffscreenCanvas if available, fallback to regular canvas
  let blob;
  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);
    blob = await canvas.convertToBlob({ type: 'image/jpeg', quality });
  } else {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);
    blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
  }

  bitmap.close();
  return blob;
}

export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function processImageFile(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error('Unsupported image type. Use JPEG, PNG, GIF, or WebP.');
  }
  if (file.size > MAX_RAW_SIZE) {
    throw new Error('Image too large. Maximum size is 20MB.');
  }

  const compressedBlob = await compressImage(file);
  const base64 = await blobToBase64(compressedBlob);
  const previewUrl = URL.createObjectURL(compressedBlob);

  return { base64, mediaType: 'image/jpeg', previewUrl };
}

export function buildMessageContent(text, images = []) {
  if (!images || images.length === 0) return text;

  const content = [];
  for (const img of images) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: img.mediaType,
        data: img.base64,
      },
    });
  }
  if (text.trim()) {
    content.push({ type: 'text', text });
  }
  return content;
}

export function getTextFromContent(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('');
  }
  return '';
}
