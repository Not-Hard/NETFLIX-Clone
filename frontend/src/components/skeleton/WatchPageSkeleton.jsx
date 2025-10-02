export default function WatchPageSkeleton() {
    return (
        <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-4 bg-gray-700 rounded w-3/4 shimmer"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 shimmer"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 shimmer"></div>
            <div className="aspect-video bg-gray-700 rounded shimmer"></div>
        </div>
    );
}
