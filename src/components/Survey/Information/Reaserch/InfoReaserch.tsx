const InfoResearch = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">설문조사 페이지</h1>

      <input
        type="text"
        placeholder="출생년도(19xx년)"
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mb-4">
        <p className="mb-2 font-medium text-gray-700">성별(Gender)</p>
        <div className="flex space-x-2">
          <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            남(Male)
          </button>
          <button className="flex-1 py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
            여(Female)
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="신장"
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="체중"
        className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div>
        <p className="mb-2 font-medium text-gray-700">식단 목적</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            체중 감량
          </button>
          <button className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
            체중 유지
          </button>
          <button className="py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            건강 식습관
          </button>
          <button className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            체중 증량
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoResearch;
