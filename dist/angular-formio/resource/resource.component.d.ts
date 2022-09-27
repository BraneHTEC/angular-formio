import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormioAuthService } from '@formio/angular/auth';
import { FormioResourceService } from './resource.service';
import * as i0 from "@angular/core";
export declare class FormioResourceComponent implements OnInit, OnDestroy {
    service: FormioResourceService;
    route: ActivatedRoute;
    auth: FormioAuthService;
    private paramsSubscription;
    perms: {
        delete: boolean;
        edit: boolean;
    };
    constructor(service: FormioResourceService, route: ActivatedRoute, auth: FormioAuthService);
    ngOnInit(): void;
    init(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioResourceComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioResourceComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=resource.component.d.ts.map