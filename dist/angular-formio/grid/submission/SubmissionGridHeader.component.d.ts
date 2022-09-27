import { ExtendedComponentSchema } from 'formiojs';
import { GridHeaderComponent } from '../GridHeaderComponent';
import { FormioPromiseService } from '@formio/angular';
import { ComponentInstance } from '@formio/angular';
import { GridColumn } from '../types/grid-column';
import { GridHeader, SortType } from '../types/grid-header';
import * as i0 from "@angular/core";
export declare class SubmissionGridHeaderComponent extends GridHeaderComponent {
    formComponents: Map<string, ExtendedComponentSchema>;
    load(formio: FormioPromiseService, query?: any, columns?: Array<GridColumn>): Promise<GridHeader[]>;
    setHeader(header: GridHeader): void;
    getHeaderForColumn(column: GridColumn, component?: ExtendedComponentSchema, sort?: SortType): {
        label: string;
        key: string;
        sort: SortType;
        component: ComponentInstance;
        renderCell: (cellValue: any, component?: ComponentInstance) => string;
    };
    getHeaderForComponent(component: ExtendedComponentSchema, path: string, sort?: SortType): {
        label: string;
        key: string;
        sort: SortType;
        component: ComponentInstance;
    };
    setComponentsHeaders(components: Map<string, ExtendedComponentSchema>, sort?: SortType): void;
    setComponents(components: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubmissionGridHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubmissionGridHeaderComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=SubmissionGridHeader.component.d.ts.map