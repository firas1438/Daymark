import PatternBackground from "./pattern-background";

export default function Layout({ children }) {
  return (
    <div className="relative w-[350px] h-[450px] border border-gray-200 shadow-xl overflow-hidden rounded-2xl">
      {/* background */}
      <PatternBackground />

      {/* foreground */}
      <div className="relative z-10 h-full flex flex-col">
        {/* header */}
        <div className="bg-[var(--color-white)] border-b border-gray-200 px-5 py-4 shadow-sm">
          <h1 className="text-xl font-bold text-[var(--color-black)] flex items-center">
            <div className="mr-3"> <img src="./images/32.png" alt="Logo" /> </div>
            Daymark
          </h1>
          <p className="text-xs text-[var(--color-black)]/70 mt-1">
            Discover public holidays all around the world!
          </p>
        </div>
        {/* content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
