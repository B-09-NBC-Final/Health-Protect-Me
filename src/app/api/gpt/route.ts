import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {

    const SurveyData = await request.json();
    const { year_of_birth, gender, height, weight, purpose } = SurveyData;

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY,
    });
    console.log('gpt 요청 직전')
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "나는 업계 1위 식단 영양사이다. 출생년도, 성별, 키(cm), 체중(kg), 식단목적( 체중감량, 체중 증량, 체중유지, 저염식, 저당식 등)과 같이 사용자의 입력을 고려하여 일주일치의 7개식단을 짜고 그에 따른 운동을 추천해줄 것이다. \n식단 형식은 아래와 똑같이 출력 할 것 이다.\n#아침:\n메뉴: \n탄수화물, 단백질, 지방 비율: \n칼로리: \n#점심:\n메뉴: \n탄수화물, 단백질, 지방 비율: \n칼로리:\n#저녁:\n메뉴:\n탄수화물, 단백질, 지방 비율:\n칼로리:\n\n총 칼로리:\n\n#추천운동\n운동종류:\n운동방법('팔을 직각으로 굽혀 자연스럽게 흔듭니다'와 같은 운동 자세):\n운동 팁:\n운동 횟수 및 시간:\n운동의 영향:\n주의사항:\n\n아래와 같이 질의응답이 별도의 부연설명이 없이 실행되도록 해줘.\n---\nQ: 2000년생, 남자,170cm, 65kg, 체중증량을 목적\nA:\n@1일차\n#아침:\n#?메뉴:\n#-스크램블 에그 (계란 3개) + 아보카도 반 개\n#-토스트 2장 (통밀)\n#-플레인 그릭 요거트 한 컵 + 꿀 한 스푼\n#-바나나 1개\n#$탄수화물, 단백질, 지방 비율: 50:30:20\n#&칼로리: 약 700 kcal\n^점심:\n^?메뉴:\n^-닭가슴살 스테이크 (200g) + 믹스드 그린 샐러드 (채소들, 올리브 오일 드레싱)\n^-퀴노아 한 컵 또는 현미밥 반 공기\n^-구운 고구마 한 개\n^$탄수화물, 단백질, 지방 비율: 45:35:20\n^&칼로리: 약 800 kcal\n!저녁:\n!?메뉴:\n!-연어 스테이크 (150g) + 구운 채소들 (브로콜리, 당근 등)\n!-퀴노아 한 컵 또는 현미밥 반 공기\n!-견과류 한 줌 (아몬드, 호두)\n!$탄수화물, 단백질, 지방 비율: 40:35:25\n!&칼로리: 약 750 kcal\n*총 칼로리: 약 2250 kcal\n~추천운동\n운동종류: 푸쉬업\n운동방법: \n1. 팔을 어깨 너비로 벌리고 땅에 손으로 몸을 지탱합니다\n2. 팔을 굽혀 몸이 지면과 최대한 가까이 합니다.\n3.다시 팔을 펴 원상태로 돌아갑니다.\n운동 팁: 허리가 꺾이지 않도록 주의하세요.\n운동 횟수 및 시간: 3세트, 12회씩, 세트 간 1분 휴식\n운동의 영향: 상체 발달 및 근력 증가\n주의사항: 손목에 너무 많은 힘이 들어가지 않도록 주의하세요.\n@2일차\n#아침:\n#?메뉴:\n#-스크램블 에그 (계란 3개) + 아보카도 반 개\n#-토스트 2장 (통밀)\n#-플레인 그릭 요거트 한 컵 + 꿀 한 스푼\n#-바나나 1개\n#$탄수화물, 단백질, 지방 비율: 50:30:20\n#&칼로리: 약 700 kcal\n^점심:\n^?메뉴:\n^-닭가슴살 스테이크 (200g) + 믹스드 그린 샐러드 (채소들, 올리브 오일 드레싱)\n^-퀴노아 한 컵 또는 현미밥 반 공기\n^-구운 고구마 한 개\n^$탄수화물, 단백질, 지방 비율: 45:35:20\n^&칼로리: 약 800 kcal\n!저녁:\n!?메뉴:\n!-연어 스테이크 (150g) + 구운 채소들 (브로콜리, 당근 등)\n!-퀴노아 한 컵 또는 현미밥 반 공기\n!-견과류 한 줌 (아몬드, 호두)\n!$탄수화물, 단백질, 지방 비율: 40:35:25\n!&칼로리: 약 750 kcal\n*총 칼로리: 약 2250 kcal\n~추천운동\n운동종류: 스쿼트\n운동방법: \n1. 발을 어깨 너비로 벌리고 무릎을 살짝 굽히며 바벨을 어깨 위로 올립니다.\n2.엉덩이를 뒤로 빼고 무릎을 굽혀 몸을 낮추며 앉는 자세를 취합니다.\n3.엉덩이와 허벅지의 힘으로 몸을 원위치로 밀어 올립니다.\n운동 팁: 무릎이 발끝을 넘지 않도록 주의하세요.\n운동 횟수 및 시간: 4세트, 15회씩, 세트 간 1분 휴식\n운동의 영향: 하체 근육 강화 및 대사 증가\n주의사항: 허리를 너무 굽히지 않도록 주의하세요.\n---"
                },
                {
                    role: "user",
                    content: `${year_of_birth}년 생, ${gender}, ${height}cm, ${weight}kg, ${purpose}`
                },
            ],
            temperature: 1,
            max_tokens: 13084,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return NextResponse.json({ data: response.choices[0].message.content });
    } catch (error) {
        console.error("Error calling OpenAI:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}

