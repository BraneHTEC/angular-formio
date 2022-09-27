import { EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import * as i0 from "@angular/core";
export declare class FormioResourceEditComponent implements OnDestroy {
    service: FormioResourceService;
    route: ActivatedRoute;
    router: Router;
    config: FormioResourceConfig;
    triggerError: EventEmitter<any>;
    submission: {
        data: {};
    };
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router, config: FormioResourceConfig);
    onSubmit(submission: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioResourceEditComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioResourceEditComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=edit.component.d.ts.map