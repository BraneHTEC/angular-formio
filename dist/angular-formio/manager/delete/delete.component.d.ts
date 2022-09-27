import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '@formio/angular';
import { GridService } from '@formio/angular/grid';
import * as i0 from "@angular/core";
export declare class FormManagerDeleteComponent {
    managerService: FormManagerService;
    router: Router;
    route: ActivatedRoute;
    alerts: FormioAlerts;
    gridService?: GridService;
    constructor(managerService: FormManagerService, router: Router, route: ActivatedRoute, alerts: FormioAlerts, gridService?: GridService);
    onDelete(): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormManagerDeleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormManagerDeleteComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=delete.component.d.ts.map