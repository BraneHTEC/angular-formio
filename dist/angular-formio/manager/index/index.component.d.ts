import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormManagerService } from '../form-manager.service';
import { FormManagerConfig } from '../form-manager.config';
import { FormioGridComponent } from '@formio/angular/grid';
import * as i0 from "@angular/core";
export declare class FormManagerIndexComponent implements OnInit {
    service: FormManagerService;
    route: ActivatedRoute;
    router: Router;
    config: FormManagerConfig;
    formGrid: FormioGridComponent;
    gridQuery: any;
    search: string;
    constructor(service: FormManagerService, route: ActivatedRoute, router: Router, config: FormManagerConfig);
    loadGrid(): void;
    ngOnInit(): void;
    onSearch(event?: KeyboardEvent): void;
    clearSearch(): void;
    onAction(action: any): void;
    onSelect(row: any): void;
    onCreateItem(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormManagerIndexComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormManagerIndexComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=index.component.d.ts.map