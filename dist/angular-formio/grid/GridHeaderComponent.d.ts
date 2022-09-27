import { EventEmitter, TemplateRef } from '@angular/core';
import { FormioPromiseService } from '@formio/angular';
import { GridHeader } from './types/grid-header';
import * as i0 from "@angular/core";
export declare class GridHeaderComponent {
    actionAllowed: any;
    sort: EventEmitter<GridHeader>;
    template: TemplateRef<any>;
    headers: Array<GridHeader>;
    constructor();
    get numHeaders(): number;
    load(formio: FormioPromiseService, query?: any, columns?: Array<any>): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridHeaderComponent, "ng-component", never, { "actionAllowed": "actionAllowed"; }, { "sort": "sort"; }, never, never, false>;
}
//# sourceMappingURL=GridHeaderComponent.d.ts.map