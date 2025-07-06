import { Link } from 'react-router-dom';

export function Home() {
  // Replace this with a call to your subgraph once it’s live
  const mockVideos = [
    { id: '1', title: 'Demo Video #1', thumbnail: '/placeholder.jpg' },
    { id: '2', title: 'Demo Video #2', thumbnail: '/placeholder.jpg' },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Trending</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {mockVideos.map((v) => (
          <Link key={v.id} to={`/watch/${v.id}`} className="flex flex-col">
            <img
              src={v.thumbnail}
              alt={v.title}
              className="mb-2 aspect-video rounded-lg object-cover shadow"
            />
            <span className="text-sm font-medium text-gray-800">{v.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
