'use client';

import { Story } from '@xp-app/types';
import React from 'react';

export default function useStoryList() {
  const [storyList, setStoryList] = React.useState<Story[]>();

  return {
    storyList,
    setStoryList,
  };
}
