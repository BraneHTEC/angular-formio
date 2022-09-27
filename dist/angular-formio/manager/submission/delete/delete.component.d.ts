import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioAlerts } from '@formio/angular';
import * as i0 from "@angular/core";
export declare class SubmissionDeleteComponent {
    service: FormManagerService;
    router: Router;
    route: ActivatedRoute;
    alerts: FormioAlerts;
    constructor(service: FormManagerService, router: Router, route: ActivatedRoute, alerts: FormioAlerts);
    onDelete(): void;
    onCancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubmissionDeleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubmissionDeleteComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=delete.component.d.ts.map