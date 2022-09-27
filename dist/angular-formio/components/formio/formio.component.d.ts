import { OnInit, NgZone, OnChanges } from '@angular/core';
import { FormioAppConfig } from '../../formio.config';
import { FormioBaseComponent } from '../../FormioBaseComponent';
import { CustomTagsService } from '../../custom-component/custom-tags.service';
import * as i0 from "@angular/core";
export declare class FormioComponent extends FormioBaseComponent implements OnInit, OnChanges {
    ngZone: NgZone;
    config: FormioAppConfig;
    customTags?: CustomTagsService;
    constructor(ngZone: NgZone, config: FormioAppConfig, customTags?: CustomTagsService);
    getRenderer(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioComponent, [null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioComponent, "formio", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=formio.component.d.ts.map