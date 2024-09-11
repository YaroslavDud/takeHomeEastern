"use client";

import { useState } from "react";
import { TreeProps } from "@/app/types";

export const Tree = ({
  category,
  handleRename,
  handleDelete,
  handleAdd,
}: TreeProps) => {
  const [name, setName] = useState(category.name);
  const [isTreeExpanded, setIsTreeExpanded] = useState(false);

  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={() => handleRename(category.id, name)}
          className="bg-blue-500 text-white rounded px-2 py-1"
        >
          Rename
        </button>
        <button
          onClick={() =>
            handleAdd(category.id, {
              id: Math.random().toString(),
              name: `${category.name} child`,
              children: [],
            })
          }
          className="bg-green-500 text-white rounded px-2 py-1"
        >
          Add
        </button>
        <button
          onClick={() => handleDelete(category.id)}
          className="bg-red-500 text-white rounded px-2 py-1"
        >
          Delete
        </button>
        {!!category.children.length && (
          <span
            onClick={() => setIsTreeExpanded(!isTreeExpanded)}
            className="cursor-pointer font-bold"
          >
            {isTreeExpanded ? "▼" : "▶"} {category.name}
          </span>
        )}
      </div>

      {isTreeExpanded && (
        <div className="ml-4">
          {category.children.map((child) => (
            <Tree
              key={child.id}
              category={child}
              handleAdd={handleAdd}
              handleRename={handleRename}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
