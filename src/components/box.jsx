const Box = ({ value, isSelected, isFail }) => {
  let backbg = "";
  if (isSelected) {
    if (value === 2) backbg = "bg-blue-400 text-white";
    else if (value === 4) backbg = "bg-blue-500 text-white";
    else if (value === 8) backbg = "bg-blue-600 text-white";
    else if (value === 16) backbg = "bg-blue-700 text-white";
    else if (value === 32) backbg = "bg-blue-800 text-white";
    else if (value === 64) backbg = "bg-blue-900 text-white";
    else if (value === 128) backbg = "bg-blue-950 text-white";
    else backbg = "bg-green-500 text-white";
  }

  if (isFail) {
    backbg = "bg-red-400 text-white";
  }

  return (
    <>
      <div
        className={`flex h-[70px] w-[70px] items-center justify-center rounded-xl border border-none p-2 text-3xl font-bold sm:h-28 sm:w-28 sm:text-5xl ${backbg}`}
      >
        {value !== 0 ? value : null}
      </div>
    </>
  );
};

export default Box;
