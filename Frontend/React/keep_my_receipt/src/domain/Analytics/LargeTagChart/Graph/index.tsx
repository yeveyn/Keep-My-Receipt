import React from 'react';

interface ItemType {
  id: String;
  value: String;
  rate: String;
}

export default function Graph({
  sumValue,
  items,
}: {
  sumValue: number;
  items: ItemType[];
}) {
  return <div>Graph</div>;
}
