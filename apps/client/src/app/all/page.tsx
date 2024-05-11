import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@libs/web-ui/index';
import { Story } from '@xp-app/types';

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
      <Button variant="outline">tutton</Button>
      <Table>
        <TableCaption>스토리를 모두 표시합니다</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User Story</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockStory.map((story, idx) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <TableRow>
                <TableCell key={idx}>{story.description}</TableCell>
                <TableCell key={idx}>{story.point}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
