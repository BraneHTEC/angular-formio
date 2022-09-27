import { ComponentInstance } from '@formio/angular';
export interface GridHeader {
    component?: ComponentInstance;
    key: string;
    sort?: SortType;
    label: string;
    renderCell?(cellValue: any, component?: ComponentInstance): string;
}
export declare enum SortType {
    ASC = "asc",
    DESC = "desc"
}
//# sourceMappingURL=grid-header.d.ts.map