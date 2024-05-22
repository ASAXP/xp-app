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
  // 자식 스토리
  related: Story[];
};

// 보드 상태
export type Progress = {
  id: number;
  title: string; // 사용자가 임의로 설정
}

// 진행중인 스토리
export type Sprint = {
  id: number;
  progress: Progress;
  story: Story;
}
