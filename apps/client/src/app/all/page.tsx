import { Story } from '@xp-app/types';
import CurrentStoryTable from './currentStoryTable';
import { AllStoryView } from './allStoryView';

const mockStory: Story[] = [
  {
    id: 0,
    type: 'epic',
    description: 'testcontent',
    content: 'testcontent',
    point: 1,
    assignee: null,
    parentStory: null,
    childStories: [],
  },
  {
    id: 1,
    type: 'epic',
    description: 'testcontent',
    content: 'testcontent',
    point: 1,
    assignee: null,
    parentStory: null,
    childStories: [],
  },
];

export default function page() {
  return (
    <main className="mx-5">
      <h1 className="text-xl">스토리 전체 뷰</h1>
      <section aria-label="currentSprintTable">
        <CurrentStoryTable storyList={mockStory} />
      </section>
      <section className="my-4">
        <AllStoryView />
      </section>
    </main>
  );
}
