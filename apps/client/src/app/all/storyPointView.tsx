'use client';

import React from 'react';
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@libs/web-ui/index';
import { Check, X } from 'lucide-react';

export type StoryPointViewProps = {
  value: number;
};

export default function StoryPointView({ value }: StoryPointViewProps) {
  const [pop, setPop] = React.useState(false);
  const [storyPointValue, setStorypointValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Popover open={pop} onOpenChange={setPop}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <span className="sr-only">Show Story Point</span>
          <span className="text-lg">{storyPointValue}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form
          className="flex flex-start max-w-xs"
          onSubmit={() => {
            // TODO : API 생기면 붙이기
            if (inputRef.current) {
              setStorypointValue(parseInt(inputRef.current.value));
            }
          }}
        >
          <Input type="text" ref={inputRef} />
          <Button>
            <span className="sr-only">Change Story Point</span>
            <Check />
          </Button>
          <Button type="button" onClick={() => setPop(false)}>
            <span className="sr-only">Cancel and Close Popover</span>
            <X />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
