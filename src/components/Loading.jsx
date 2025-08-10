
export default function Loading() {
    return (
      <div className="min-h-dvh w-full bg-gray-100">
        <div className="mx-auto min-h-dvh w-full max-w-sm bg-white">
          <div className="flex items-center justify-center min-h-dvh">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">กำลังโหลด...</p>
            </div>
          </div>
        </div>
      </div>
    );
}