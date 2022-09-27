import { EventEmitter, OnInit } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
import * as i0 from "@angular/core";
export declare class FormioAlertsComponent implements OnInit {
    alerts: FormioAlerts;
    focusComponent: EventEmitter<object>;
    ngOnInit(): void;
    getComponent(event: any, alert: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioAlertsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormioAlertsComponent, "formio-alerts", never, { "alerts": "alerts"; }, { "focusComponent": "focusComponent"; }, never, never, false>;
}
//# sourceMappingURL=formio.alerts.component.d.ts.map