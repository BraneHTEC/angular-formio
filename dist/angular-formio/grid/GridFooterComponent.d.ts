import { GridFooterPositions } from './types/grid-footer-positions';
import { TemplateRef, EventEmitter } from '@angular/core';
import { GridHeaderComponent } from './GridHeaderComponent';
import { GridBodyComponent } from './GridBodyComponent';
import * as i0 from "@angular/core";
export declare class GridFooterComponent {
    header: GridHeaderComponent;
    body: GridBodyComponent;
    createText: String;
    size: number;
    actionAllowed: any;
    pageChanged: EventEmitter<any>;
    createItem: EventEmitter<any>;
    template: TemplateRef<any>;
    footerPositions: typeof GridFooterPositions;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<GridFooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridFooterComponent, "ng-component", never, { "header": "header"; "body": "body"; "createText": "createText"; "size": "size"; "actionAllowed": "actionAllowed"; }, { "pageChanged": "pageChanged"; "createItem": "createItem"; }, never, never, false>;
}
//# sourceMappingURL=GridFooterComponent.d.ts.map