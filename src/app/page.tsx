"use client";

import { Category } from "@/app/types";
import { useEffect, useState } from "react";
import { Tree } from "@/app/components/Tree";
import { loadTree, saveTree } from "@/app/lib/firebase";

export default function Home() {
  const [isTreeTriggered, setIsTreeTriggered] = useState(false);
  const [categoryTree, setCategoryTree] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const loadedTree = await loadTree();

      setCategoryTree(loadedTree);
    })();
  }, []);

  useEffect(() => {
    if (isTreeTriggered) {
      (async () => {
        await saveTree(categoryTree);

        setIsTreeTriggered(false);
      })();
    }
  }, [categoryTree, isTreeTriggered]);

  const handleAdd = (id: string, newCategory: Category) => {
    const addCategory = (categories: Category[]) =>
      categories.map((category) => {
        if (category.id === id) {
          return { ...category, children: [...category.children, newCategory] };
        }
        return { ...category, children: addCategory(category.children) };
      });

    setCategoryTree(addCategory(categoryTree));
    setIsTreeTriggered(true);
  };

  const handleRename = (id: string, name: string) => {
    const renameCategory = (categories: Category[]) =>
      categories.map((category) => {
        if (category.id === id) {
          return { ...category, name };
        }
        return { ...category, children: renameCategory(category.children) };
      });

    setCategoryTree(renameCategory(categoryTree));
    setIsTreeTriggered(true);
  };

  const handleDelete = (id: string) => {
    const deleteCategory = (categories: Category[]) =>
      categories
        .filter((category) => category.id !== id)
        .map((category) => ({
          ...category,
          children: deleteCategory(category.children),
        }));

    setCategoryTree(deleteCategory(categoryTree));
    setIsTreeTriggered(true);
  };

  return (
    <div>
      {categoryTree.map((category) => (
        <Tree
          key={category.id}
          category={category}
          handleAdd={handleAdd}
          handleRename={handleRename}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
