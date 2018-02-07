import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Row} from './row.model';
import {Range, Interval} from './range.model';

@Injectable()
export class RangeService {
    rows: Row[];
    ranges: Range[];
    table: Array<string>[];

    constructor() {
        this.ranges = [
            {
                id: 1, intervals: [
                {id: 0, color: 'table-warning', cells: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
                {id: 1, color: 'table-default', cells: [0]},
                {id: 1, color: 'table-warning', cells: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
                {id: 2, color: 'table-default', cells: [0, 1]},
                {id: 2, color: 'table-warning', cells: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
                {id: 3, color: 'table-default', cells: [0, 1, 2]},
                {id: 3, color: 'table-warning', cells: [4, 5, 6, 7, 8, 9, 10, 11, 12]},
                {id: 4, color: 'table-default', cells: [0, 1, 2, 3]},
                {id: 4, color: 'table-warning', cells: [5, 6, 7, 8, 9, 10, 11, 12]},
                {id: 5, color: 'table-default', cells: [0, 1, 2, 3, 4]},
                {id: 5, color: 'table-warning', cells: [6, 7, 8, 9, 10, 11, 12]},
                {id: 6, color: 'table-default', cells: [0, 1, 2, 3, 4, 5]},
                {id: 6, color: 'table-warning', cells: [7, 8, 9, 10, 11, 12]},
                {id: 7, color: 'table-default', cells: [0, 1, 2, 3, 4, 5, 6]},
                {id: 7, color: 'table-warning', cells: [8, 9, 10, 11, 12]},
                {id: 8, color: 'table-default', cells: [0, 1, 2, 3, 4, 5, 6, 7]},
                {id: 8, color: 'table-warning', cells: [9, 10, 11, 12]},
                {id: 9, color: 'table-default', cells: [0, 1, 2, 3, 4, 5, 6, 7, 8]},
                {id: 9, color: 'table-warning', cells: [10, 11, 12]},
                {id: 10, color: 'table-default', cells: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
                {id: 10, color: 'table-warning', cells: [11, 12]},
                {id: 11, color: 'table-default', cells: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
                {id: 11, color: 'table-warning', cells: [12]},
                {id: 12, color: 'table-default', cells: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
            ]
            },
            {
                id: 14, intervals: [
                {id: 1, color: 'table-primary', cells: [1, 2, 3]}
            ]
            },
            {
                id: 24, intervals: [
                {id: 2, color: 'table-info', cells: [1, 4, 5]},
                {id: 3, color: 'table-warning', cells: [1, 2, 12]}

            ]
            }
        ];
        this.table = [
            ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
            ['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
            ['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
            ['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
            ['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
            ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
            ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
            ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
            ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
            ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
            ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
            ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
            ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22'],
        ];
    }

    /**
     * Pinta as celulas de acordo com o intervalo de celulas passado
     * @param intervals
     */
    paint(intervals: Interval[]): void {
        intervals.forEach((interval) => {
            const row = this.rows.find(x => x.id === interval.id);
            interval.cells.forEach((cell) => {
                const ce = row.cells.find(c => c.id === cell);
                ce.color = interval.color;
            });
        });
    }

    /**
     * Busca o range de linhas e celulas a serem pintadas
     * @param id
     * @returns {Range}
     */
    getRange(id: number): Range {
        return this.ranges.find(r => r.id === id);
    }

    /**
     * Cria a tabela
     * @returns {Row[]}
     */
    create(color: string = 'table-success'): Row[] {
        return this.table.map((rows, index) => {
            const cells: any[] = [];
            rows.map((cols, i) => {
                cells.push({id: i, name: cols, color: color});
            });
            return new Row(index, cells);
        });
    }

    /**
     * Busca as linhas da tabela a ser pintada
     *
     * @return Observable<Row[]>
     */
    getRows(color: string = 'table-success'): Observable<Row[]> {
        this.rows = this.create(color);
        return new Observable(observable => {
            observable.next(this.rows);
            observable.complete();
        });
    }
}
