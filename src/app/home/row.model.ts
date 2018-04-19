import {Cell} from './cell.model';

export class Row {
    constructor(public id: number,
                public cells: Cell[]) {
    }
}
