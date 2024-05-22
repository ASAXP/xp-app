// 프로젝트
export type Project = {
  id: number;
}

// 스토리
export type Story = {
  id: number;
  // 사용자 스토리의 세 가지 종류
  type: 'epic' | 'story' | 'spike';
  // 100자 정도로 스토리 설명 : 사용자는 ~~를 할 수 있다.
  description: string;
  // 스토리의 상세내용
  content: string;
  // story point
  point: number;
  // 담당자
  assignee: string | null;
  // 부모 스토리
  parentStory: Story | null;
  // 자식 스토리
  childStories: Story[];
};


// 스프린트
export type Sprint = {
  id: number;
  // 스프린트 이름
  name: string;
  // 100자 정도로 스프린트 설명
  description: string;
  // 스프린트 주기
  cycle: number;
  // 시작일
  beginDate: Date;
  // 종료일
  endDate: Date;
}

// 진행 상황
export type Progress = {
  id: number;
  // 진행 상황 이름
  name: string;
}

// 진행 상황 + 스토리
export type ProgressWithStories = Progress & {
  // 스토리
  stories: Story[];
}

// 스프린트 + 진행 상황 + 스토리
export type SprintWithProgress = Sprint & {
  progress: ProgressWithStories[];
}

// ex>
// const sprint: SprintWithProgress = {
//   id: 1,
//   name: '스프린트 1',
//   description: '스프린트 1 설명',
//   cycle: 1,
//   beginDate: new Date('2024-05-22 00:00:00'),
//   endDate: new Date('2024-05-28 23:59:59'),
//   progress: [
//     {
//       id: 1,
//       name: '진행 상황 1',
//       stories: [
//         {
//           id: 1,
//           type: 'epic',
//           description: '사용자는 로그인을 할 수 있다.',
//           content: '사용자는 로그인을 할 수 있다.',
//           point: 1,
//           assignee: '홍길동',
//           parentStory: null,
//           childStories: [],
//         }
//       ]
//     }
//   ]
// }
