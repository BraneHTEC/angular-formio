import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormioAlerts } from './formio.alerts';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./parse-html-content.pipe";
export class FormioAlertsComponent {
    constructor() {
        this.focusComponent = new EventEmitter();
    }
    ngOnInit() {
        if (!this.alerts) {
            this.alerts = new FormioAlerts();
        }
    }
    getComponent(event, alert) {
        this.focusComponent.emit(alert.component.key);
    }
}
FormioAlertsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAlertsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FormioAlertsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioAlertsComponent, selector: "formio-alerts", inputs: { alerts: "alerts" }, outputs: { focusComponent: "focusComponent" }, ngImport: i0, template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">\r\n  {{alert.message | parseHtmlContent}}\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: i2.ParseHtmlContentPipe, name: "parseHtmlContent" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAlertsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-alerts', template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">\r\n  {{alert.message | parseHtmlContent}}\r\n</div>\r\n" }]
        }], propDecorators: { alerts: [{
                type: Input
            }], focusComponent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY29tcG9uZW50cy9hbGVydHMvZm9ybWlvLmFsZXJ0cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQU0vQyxNQUFNLE9BQU8scUJBQXFCO0lBSmxDO1FBTVksbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0tBU3ZEO0lBUkMsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFDRCxZQUFZLENBQUUsS0FBSyxFQUFFLEtBQUs7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDOztrSEFWVSxxQkFBcUI7c0dBQXJCLHFCQUFxQixrSUNQbEMsbU1BR0E7MkZESWEscUJBQXFCO2tCQUpqQyxTQUFTOytCQUNFLGVBQWU7OEJBSWhCLE1BQU07c0JBQWQsS0FBSztnQkFDSSxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnLi9mb3JtaW8uYWxlcnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZm9ybWlvLWFsZXJ0cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm1pby5hbGVydHMuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9BbGVydHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFsZXJ0czogRm9ybWlvQWxlcnRzO1xyXG4gIEBPdXRwdXQoKSBmb2N1c0NvbXBvbmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLmFsZXJ0cykge1xyXG4gICAgICB0aGlzLmFsZXJ0cyA9IG5ldyBGb3JtaW9BbGVydHMoKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q29tcG9uZW50IChldmVudCwgYWxlcnQpIHtcclxuICAgIHRoaXMuZm9jdXNDb21wb25lbnQuZW1pdChhbGVydC5jb21wb25lbnQua2V5KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiAqbmdGb3I9XCJsZXQgYWxlcnQgb2YgYWxlcnRzLmFsZXJ0c1wiIGNsYXNzPVwiYWxlcnQgYWxlcnQte3sgYWxlcnQudHlwZSB9fVwiIHJvbGU9XCJhbGVydFwiIChjbGljayk9XCJnZXRDb21wb25lbnQoJGV2ZW50LCBhbGVydClcIj5cclxuICB7e2FsZXJ0Lm1lc3NhZ2UgfCBwYXJzZUh0bWxDb250ZW50fX1cclxuPC9kaXY+XHJcbiJdfQ==