export default function TimeFilter() {
  return (
    <div className="flex flex-col sm:flex-row border rounded-md w-full sm:w-min h-20 sm:h-min overflow-y-auto">
      <p className="text-xs text-darker-neutral font-semibold px-6 py-2.5 hover:opacity-75 cursor-pointer">
        Custom
      </p>
      <p className="text-xs text-darker-neutral font-semibold border-r border-l px-6 py-2.5 hover:opacity-75 cursor-pointer">
        Today
      </p>
      <p className="text-xs text-darker-neutral font-semibold border-r  px-6 py-2.5  hover:opacity-75 cursor-pointer">
        Yesterday
      </p>
      <p className="text-xs text-darker-neutral font-semibold border-r px-6 py-2.5 hover:opacity-75 cursor-pointer">
        7D
      </p>
      <p className="text-xs text-darker-neutral font-semibold border-r px-6 py-2.5 hover:opacity-75 cursor-pointer">
        30D
      </p>
      <p className="text-xs text-darker-neutral font-semibold border-r px-6 py-2.5 hover:opacity-75 cursor-pointer">
        3M
      </p>
      <p className="text-xs text-darker-neutral font-semibold border-l px-6 py-2.5 hover:opacity-75 cursor-pointer">
        6M
      </p>

      <p className="text-xs text-darker-neutral font-semibold border-l rounded-l-sm px-6 py-2.5 bg-[#E2E8F0] hover:opacity-75 cursor-pointer">
        12M
      </p>
    </div>
  );
}
