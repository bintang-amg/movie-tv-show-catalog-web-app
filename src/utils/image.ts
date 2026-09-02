const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: `${IMAGE_BASE_URL}/w342`,
  backdrop: `${IMAGE_BASE_URL}/w1280`,
  profile: `${IMAGE_BASE_URL}/w185`,
  original: `${IMAGE_BASE_URL}/original`,
} as const;

export function getImageUrl(
  path: string | null,
  size: keyof typeof IMAGE_SIZES = 'poster',
): string {
  if (!path) return '';
  return `${IMAGE_SIZES[size]}${path}`;
}
