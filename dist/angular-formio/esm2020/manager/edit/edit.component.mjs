import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent } from '@formio/angular';
import _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "../form-manager.config";
import * as i4 from "@formio/angular";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
export class FormManagerEditComponent {
    constructor(service, router, route, config, ref, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.ref = ref;
        this.alerts = alerts;
        this.form = { components: [] };
        this.formReady = false;
        this.loading = false;
        this.editMode = false;
    }
    initBuilder(editing) {
        if (editing) {
            this.loading = true;
            this.editMode = true;
            return this.service.formReady.then(() => {
                this.form = this.service.form;
                this.formTitle.nativeElement.value = this.service.form.title;
                this.formType.nativeElement.value = this.service.form.display || 'form';
                this.formReady = true;
                this.loading = false;
                this.ref.detectChanges();
                return true;
            }).catch(err => {
                this.alerts.setAlert({ type: 'danger', message: (err.message || err) });
                this.loading = false;
                this.ref.detectChanges();
                this.formReady = true;
            });
        }
        else {
            this.formReady = true;
            return Promise.resolve(true);
        }
    }
    ngAfterViewInit() {
        this.route.url.subscribe(url => {
            setTimeout(() => this.initBuilder((url[0].path === 'edit')), 0);
        });
    }
    onDisplaySelect(event) {
        this.builder.setDisplay(event.target.value);
    }
    saveForm() {
        this.loading = true;
        this.form = _.cloneDeep(this.builder.formio.schema);
        this.form.title = this.formTitle.nativeElement.value.trim();
        this.form.display = this.formType.nativeElement.value;
        if (this.config.tag) {
            this.form.tags = this.form.tags || [];
            this.form.tags.push(this.config.tag);
            this.form.tags = _.uniq(this.form.tags);
        }
        if (!this.form._id) {
            this.form.name = _.camelCase(this.form.title).toLowerCase();
            this.form.path = this.form.name;
        }
        return this.service.formio.saveForm(this.form).then(form => {
            this.form = this.service.setForm(form);
            this.loading = false;
            return this.form;
        }).catch(err => {
            this.loading = false;
            // Catch if a form is returned as an error. This is a conflict.
            if (err._id && err.type) {
                throw err;
            }
            this.alerts.setAlert({ type: 'danger', message: (err.message || err) });
        });
    }
    onSave() {
        return this.saveForm().then((form) => {
            if (this.editMode) {
                this.router.navigate(['../', 'view'], { relativeTo: this.route });
            }
            else {
                this.router.navigate(['../', form._id, 'view'], { relativeTo: this.route });
            }
        });
    }
}
FormManagerEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerEditComponent, deps: [{ token: i1.FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormManagerConfig }, { token: i0.ChangeDetectorRef }, { token: i4.FormioAlerts }], target: i0.ɵɵFactoryTarget.Component });
FormManagerEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerEditComponent, selector: "ng-component", viewQueries: [{ propertyName: "builder", first: true, predicate: FormBuilderComponent, descendants: true }, { propertyName: "formTitle", first: true, predicate: ["title"], descendants: true }, { propertyName: "formType", first: true, predicate: ["type"], descendants: true }], ngImport: i0, template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n", dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.FormBuilderComponent, selector: "form-builder", inputs: ["form", "options", "formbuilder", "noeval", "refresh", "rebuild"], outputs: ["change"] }, { kind: "component", type: i4.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "directive", type: i6.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i6.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormManagerConfig }, { type: i0.ChangeDetectorRef }, { type: i4.FormioAlerts }]; }, propDecorators: { builder: [{
                type: ViewChild,
                args: [FormBuilderComponent, { static: false }]
            }], formTitle: [{
                type: ViewChild,
                args: ['title', { static: false }]
            }], formType: [{
                type: ViewChild,
                args: ['type', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9lZGl0L2VkaXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvZWRpdC9lZGl0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFnRCxNQUFNLGVBQWUsQ0FBQztBQUtuRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7O0FBS3ZCLE1BQU0sT0FBTyx3QkFBd0I7SUFTbkMsWUFDUyxPQUEyQixFQUMzQixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsTUFBeUIsRUFDekIsR0FBc0IsRUFDdEIsTUFBb0I7UUFMcEIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFFM0IsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQU87UUFDakIsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENB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SSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDakU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUMzRTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7cUhBOUZVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLDZGQUN4QixvQkFBb0Isd05DWmpDLG03QkFtQkE7MkZEUmEsd0JBQXdCO2tCQUhwQyxTQUFTOztzUEFJMEMsT0FBTztzQkFBeEQsU0FBUzt1QkFBQyxvQkFBb0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBQ1gsU0FBUztzQkFBN0MsU0FBUzt1QkFBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO2dCQUNDLFFBQVE7c0JBQTNDLFNBQVM7dUJBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlclNlcnZpY2UgfSBmcm9tICcuLi9mb3JtLW1hbmFnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtTWFuYWdlckNvbmZpZyB9IGZyb20gJy4uL2Zvcm0tbWFuYWdlci5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtaW9BbGVydHMgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJ0Bmb3JtaW8vYW5ndWxhcic7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vZWRpdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1NYW5hZ2VyRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBWaWV3Q2hpbGQoRm9ybUJ1aWxkZXJDb21wb25lbnQsIHtzdGF0aWM6IGZhbHNlfSkgYnVpbGRlcjogRm9ybUJ1aWxkZXJDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZCgndGl0bGUnLCB7c3RhdGljOiBmYWxzZX0pIGZvcm1UaXRsZTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCd0eXBlJywge3N0YXRpYzogZmFsc2V9KSBmb3JtVHlwZTogRWxlbWVudFJlZjtcclxuICBwdWJsaWMgZm9ybTogYW55O1xyXG4gIHB1YmxpYyBsb2FkaW5nOiBCb29sZWFuO1xyXG4gIHB1YmxpYyBmb3JtUmVhZHk6IEJvb2xlYW47XHJcbiAgcHVibGljIGVkaXRNb2RlOiBCb29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBzZXJ2aWNlOiBGb3JtTWFuYWdlclNlcnZpY2UsXHJcbiAgICBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHVibGljIGNvbmZpZzogRm9ybU1hbmFnZXJDb25maWcsXHJcbiAgICBwdWJsaWMgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHB1YmxpYyBhbGVydHM6IEZvcm1pb0FsZXJ0c1xyXG4gICkge1xyXG4gICAgdGhpcy5mb3JtID0ge2NvbXBvbmVudHM6IFtdfTtcclxuICAgIHRoaXMuZm9ybVJlYWR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGluaXRCdWlsZGVyKGVkaXRpbmcpIHtcclxuICAgIGlmIChlZGl0aW5nKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmZvcm1SZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLnNlcnZpY2UuZm9ybTtcclxuICAgICAgICB0aGlzLmZvcm1UaXRsZS5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5zZXJ2aWNlLmZvcm0udGl0bGU7XHJcbiAgICAgICAgdGhpcy5mb3JtVHlwZS5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5zZXJ2aWNlLmZvcm0uZGlzcGxheSB8fCAnZm9ybSc7XHJcbiAgICAgICAgdGhpcy5mb3JtUmVhZHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydCh7dHlwZTogJ2RhbmdlcicsIG1lc3NhZ2U6IChlcnIubWVzc2FnZSB8fCBlcnIpfSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIHRoaXMuZm9ybVJlYWR5ID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1SZWFkeSA9IHRydWU7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLnJvdXRlLnVybC5zdWJzY3JpYmUoIHVybCA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbml0QnVpbGRlcigodXJsWzBdLnBhdGggPT09ICdlZGl0JykpLCAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25EaXNwbGF5U2VsZWN0KGV2ZW50KSB7XHJcbiAgICB0aGlzLmJ1aWxkZXIuc2V0RGlzcGxheShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUZvcm0oKSB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5mb3JtID0gXy5jbG9uZURlZXAodGhpcy5idWlsZGVyLmZvcm1pby5zY2hlbWEpO1xyXG4gICAgdGhpcy5mb3JtLnRpdGxlID0gdGhpcy5mb3JtVGl0bGUubmF0aXZlRWxlbWVudC52YWx1ZS50cmltKCk7XHJcbiAgICB0aGlzLmZvcm0uZGlzcGxheSA9IHRoaXMuZm9ybVR5cGUubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5jb25maWcudGFnKSB7XHJcbiAgICAgIHRoaXMuZm9ybS50YWdzID0gdGhpcy5mb3JtLnRhZ3MgfHwgW107XHJcbiAgICAgIHRoaXMuZm9ybS50YWdzLnB1c2godGhpcy5jb25maWcudGFnKTtcclxuICAgICAgdGhpcy5mb3JtLnRhZ3MgPSBfLnVuaXEodGhpcy5mb3JtLnRhZ3MpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZvcm0uX2lkKSB7XHJcbiAgICAgIHRoaXMuZm9ybS5uYW1lID0gXy5jYW1lbENhc2UodGhpcy5mb3JtLnRpdGxlKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICB0aGlzLmZvcm0ucGF0aCA9IHRoaXMuZm9ybS5uYW1lO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuc2VydmljZS5mb3JtaW8uc2F2ZUZvcm0odGhpcy5mb3JtKS50aGVuKGZvcm0gPT4ge1xyXG4gICAgICB0aGlzLmZvcm0gPSB0aGlzLnNlcnZpY2Uuc2V0Rm9ybShmb3JtKTtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIHJldHVybiB0aGlzLmZvcm07XHJcbiAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgLy8gQ2F0Y2ggaWYgYSBmb3JtIGlzIHJldHVybmVkIGFzIGFuIGVycm9yLiBUaGlzIGlzIGEgY29uZmxpY3QuXHJcbiAgICAgIGlmIChlcnIuX2lkICYmIGVyci50eXBlKSB7XHJcbiAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0KHt0eXBlOiAnZGFuZ2VyJywgbWVzc2FnZTogKGVyci5tZXNzYWdlIHx8IGVycil9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25TYXZlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2F2ZUZvcm0oKS50aGVuKChmb3JtKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmVkaXRNb2RlKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nLCAndmlldyddLCB7cmVsYXRpdmVUbzogdGhpcy5yb3V0ZX0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJywgZm9ybS5faWQsICd2aWV3J10sIHtyZWxhdGl2ZVRvOiB0aGlzLnJvdXRlfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibG9hZGVyXCIgKm5nSWY9XCJsb2FkaW5nXCI+PC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHJvd1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tOFwiPlxyXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImZvcm1UaXRsZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBUaXRsZVwiICN0aXRsZT5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiY29sLXNtLTJcIj5cclxuICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cImZvcm1TZWxlY3RcIiAoY2hhbmdlKT1cIm9uRGlzcGxheVNlbGVjdCgkZXZlbnQpXCIgI3R5cGU+XHJcbiAgICAgIDxvcHRpb24gdmFsdWU9XCJmb3JtXCI+Rm9ybTwvb3B0aW9uPlxyXG4gICAgICA8b3B0aW9uIHZhbHVlPVwid2l6YXJkXCI+V2l6YXJkPC9vcHRpb24+XHJcbiAgICAgIDxvcHRpb24gdmFsdWU9XCJwZGZcIj5QREY8L29wdGlvbj5cclxuICAgIDwvc2VsZWN0PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtc20tMlwiPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcIiAoY2xpY2spPVwib25TYXZlKClcIj5TYXZlIEZvcm08L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxmb3JtaW8tYWxlcnRzIFthbGVydHNdPVwiYWxlcnRzXCI+PC9mb3JtaW8tYWxlcnRzPlxyXG48Zm9ybS1idWlsZGVyICpuZ0lmPVwiZm9ybVJlYWR5XCIgW2Zvcm1idWlsZGVyXT1cImNvbmZpZy5idWlsZGVyXCIgW2Zvcm1dPVwiZm9ybVwiICNidWlsZGVyPjwvZm9ybS1idWlsZGVyPlxyXG48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgc3R5bGU9XCJtYXJnaW4tdG9wOiAxMHB4O1wiIChjbGljayk9XCJvblNhdmUoKVwiPlNhdmUgRm9ybTwvYnV0dG9uPlxyXG4iXX0=