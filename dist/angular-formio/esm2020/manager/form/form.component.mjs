import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../form-manager.service";
import * as i2 from "@angular/router";
import * as i3 from "@formio/angular";
import * as i4 from "../form-manager.config";
import * as i5 from "ngx-bootstrap/modal";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class FormManagerFormComponent {
    constructor(service, route, appConfig, options, modalService) {
        this.service = service;
        this.route = route;
        this.appConfig = appConfig;
        this.options = options;
        this.modalService = modalService;
        this.choice = 'isUrl';
        this.goTo = '';
    }
    ngOnInit() {
        this.service.reset(this.route);
        this.service.loadForm().then(form => {
            this.service.formSrc = this.appConfig.appUrl + '/' + form.path;
            this.projectId = form.project;
            this.pathName = form.path;
            this.getShareUrl();
        });
    }
    getShareUrl() {
        const src = this.appConfig.appUrl + '/' + this.pathName;
        this.shareUrl = `${this.options.viewer}/#/?src=${encodeURIComponent(src)}`;
        return this.shareUrl;
    }
    openEmbed(content) {
        let goto = '';
        if (this.goTo) {
            goto += `if (d && d.formSubmission && d.formSubmission._id) { window.location.href = "${this.goTo}";}`;
        }
        let embedCode = '<script type="text/javascript">';
        embedCode += '(function a(d, w, u) {';
        embedCode += 'var h = d.getElementsByTagName("head")[0];';
        embedCode += 'var s = d.createElement("script");';
        embedCode += 's.type = "text/javascript";';
        embedCode += 's.src = "' + this.options.viewer + '/assets/lib/seamless/seamless.parent.min.js";';
        embedCode += 's.onload = function b() {';
        embedCode += 'var f = d.getElementById("formio-form-' + this.service.formio.formId + '");';
        embedCode += 'if (!f || (typeof w.seamless === u)) {';
        embedCode += 'return setTimeout(b, 100);';
        embedCode += '}';
        embedCode += 'w.seamless(f, {fallback:false}).receive(function(d, e) {' + goto + '});';
        embedCode += '};';
        embedCode += 'h.appendChild(s);';
        embedCode += '})(document, window);';
        embedCode += '</script>';
        embedCode += '<iframe id="formio-form-' + this.service.formio.formId + '" ';
        embedCode += 'style="width:100%;border:none;" height="800px" src="' + this.shareUrl + '&iframe=1"></iframe>';
        this.embedCode = embedCode;
        this.modalRef = this.modalService.show(content, { class: 'modal-lg' });
    }
    choices(string) {
        this.choice = string;
    }
}
FormManagerFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerFormComponent, deps: [{ token: i1.FormManagerService }, { token: i2.ActivatedRoute }, { token: i3.FormioAppConfig }, { token: i4.FormManagerConfig }, { token: i5.BsModalService }], target: i0.ɵɵFactoryTarget.Component });
FormManagerFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerFormComponent, selector: "ng-component", ngImport: i0, template: "<button *ngIf=\"options.viewer\" class=\"pull-right btn btn-outline-primary\" (click)=\"openEmbed(content)\"><em class=\"fa fa-share-alt glyphicon glyphicon-share\"></em> Share</button>\r\n<ul class=\"nav nav-tabs mb-2\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><em class=\"fa fa-pencil glyphicon glyphicon-pencil\"></em> Enter Data</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"submission\" routerLinkActive=\"active\"><em class=\"fa fa-list-alt glyphicon glyphicon-list-alt\"></em> View Data</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formEdit')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><em class=\"fa fa-edit glyphicon glyphicon-edit\"></em> Edit Form</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formDelete')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n<ng-template #content>\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">Share or Embed this form</h4>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <ul class=\"nav nav-tabs mr-auto mb-2\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isUrl'}\" (click)=\"choices('isUrl')\"><em class=\"fa fa-link\"></em> URL</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isEmbed'}\" (click)=\"choices('isEmbed')\"><em class=\"fa fa-code\"></em> Embed</a>\r\n      </li>\r\n    </ul>\r\n    <pre  *ngIf=\"choice === 'isEmbed'\"><textarea onclick=\"this.focus();this.select()\" readonly=\"readonly\" style=\"width:100%;\" rows=\"8\" [ngModel]=\"embedCode\"></textarea></pre>\r\n    <input *ngIf=\"choice === 'isUrl'\" type=\"text\" onclick=\"this.focus();this.select()\" readonly=\"readonly\" class=\"form-control\" [ngModel]=\"shareUrl\" placeholder=\"https://examples.form.io/example\">\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modalRef.hide()\">Close</button>\r\n  </div>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerFormComponent, decorators: [{
            type: Component,
            args: [{ template: "<button *ngIf=\"options.viewer\" class=\"pull-right btn btn-outline-primary\" (click)=\"openEmbed(content)\"><em class=\"fa fa-share-alt glyphicon glyphicon-share\"></em> Share</button>\r\n<ul class=\"nav nav-tabs mb-2\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><em class=\"fa fa-pencil glyphicon glyphicon-pencil\"></em> Enter Data</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"submission\" routerLinkActive=\"active\"><em class=\"fa fa-list-alt glyphicon glyphicon-list-alt\"></em> View Data</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formEdit')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><em class=\"fa fa-edit glyphicon glyphicon-edit\"></em> Edit Form</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formDelete')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n<ng-template #content>\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">Share or Embed this form</h4>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <ul class=\"nav nav-tabs mr-auto mb-2\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isUrl'}\" (click)=\"choices('isUrl')\"><em class=\"fa fa-link\"></em> URL</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isEmbed'}\" (click)=\"choices('isEmbed')\"><em class=\"fa fa-code\"></em> Embed</a>\r\n      </li>\r\n    </ul>\r\n    <pre  *ngIf=\"choice === 'isEmbed'\"><textarea onclick=\"this.focus();this.select()\" readonly=\"readonly\" style=\"width:100%;\" rows=\"8\" [ngModel]=\"embedCode\"></textarea></pre>\r\n    <input *ngIf=\"choice === 'isUrl'\" type=\"text\" onclick=\"this.focus();this.select()\" readonly=\"readonly\" class=\"form-control\" [ngModel]=\"shareUrl\" placeholder=\"https://examples.form.io/example\">\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modalRef.hide()\">Close</button>\r\n  </div>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: i1.FormManagerService }, { type: i2.ActivatedRoute }, { type: i3.FormioAppConfig }, { type: i4.FormManagerConfig }, { type: i5.BsModalService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9mb3JtL2Zvcm0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vbWFuYWdlci9zcmMvZm9ybS9mb3JtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXVCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7QUFVL0QsTUFBTSxPQUFPLHdCQUF3QjtJQVFuQyxZQUNTLE9BQTJCLEVBQzNCLEtBQXFCLEVBQ3JCLFNBQTBCLEVBQzFCLE9BQTBCLEVBQ3pCLFlBQTRCO1FBSjdCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQVp0QyxXQUFNLEdBQVEsT0FBTyxDQUFDO1FBS3RCLFNBQUksR0FBUSxFQUFFLENBQUM7SUFRWCxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMvRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sV0FBVyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQXlCO1FBQ2pDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksSUFBSSxnRkFBZ0YsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDO1NBQ3hHO1FBQ0QsSUFBSSxTQUFTLEdBQUcsaUNBQWlDLENBQUM7UUFDbEQsU0FBUyxJQUFJLHdCQUF3QixDQUFDO1FBQ3RDLFNBQVMsSUFBTyw0Q0FBNEMsQ0FBQztRQUM3RCxTQUFTLElBQU8sb0NBQW9DLENBQUM7UUFDckQsU0FBUyxJQUFPLDZCQUE2QixDQUFDO1FBQzlDLFNBQVMsSUFBTyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsK0NBQStDLENBQUM7UUFDcEcsU0FBUyxJQUFPLDJCQUEyQixDQUFDO1FBQzVDLFNBQVMsSUFBVSx3Q0FBd0MsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pHLFNBQVMsSUFBVSx3Q0FBd0MsQ0FBQztRQUM1RCxTQUFTLElBQWEsNEJBQTRCLENBQUM7UUFDbkQsU0FBUyxJQUFVLEdBQUcsQ0FBQztRQUN2QixTQUFTLElBQVUsMERBQTBELEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUM3RixTQUFTLElBQU8sSUFBSSxDQUFDO1FBQ3JCLFNBQVMsSUFBTyxtQkFBbUIsQ0FBQztRQUNwQyxTQUFTLElBQUksdUJBQXVCLENBQUM7UUFDckMsU0FBUyxJQUFJLFdBQVcsQ0FBQztRQUN6QixTQUFTLElBQUksMEJBQTBCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUM1RSxTQUFTLElBQVEsc0RBQXNELEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztRQUNqSCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTTtRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7O3FIQTdEVSx3QkFBd0I7eUdBQXhCLHdCQUF3QixvRENWckMseW9GQWdDQTsyRkR0QmEsd0JBQXdCO2tCQUhwQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1NYW5hZ2VyU2VydmljZSB9IGZyb20gJy4uL2Zvcm0tbWFuYWdlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJDb25maWcgfSBmcm9tICcuLi9mb3JtLW1hbmFnZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtaW9BcHBDb25maWcgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBCc01vZGFsU2VydmljZSwgQnNNb2RhbFJlZiB9IGZyb20gJ25neC1ib290c3RyYXAvbW9kYWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0uY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtTWFuYWdlckZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIGNob2ljZTogYW55ID0gJ2lzVXJsJztcclxuICBlbWJlZENvZGU6IGFueTtcclxuICBzaGFyZVVybDogYW55O1xyXG4gIHByb2plY3RJZDogYW55O1xyXG4gIHBhdGhOYW1lOiBhbnk7XHJcbiAgZ29UbzogYW55ID0gJyc7XHJcbiAgbW9kYWxSZWY6IEJzTW9kYWxSZWY7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgc2VydmljZTogRm9ybU1hbmFnZXJTZXJ2aWNlLFxyXG4gICAgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHB1YmxpYyBhcHBDb25maWc6IEZvcm1pb0FwcENvbmZpZyxcclxuICAgIHB1YmxpYyBvcHRpb25zOiBGb3JtTWFuYWdlckNvbmZpZyxcclxuICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBCc01vZGFsU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZXJ2aWNlLnJlc2V0KHRoaXMucm91dGUpO1xyXG4gICAgdGhpcy5zZXJ2aWNlLmxvYWRGb3JtKCkudGhlbihmb3JtID0+IHtcclxuICAgICAgdGhpcy5zZXJ2aWNlLmZvcm1TcmMgPSB0aGlzLmFwcENvbmZpZy5hcHBVcmwgKyAnLycgKyBmb3JtLnBhdGg7XHJcbiAgICAgIHRoaXMucHJvamVjdElkID0gZm9ybS5wcm9qZWN0O1xyXG4gICAgICB0aGlzLnBhdGhOYW1lID0gZm9ybS5wYXRoO1xyXG4gICAgICB0aGlzLmdldFNoYXJlVXJsKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTaGFyZVVybCgpIHtcclxuICAgIGNvbnN0IHNyYyA9IHRoaXMuYXBwQ29uZmlnLmFwcFVybCArICcvJyArIHRoaXMucGF0aE5hbWU7XHJcbiAgICB0aGlzLnNoYXJlVXJsID0gYCR7dGhpcy5vcHRpb25zLnZpZXdlcn0vIy8/c3JjPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNyYyl9YDtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlVXJsO1xyXG4gIH1cclxuXHJcbiAgb3BlbkVtYmVkKGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4pIHtcclxuICAgIGxldCBnb3RvID0gJyc7XHJcbiAgICBpZiAodGhpcy5nb1RvKSB7XHJcbiAgICAgIGdvdG8gKz0gYGlmIChkICYmIGQuZm9ybVN1Ym1pc3Npb24gJiYgZC5mb3JtU3VibWlzc2lvbi5faWQpIHsgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiR7dGhpcy5nb1RvfVwiO31gO1xyXG4gICAgfVxyXG4gICAgbGV0IGVtYmVkQ29kZSA9ICc8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj4nO1xyXG4gICAgZW1iZWRDb2RlICs9ICcoZnVuY3Rpb24gYShkLCB3LCB1KSB7JztcclxuICAgIGVtYmVkQ29kZSArPSAgICAndmFyIGggPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTsnO1xyXG4gICAgZW1iZWRDb2RlICs9ICAgICd2YXIgcyA9IGQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTsnO1xyXG4gICAgZW1iZWRDb2RlICs9ICAgICdzLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiOyc7XHJcbiAgICBlbWJlZENvZGUgKz0gICAgJ3Muc3JjID0gXCInICsgdGhpcy5vcHRpb25zLnZpZXdlciArICcvYXNzZXRzL2xpYi9zZWFtbGVzcy9zZWFtbGVzcy5wYXJlbnQubWluLmpzXCI7JztcclxuICAgIGVtYmVkQ29kZSArPSAgICAncy5vbmxvYWQgPSBmdW5jdGlvbiBiKCkgeyc7XHJcbiAgICBlbWJlZENvZGUgKz0gICAgICAgJ3ZhciBmID0gZC5nZXRFbGVtZW50QnlJZChcImZvcm1pby1mb3JtLScgKyB0aGlzLnNlcnZpY2UuZm9ybWlvLmZvcm1JZCArICdcIik7JztcclxuICAgIGVtYmVkQ29kZSArPSAgICAgICAnaWYgKCFmIHx8ICh0eXBlb2Ygdy5zZWFtbGVzcyA9PT0gdSkpIHsnO1xyXG4gICAgZW1iZWRDb2RlICs9ICAgICAgICAgICdyZXR1cm4gc2V0VGltZW91dChiLCAxMDApOyc7XHJcbiAgICBlbWJlZENvZGUgKz0gICAgICAgJ30nO1xyXG4gICAgZW1iZWRDb2RlICs9ICAgICAgICd3LnNlYW1sZXNzKGYsIHtmYWxsYmFjazpmYWxzZX0pLnJlY2VpdmUoZnVuY3Rpb24oZCwgZSkgeycgKyBnb3RvICsgJ30pOyc7XHJcbiAgICBlbWJlZENvZGUgKz0gICAgJ307JztcclxuICAgIGVtYmVkQ29kZSArPSAgICAnaC5hcHBlbmRDaGlsZChzKTsnO1xyXG4gICAgZW1iZWRDb2RlICs9ICd9KShkb2N1bWVudCwgd2luZG93KTsnO1xyXG4gICAgZW1iZWRDb2RlICs9ICc8L3NjcmlwdD4nO1xyXG4gICAgZW1iZWRDb2RlICs9ICc8aWZyYW1lIGlkPVwiZm9ybWlvLWZvcm0tJyArIHRoaXMuc2VydmljZS5mb3JtaW8uZm9ybUlkICsgJ1wiICc7XHJcbiAgICBlbWJlZENvZGUgKz0gICAgICdzdHlsZT1cIndpZHRoOjEwMCU7Ym9yZGVyOm5vbmU7XCIgaGVpZ2h0PVwiODAwcHhcIiBzcmM9XCInICsgdGhpcy5zaGFyZVVybCArICcmaWZyYW1lPTFcIj48L2lmcmFtZT4nO1xyXG4gICAgdGhpcy5lbWJlZENvZGUgPSBlbWJlZENvZGU7XHJcbiAgICB0aGlzLm1vZGFsUmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvdyhjb250ZW50LCB7IGNsYXNzOiAnbW9kYWwtbGcnIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hvaWNlcyhzdHJpbmcpIHtcclxuICAgIHRoaXMuY2hvaWNlID0gc3RyaW5nO1xyXG4gIH1cclxufVxyXG4iLCI8YnV0dG9uICpuZ0lmPVwib3B0aW9ucy52aWV3ZXJcIiBjbGFzcz1cInB1bGwtcmlnaHQgYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnlcIiAoY2xpY2spPVwib3BlbkVtYmVkKGNvbnRlbnQpXCI+PGVtIGNsYXNzPVwiZmEgZmEtc2hhcmUtYWx0IGdseXBoaWNvbiBnbHlwaGljb24tc2hhcmVcIj48L2VtPiBTaGFyZTwvYnV0dG9uPlxyXG48dWwgY2xhc3M9XCJuYXYgbmF2LXRhYnMgbWItMlwiPlxyXG4gIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtbGlua1wiIHJvdXRlckxpbms9XCIuLi9cIj48ZW0gY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnQgZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWxlZnRcIj48L2VtPjwvYT48L2xpPlxyXG4gIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCIgcm91dGVyTGlua0FjdGl2ZT1cImFjdGl2ZVwiPjxhIGNsYXNzPVwibmF2LWxpbmtcIiByb3V0ZXJMaW5rPVwidmlld1wiIHJvdXRlckxpbmtBY3RpdmU9XCJhY3RpdmVcIj48ZW0gY2xhc3M9XCJmYSBmYS1wZW5jaWwgZ2x5cGhpY29uIGdseXBoaWNvbi1wZW5jaWxcIj48L2VtPiBFbnRlciBEYXRhPC9hPjwvbGk+XHJcbiAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlXCI+PGEgY2xhc3M9XCJuYXYtbGlua1wiIHJvdXRlckxpbms9XCJzdWJtaXNzaW9uXCIgcm91dGVyTGlua0FjdGl2ZT1cImFjdGl2ZVwiPjxlbSBjbGFzcz1cImZhIGZhLWxpc3QtYWx0IGdseXBoaWNvbiBnbHlwaGljb24tbGlzdC1hbHRcIj48L2VtPiBWaWV3IERhdGE8L2E+PC9saT5cclxuICA8bGkgKm5nSWY9XCJzZXJ2aWNlLmFjdGlvbkFsbG93ZWQoJ2Zvcm1FZGl0JylcIiBjbGFzcz1cIm5hdi1pdGVtXCIgcm91dGVyTGlua0FjdGl2ZT1cImFjdGl2ZVwiPjxhIGNsYXNzPVwibmF2LWxpbmtcIiByb3V0ZXJMaW5rPVwiZWRpdFwiIHJvdXRlckxpbmtBY3RpdmU9XCJhY3RpdmVcIj48ZW0gY2xhc3M9XCJmYSBmYS1lZGl0IGdseXBoaWNvbiBnbHlwaGljb24tZWRpdFwiPjwvZW0+IEVkaXQgRm9ybTwvYT48L2xpPlxyXG4gIDxsaSAqbmdJZj1cInNlcnZpY2UuYWN0aW9uQWxsb3dlZCgnZm9ybURlbGV0ZScpXCIgY2xhc3M9XCJuYXYtaXRlbVwiIHJvdXRlckxpbmtBY3RpdmU9XCJhY3RpdmVcIj48YSBjbGFzcz1cIm5hdi1saW5rXCIgcm91dGVyTGluaz1cImRlbGV0ZVwiIHJvdXRlckxpbmtBY3RpdmU9XCJhY3RpdmVcIj48c3BhbiBjbGFzcz1cImZhIGZhLXRyYXNoIGdseXBoaWNvbiBnbHlwaGljb24tdHJhc2hcIj48L3NwYW4+PC9hPjwvbGk+XHJcbjwvdWw+XHJcbjxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cclxuPG5nLXRlbXBsYXRlICNjb250ZW50PlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+U2hhcmUgb3IgRW1iZWQgdGhpcyBmb3JtPC9oND5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwibW9kYWxSZWYuaGlkZSgpXCI+XHJcbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgPHVsIGNsYXNzPVwibmF2IG5hdi10YWJzIG1yLWF1dG8gbWItMlwiPlxyXG4gICAgICA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPlxyXG4gICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGNob2ljZSA9PT0gJ2lzVXJsJ31cIiAoY2xpY2spPVwiY2hvaWNlcygnaXNVcmwnKVwiPjxlbSBjbGFzcz1cImZhIGZhLWxpbmtcIj48L2VtPiBVUkw8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+XHJcbiAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogY2hvaWNlID09PSAnaXNFbWJlZCd9XCIgKGNsaWNrKT1cImNob2ljZXMoJ2lzRW1iZWQnKVwiPjxlbSBjbGFzcz1cImZhIGZhLWNvZGVcIj48L2VtPiBFbWJlZDwvYT5cclxuICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8cHJlICAqbmdJZj1cImNob2ljZSA9PT0gJ2lzRW1iZWQnXCI+PHRleHRhcmVhIG9uY2xpY2s9XCJ0aGlzLmZvY3VzKCk7dGhpcy5zZWxlY3QoKVwiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBzdHlsZT1cIndpZHRoOjEwMCU7XCIgcm93cz1cIjhcIiBbbmdNb2RlbF09XCJlbWJlZENvZGVcIj48L3RleHRhcmVhPjwvcHJlPlxyXG4gICAgPGlucHV0ICpuZ0lmPVwiY2hvaWNlID09PSAnaXNVcmwnXCIgdHlwZT1cInRleHRcIiBvbmNsaWNrPVwidGhpcy5mb2N1cygpO3RoaXMuc2VsZWN0KClcIiByZWFkb25seT1cInJlYWRvbmx5XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbbmdNb2RlbF09XCJzaGFyZVVybFwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9leGFtcGxlcy5mb3JtLmlvL2V4YW1wbGVcIj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGlnaHRcIiAoY2xpY2spPVwibW9kYWxSZWYuaGlkZSgpXCI+Q2xvc2U8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19