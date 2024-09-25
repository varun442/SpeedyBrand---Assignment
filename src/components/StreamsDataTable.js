import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const INITIAL_LOAD = 15;
const LOAD_MORE_COUNT = 15;

const StreamsDataTable = () => {
  const { data, loading } = useDashboard();
  const [sortConfig, setSortConfig] = useState({ key: 'dateStreamed', direction: 'desc' });
  const [filters, setFilters] = useState({ song: '', artist: '' });
  const [visibleItems, setVisibleItems] = useState(INITIAL_LOAD);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef(null);

  const filteredAndSortedData = useMemo(() => {
    if (!data || !data.recentStreams) return [];

    let result = [...data.recentStreams].filter(
      (stream) =>
        stream.songName.toLowerCase().includes(filters.song.toLowerCase()) &&
        stream.artist.toLowerCase().includes(filters.artist.toLowerCase())
    );

    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [data, filters, sortConfig]);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleItems(prev => Math.min(prev + LOAD_MORE_COUNT, filteredAndSortedData.length));
      setIsLoadingMore(false);
    }, 500); // Simulate a delay to show loading indicator
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];
      if (target.isIntersecting && !isLoadingMore && visibleItems < filteredAndSortedData.length) {
        loadMore();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoadingMore, visibleItems, filteredAndSortedData.length]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUpIcon className="w-5 h-5 inline-block" />
      ) : (
        <ChevronDownIcon className="w-5 h-5 inline-block" />
      );
    }
    return null;
  };

  if (loading) return <div className="text-center text-gray-600">Loading streams data table...</div>;
  if (!data) return <div className="text-center text-gray-600">No data available</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-lg">
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filter by song name"
          className="p-2 border rounded-lg flex-grow"
          value={filters.song}
          onChange={(e) => setFilters({ ...filters, song: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by artist name"
          className="p-2 border rounded-lg flex-grow"
          value={filters.artist}
          onChange={(e) => setFilters({ ...filters, artist: e.target.value })}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => requestSort('songName')}>
                Song Name <SortIcon columnKey="songName" />
              </th>
              <th className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => requestSort('artist')}>
                Artist <SortIcon columnKey="artist" />
              </th>
              <th className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => requestSort('dateStreamed')}>
                Date Streamed <SortIcon columnKey="dateStreamed" />
              </th>
              <th className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => requestSort('streamCount')}>
                Stream Count <SortIcon columnKey="streamCount" />
              </th>
              <th className="px-4 py-2">User ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.slice(0, visibleItems).map((stream, index) => (
              <tr key={stream.id} className={`hover:bg-gray-50 ${index >= visibleItems - LOAD_MORE_COUNT ? 'animate-pulse' : ''}`}>
                <td className="border px-4 py-2">{stream.songName}</td>
                <td className="border px-4 py-2">{stream.artist}</td>
                <td className="border px-4 py-2">{new Date(stream.dateStreamed).toLocaleString()}</td>
                <td className="border px-4 py-2">{stream.streamCount}</td>
                <td className="border px-4 py-2">{stream.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibleItems < filteredAndSortedData.length && (
        <div ref={loaderRef} className="text-center py-4">
          {isLoadingMore ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          ) : (
            <button onClick={loadMore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StreamsDataTable;