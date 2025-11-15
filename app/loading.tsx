export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-blue-700">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
      </div>

      <p className="text-sm md:text-base font-medium tracking-wide">
        Loading the best places to fly…
      </p>
    </div>
  );
}
