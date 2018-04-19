export interface Interval {
    id: number;
    color: string;
    cells: Array<number>;
}
export class Range {
    constructor(public id: number,
                public intervals: Interval[]) {
    }
}
