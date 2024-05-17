'use client';

import React, { TableHTMLAttributes } from 'react';
import { Story } from '@xp-app/types';
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@libs/web-ui/index';

interface currentStoryTableProps extends TableHTMLAttributes<HTMLTableElement> {
  storyList: Story[];
}

export default function currentStoryTable({
  storyList,
}: currentStoryTableProps) {
  return (
    <Table>
      <TableCaption className="text-left py-2">
        현재 진행중인 반복주기
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>스토리 타입</TableHead>
          <TableHead>내용</TableHead>
          <TableHead>포인트</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storyList.map((story) => {
          return (
            <TableRow key={story.id}>
              <TableCell>{story.type}</TableCell>
              <TableCell>{story.description}</TableCell>
              <TableCell>{story.point}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
