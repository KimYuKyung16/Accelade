import React from 'react';
import { styled } from 'styled-components';

function Tag({ title, content }: { title: string; content: string }) {
  return (
    <TagLayout>
      <span>{title}</span>
      <p>{content}</p>
    </TagLayout>
  );
}

const TagLayout = styled.div``;

export default Tag;
