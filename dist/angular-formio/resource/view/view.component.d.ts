import { OnDestroy } from '@angular/core';
import { FormioResourceService } from '../resource.service';
import { FormioResourceConfig } from '../resource.config';
import * as i0 from "@angular/core";
export declare class FormioResourceViewComponent implements OnDestroy {
    service: FormioResourceService;
    config: FormioResourceConfig;
    constructor(service: FormioResourceService, config: FormioResourceConfig);
    submission: {
        data: {};
    };
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioResourceViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioResourceViewComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=view.component.d.ts.map