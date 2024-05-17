'use client';

import { Story } from '@xp-app/types';
import React from 'react';

export const mockStory: Story[] = [
  {
    id: 0,
    type: 'epic',
    description: 'mockstory description',
    point: 5,
    assignee: 'dongkyu',
    sprint: false,
    related: [],
  },
  {
    id: 1,
    type: 'spike',
    description: 'mockstory description',
    point: 5,
    assignee: 'dongkyu',
    sprint: false,
    related: [],
  },
];

export default function useStoryList() {
  const [storyList, setStoryList] = React.useState<Story[]>(mockStory);

  const currentSprint = storyList.filter((story) => story.sprint);
  const notSprintStoryList = storyList.filter((story) => !story.sprint);

  return {
    storyList,
    setStoryList,
    currentSprint,
    notSprintStoryList,
  };
}
