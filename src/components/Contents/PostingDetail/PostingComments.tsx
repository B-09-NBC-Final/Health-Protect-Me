const PostingComments = () => {
  return (
    <div className="mt-10 pb-16">
      <p className="text-sm text-gray900 font-semibold">
        댓글<span className="ml-1">2</span>
      </p>
      <div className="border-t border-solid border-gray200 py-6">
        <input
          className="border border-solid border-gray300 py-2 px-3 rounded-lg"
          type="text"
          placeholder="댓글을 작성해 보세요. 최대 300자 까지 입력 가능해요."
        />
        <button type="button">등록</button>
      </div>
      <div>
        <strong>건강전문가</strong>
        <span>건강 식사</span>
        <p>피자가 맛있어 보이네요. 어디 브랜드인가요?</p>
        <p>24.08.06</p>
      </div>
    </div>
  );
};

export default PostingComments;
