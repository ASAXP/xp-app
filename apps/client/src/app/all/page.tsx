'use client';

import { Story } from '@xp-app/types';
import { DataTableDemo } from '@libs/web-ui/index';

const mockStory: Story[] = [
  {
    id: 0,
    type: 'story',
    description: 'mockstory description',
    point: 5,
    assignee: 'dongkyu',
    related: [],
  },
];

export default function page() {
  return (
    <div>
      <h1>story view page</h1>
      <DataTableDemo />
    </div>
  );
}
