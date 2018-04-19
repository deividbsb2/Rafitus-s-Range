import { Category } from '../category/category.model';
import { Column } from '../column/column.model';
import { Type } from '../type/type.model';
import { Cell } from '../home/cell.model';

export class Setting {
    id: number;
    column: Column;
    columnId: number;
    categoryId: number;
    category: Category;
    type: Type;
    typeId: number;
    cells: Cell[];
}

