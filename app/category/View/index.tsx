"use client";

import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

const fetchFeeds = async (category: string) => {
  const response = await fetch(`/api/feed/${category}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const View: FC = () => {
  const [category, setCategory] = useState("next.js");
  const { data, isLoading, error } = useQuery({
    queryKey: ["feeds", category],
    queryFn: () => fetchFeeds(category),
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div>
      <select value={category} onChange={handleChange}>
        <option value="next.js">Next.js</option>
        <option value="react">React</option>
        {/* 他のオプションを追加 */}
      </select>
      {data.data.map((item: any, index: number) => (
        <div key={index}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
};
