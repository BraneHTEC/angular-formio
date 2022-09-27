import { EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import * as i0 from "@angular/core";
export declare class FormioResourceCreateComponent implements OnInit {
    service: FormioResourceService;
    route: ActivatedRoute;
    router: Router;
    config: FormioResourceConfig;
    onError: EventEmitter<any>;
    onSuccess: EventEmitter<any>;
    constructor(service: FormioResourceService, route: ActivatedRoute, router: Router, config: FormioResourceConfig);
    ngOnInit(): void;
    onSubmit(submission: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioResourceCreateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioResourceCreateComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=create.component.d.ts.map