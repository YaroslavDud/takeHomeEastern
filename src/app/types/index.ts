export type Category = {
    id: string;
    name: string;
    children: Category[];
}

export type TreeProps ={
    category: Category;
    handleAdd: (id: string, newCategory: Category) => void;
    handleRename: (id: string, name: string) => void;
    handleDelete: (id: string) => void;
}