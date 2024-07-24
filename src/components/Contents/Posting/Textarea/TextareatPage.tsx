import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const TextareatPage = () => {
  return (
    <>
      <div className="m-20 grid w-full gap-y-3.5">
        <Label className="font-semibold text-2xl" htmlFor="message-2"></Label>
        <Textarea placeholder="당신의 이야기를 적어주세요." id="message-2" className="resize-none h-80 w-full" />
        <p className="text-base text-muted-foreground">많은 사람들이 당신의 글을 볼 수 있어요.</p>
      </div>
    </>
  );
};

export default TextareatPage;
