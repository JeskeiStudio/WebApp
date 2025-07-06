import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAsset } from '../hooks/contracts';

export function Watch() {
  const { assetId } = useParams<{ assetId: string }>();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { asset, isLoading } = useAsset(assetId ? BigInt(assetId) : undefined);

  useEffect(() => {
    if (asset && asset.contentHash) {
      // TODO: swap in your own IPFS gateway / streaming service
      setVideoUrl(`https://ipfs.io/ipfs/${asset.contentHash}`);
    }
  }, [asset]);

  if (!assetId) return <p className="p-6">Missing assetId.</p>;

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          className="mb-4 w-full rounded-lg bg-black"
        />
      ) : (
        <div className="flex h-72 w-full items-center justify-center rounded-lg bg-gray-200">
          {isLoading ? 'Loading…' : 'No video found'}
        </div>
      )}

      <h1 className="mt-4 text-xl font-semibold">
        {asset?.metadata?.title ?? `Asset #${assetId}`}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {asset?.metadata?.description}
      </p>
    </div>
  );
}
