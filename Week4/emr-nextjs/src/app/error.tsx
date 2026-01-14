"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-red-500 font-bold">Đã có lỗi xảy ra!</h2>
      <button onClick={() => reset()} className="mt-4 text-blue-600 underline">
        Retry
      </button>
    </div>
  );
}
