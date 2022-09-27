import { EventEmitter, TemplateRef } from '@angular/core';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridService } from './grid.service';
import { FormioPromiseService } from '@formio/angular';
import * as i0 from "@angular/core";
export declare class GridBodyComponent {
    service: GridService;
    header: GridHeaderComponent;
    actionAllowed: any;
    rowSelect: EventEmitter<any>;
    rowAction: EventEmitter<any>;
    template: TemplateRef<any>;
    rows: Array<any>;
    loading: Boolean;
    firstItem: number;
    lastItem: number;
    skip: number;
    limit: number;
    total: number;
    constructor(service: GridService);
    load(formio: FormioPromiseService, query?: any): Promise<any>;
    onRowSelect(event: any, row: any): void;
    onRowAction(event: any, row: any, action: any): void;
    /**
     * Set the rows for this Grid body.
     *
     * @param query
     * @param items
     * @return any
     */
    setRows(query: any, items: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GridBodyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridBodyComponent, "ng-component", never, { "header": "header"; "actionAllowed": "actionAllowed"; }, { "rowSelect": "rowSelect"; "rowAction": "rowAction"; }, never, never, false>;
}
//# sourceMappingURL=GridBodyComponent.d.ts.map