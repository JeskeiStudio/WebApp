import { useState } from 'react';
import { useCreateAsset, pctToBps } from '../hooks/contracts';
import { useAccount } from 'wagmi';

export function Upload() {
  const [contentHash, setContentHash] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [revenuePercent, setRevenuePercent] = useState(100);

  const { address } = useAccount();
  const { createAsset, isPending, hash } = useCreateAsset();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createAsset({
      contentHash,
      metadataURI,
      splits: [
        {
          recipient: address!,
          basisPoints: pctToBps(revenuePercent),
        },
      ],
    });
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Upload new video</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">IPFS Content Hash</span>
          <input
            className="w-full rounded border px-3 py-2"
            value={contentHash}
            onChange={(e) => setContentHash(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Metadata URI</span>
          <input
            className="w-full rounded border px-3 py-2"
            value={metadataURI}
            onChange={(e) => setMetadataURI(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            Your revenue share (%)
          </span>
          <input
            className="w-full rounded border px-3 py-2"
            type="number"
            min={0}
            max={100}
            value={revenuePercent}
            onChange={(e) => setRevenuePercent(Number(e.target.value))}
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-indigo-600 px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {isPending ? 'Minting…' : 'Mint NFT'}
        </button>

        {hash && (
          <p className="mt-2 text-sm text-gray-600">
            Tx:{' '}
            <a
              className="text-indigo-600 underline"
              href={`https://sepolia.etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
            >
              {hash.slice(0, 10)}…
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
