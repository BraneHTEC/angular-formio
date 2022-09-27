import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormManagerService } from '../form-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormManagerConfig } from '../form-manager.config';
import { FormioAlerts } from '@formio/angular';
import { FormBuilderComponent } from '@formio/angular';
import * as i0 from "@angular/core";
export declare class FormManagerEditComponent implements AfterViewInit {
    service: FormManagerService;
    router: Router;
    route: ActivatedRoute;
    config: FormManagerConfig;
    ref: ChangeDetectorRef;
    alerts: FormioAlerts;
    builder: FormBuilderComponent;
    formTitle: ElementRef;
    formType: ElementRef;
    form: any;
    loading: Boolean;
    formReady: Boolean;
    editMode: Boolean;
    constructor(service: FormManagerService, router: Router, route: ActivatedRoute, config: FormManagerConfig, ref: ChangeDetectorRef, alerts: FormioAlerts);
    initBuilder(editing: any): Promise<boolean | void>;
    ngAfterViewInit(): void;
    onDisplaySelect(event: any): void;
    saveForm(): any;
    onSave(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormManagerEditComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormManagerEditComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=edit.component.d.ts.map