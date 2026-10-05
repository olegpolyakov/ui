export interface Item {
    id: string;
    content?: string;
    children: Item[];
    collapsed?: boolean;
}

export interface FlattenedItem extends Item {
    depth: number;
    index: number;
    parentId: string | null;
}