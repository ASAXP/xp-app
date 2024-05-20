import CurrentStoryTable from './currentStoryTable';
import { mockStory } from '../../hooks/useStoryList';

export default function page() {
  return (
    <div className="mx-5">
      <h1 className="text-xl">스토리 전체 뷰</h1>
      <CurrentStoryTable storyList={mockStory} />
      <section className="my-2">table section</section>
    </div>
  );
}
