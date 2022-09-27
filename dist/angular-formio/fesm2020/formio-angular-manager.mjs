import * as i0 from '@angular/core';
import { Injectable, Component, ViewChild, EventEmitter, NgModule } from '@angular/core';
import { Formio } from 'formiojs';
import _intersection from 'lodash/intersection';
import * as i3 from '@formio/angular';
import { FormBuilderComponent, extendRouter, FormioModule } from '@formio/angular';
import * as i3$1 from '@formio/angular/auth';
import * as i4 from '@formio/angular/grid';
import { FormioGridComponent, FormioGrid } from '@formio/angular/grid';
import _, { debounce } from 'lodash';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i6 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i5$1 from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import * as i2$1 from 'ngx-bootstrap/pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';

class FormManagerConfig {
    constructor() {
        this.tag = '';
        this.includeSearch = false;
        this.saveDraft = false;
    }
}
FormManagerConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormManagerConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerConfig });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerConfig, decorators: [{
            type: Injectable
        }] });

class FormManagerService {
    constructor(appConfig, config, auth) {
        this.appConfig = appConfig;
        this.config = config;
        this.auth = auth;
        this.form = null;
        this.formSrc = '';
        this.perms = { delete: false, edit: false };
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.allAccessMap = {
            'update_all': 'formEdit',
            'delete_all': 'formDelete'
        };
        this.ownAccessMap = {
            'update_own': 'formEdit',
            'delete_own': 'formDelete'
        };
        this.actionAllowed = (action) => this.isActionAllowed(action);
        this.reset();
    }
    isActionAllowed(action) {
        return this.access[action];
    }
    setAccess() {
        this.access = {
            formCreate: true,
            formView: true,
            formSubmission: true,
            formEdit: true,
            formPermission: true,
            formDelete: true,
            projectSettings: true,
            userManagement: true
        };
        if (this.auth) {
            this.access = {
                formCreate: false,
                formView: false,
                formSubmission: false,
                formEdit: false,
                formPermission: false,
                formDelete: false,
                projectSettings: false,
                userManagement: false
            };
            this.ready = this.auth.ready.then(() => {
                let administrator = this.auth.roles["administrator"];
                let formbuilder = this.auth.roles["formbuilder"];
                let formadmin = this.auth.roles["formadmin"];
                if (this.auth.user && this.auth.user.roles) {
                    this.auth.user.roles.forEach((roleId) => {
                        if (administrator._id === roleId) {
                            this.access.formCreate = true;
                            this.access.formView = true;
                            this.access.formSubmission = true;
                            this.access.formEdit = true;
                            this.access.formPermission = true;
                            this.access.formDelete = true;
                            this.access.projectSettings = true;
                            this.access.userManagement = true;
                        }
                        else {
                            if (formadmin._id === roleId) {
                                this.access.formCreate = this.auth.formAccess.create_all.includes(roleId);
                                this.access.formEdit = this.auth.formAccess.update_all.includes(roleId);
                                this.access.formPermission = this.auth.formAccess.update_all.includes(roleId);
                                this.access.formDelete = this.auth.formAccess.delete_all.includes(roleId);
                                this.access.formView = this.auth.formAccess.read_all.includes(roleId);
                                this.access.formSubmission = this.auth.formAccess.read_all.includes(roleId);
                            }
                            if (formbuilder._id === roleId) {
                                this.access.formCreate = this.auth.formAccess.create_all.includes(roleId);
                                this.access.formEdit = this.auth.formAccess.update_all.includes(roleId);
                                this.access.formPermission = this.auth.formAccess.update_all.includes(roleId);
                                this.access.formDelete = this.auth.formAccess.delete_all.includes(roleId);
                                this.access.formView = this.auth.formAccess.read_all.includes(roleId);
                            }
                        }
                    });
                }
            });
        }
        else {
            this.ready = Promise.resolve(false);
        }
    }
    reset(route) {
        if (route) {
            route.params.subscribe(params => {
                if (params.id) {
                    this.formio = new Formio(`${this.formio.formsUrl}/${params.id}`);
                }
                else {
                    this.reset();
                }
            });
        }
        else {
            this.formio = new Formio(this.appConfig.appUrl);
            this.setAccess();
        }
    }
    hasAccess(roles) {
        if (!this.auth.user) {
            return false;
        }
        return !!_intersection(roles, this.auth.user.roles).length;
    }
    setForm(form) {
        this.form = form;
        this.formSrc = this.appConfig.appUrl + '/' + form.path;
        if (form.access) {
            // Check if they have access here.
            form.access.forEach(access => {
                // Check for all access.
                if (this.allAccessMap[access.type] && !this.access[this.allAccessMap[access.type]]) {
                    this.access[this.allAccessMap[access.type]] = this.hasAccess(access.roles);
                }
                // Check for own access.
                if (this.auth && this.auth.user &&
                    (form._id === this.auth.user._id) &&
                    this.ownAccessMap[access.type] &&
                    !this.access[this.ownAccessMap[access.type]]) {
                    this.access[this.ownAccessMap[access.type]] = this.hasAccess(access.roles);
                }
            });
        }
        return form;
    }
    loadForm() {
        this.form = null;
        this.formReady = this.formio.loadForm().then(form => this.setForm(form));
        return this.formReady;
    }
    setSubmission(route) {
        return new Promise((resolve) => {
            route.params.subscribe(params => {
                this.formio = new Formio(`${this.formio.submissionsUrl}/${params.id}`);
                resolve(this.formio);
            });
        });
    }
    submissionLoaded(submission) {
        this.auth.ready.then(() => {
            this.formio.userPermissions(this.auth.user, this.form, submission).then((perms) => {
                this.perms.delete = perms.delete;
                this.perms.edit = perms.edit;
            });
        });
    }
    loadForms() {
        return this.formio.loadForms({ params: {
                tags: this.config.tag
            } });
    }
    createForm(form) {
        return this.formio.createform(form);
    }
}
FormManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerService, deps: [{ token: i3.FormioAppConfig }, { token: FormManagerConfig }, { token: i3$1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
FormManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3.FormioAppConfig }, { type: FormManagerConfig }, { type: i3$1.FormioAuthService }]; } });

class FormManagerIndexComponent {
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.search = '';
        this.gridQuery = { tags: this.config.tag, type: 'form', sort: 'title' };
        this.onSearch = debounce(this.onSearch, 300);
    }
    loadGrid() {
        this.search = localStorage.getItem('searchInput');
        this.gridQuery = JSON.parse(localStorage.getItem('query')) || this.gridQuery;
        const currentPage = +localStorage.getItem('currentPage') || 0;
        this.formGrid
            .refreshGrid(this.gridQuery)
            .then(() => this.formGrid.setPage(currentPage - 1));
    }
    ngOnInit() {
        this.gridQuery = { tags: this.config.tag, type: 'form', sort: 'title' };
        this.service.reset();
        this.service.ready.then(() => {
            this.loadGrid();
            this.formGrid.footer.pageChanged.subscribe(page => {
                localStorage.setItem('currentPage', page.page);
            });
        });
    }
    onSearch(event) {
        const searchInput = this.search;
        if (searchInput.length > 0) {
            this.gridQuery.skip = 0;
            this.gridQuery.title__regex = '/' + searchInput + '/i';
            this.gridQuery.title__regex = '/' + searchInput.trim() + '/i';
        }
        else {
            delete this.gridQuery.title__regex;
        }
        localStorage.setItem('query', JSON.stringify(this.gridQuery));
        localStorage.setItem('searchInput', this.search);
        this.formGrid.pageChanged({ page: 1, itemPerPage: this.gridQuery.limit });
        this.formGrid.refreshGrid(this.gridQuery);
    }
    clearSearch() {
        this.gridQuery = { tags: this.config.tag, type: 'form', sort: 'title' };
        localStorage.removeItem('query');
        localStorage.removeItem('searchInput');
        localStorage.removeItem('currentPage');
        this.search = '';
        this.formGrid.pageChanged({ page: 1 });
        this.formGrid.query = {};
        this.formGrid.refreshGrid({ tags: this.config.tag, type: 'form', sort: 'title' });
    }
    onAction(action) {
        this.service.form = null; // Reset previous form data
        this.router.navigate([action.row._id, action.action], { relativeTo: this.route });
    }
    onSelect(row) {
        this.router.navigate([row._id], { relativeTo: this.route });
    }
    onCreateItem() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }
}
FormManagerIndexComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerIndexComponent, deps: [{ token: FormManagerService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormManagerConfig }], target: i0.ɵɵFactoryTarget.Component });
FormManagerIndexComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerIndexComponent, selector: "ng-component", viewQueries: [{ propertyName: "formGrid", first: true, predicate: FormioGridComponent, descendants: true }], ngImport: i0, template: "<div role=\"search\" class=\"input-group mb-3\" *ngIf=\"config.includeSearch\">\r\n  <input type=\"text\" (keyup)=\"onSearch()\" class=\"form-control\" [(ngModel)]=\"search\" placeholder=\"Search Forms\" aria-label=\"Search Forms\" aria-describedby=\"button-search\">\r\n  <span *ngIf=\"search && search !== ''\" class=\"form-clear input-group-addon\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></span>\r\n</div>\r\n<formio-grid\r\n  *ngIf=\"service.ready\"\r\n  [formio]=\"service.formio\"\r\n  [gridType]=\"'form'\"\r\n  [query]=\"gridQuery\"\r\n  [isActionAllowed]=\"service.actionAllowed\"\r\n  (rowAction)=\"onAction($event)\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n></formio-grid>\r\n", styles: [".form-clear{background:#cecece;border-radius:50%;bottom:8px;color:#0000004d;cursor:pointer;display:flex;justify-content:center;align-items:center;padding-bottom:2px;height:24px;position:absolute;right:10px;top:6px;width:24px;z-index:10}.form-clear .fa{font-size:16px;font-weight:500}\n"], dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i4.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<div role=\"search\" class=\"input-group mb-3\" *ngIf=\"config.includeSearch\">\r\n  <input type=\"text\" (keyup)=\"onSearch()\" class=\"form-control\" [(ngModel)]=\"search\" placeholder=\"Search Forms\" aria-label=\"Search Forms\" aria-describedby=\"button-search\">\r\n  <span *ngIf=\"search && search !== ''\" class=\"form-clear input-group-addon\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></span>\r\n</div>\r\n<formio-grid\r\n  *ngIf=\"service.ready\"\r\n  [formio]=\"service.formio\"\r\n  [gridType]=\"'form'\"\r\n  [query]=\"gridQuery\"\r\n  [isActionAllowed]=\"service.actionAllowed\"\r\n  (rowAction)=\"onAction($event)\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n></formio-grid>\r\n", styles: [".form-clear{background:#cecece;border-radius:50%;bottom:8px;color:#0000004d;cursor:pointer;display:flex;justify-content:center;align-items:center;padding-bottom:2px;height:24px;position:absolute;right:10px;top:6px;width:24px;z-index:10}.form-clear .fa{font-size:16px;font-weight:500}\n"] }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormManagerConfig }]; }, propDecorators: { formGrid: [{
                type: ViewChild,
                args: [FormioGridComponent, { static: false }]
            }] } });

class FormManagerEditComponent {
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
FormManagerEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerEditComponent, deps: [{ token: FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: FormManagerConfig }, { token: i0.ChangeDetectorRef }, { token: i3.FormioAlerts }], target: i0.ɵɵFactoryTarget.Component });
FormManagerEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerEditComponent, selector: "ng-component", viewQueries: [{ propertyName: "builder", first: true, predicate: FormBuilderComponent, descendants: true }, { propertyName: "formTitle", first: true, predicate: ["title"], descendants: true }, { propertyName: "formType", first: true, predicate: ["type"], descendants: true }], ngImport: i0, template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n", dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.FormBuilderComponent, selector: "form-builder", inputs: ["form", "options", "formbuilder", "noeval", "refresh", "rebuild"], outputs: ["change"] }, { kind: "component", type: i3.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "directive", type: i5.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: FormManagerConfig }, { type: i0.ChangeDetectorRef }, { type: i3.FormioAlerts }]; }, propDecorators: { builder: [{
                type: ViewChild,
                args: [FormBuilderComponent, { static: false }]
            }], formTitle: [{
                type: ViewChild,
                args: ['title', { static: false }]
            }], formType: [{
                type: ViewChild,
                args: ['type', { static: false }]
            }] } });

class FormManagerCreateComponent extends FormManagerEditComponent {
    ngOnInit() {
        this.service.reset();
    }
}
FormManagerCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerCreateComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormManagerCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerCreateComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n", dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.FormBuilderComponent, selector: "form-builder", inputs: ["form", "options", "formbuilder", "noeval", "refresh", "rebuild"], outputs: ["change"] }, { kind: "component", type: i3.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "directive", type: i5.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i5.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerCreateComponent, decorators: [{
            type: Component,
            args: [{ template: "<div class=\"loader\" *ngIf=\"loading\"></div>\r\n<div class=\"form-group row\">\r\n  <div class=\"col-sm-8\">\r\n    <input type=\"text\" class=\"form-control\" id=\"formTitle\" placeholder=\"Enter a Title\" #title>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <select class=\"form-control\" id=\"formSelect\" (change)=\"onDisplaySelect($event)\" #type>\r\n      <option value=\"form\">Form</option>\r\n      <option value=\"wizard\">Wizard</option>\r\n      <option value=\"pdf\">PDF</option>\r\n    </select>\r\n  </div>\r\n  <div class=\"col-sm-2\">\r\n    <button class=\"btn btn-primary btn-block\" (click)=\"onSave()\">Save Form</button>\r\n  </div>\r\n</div>\r\n<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<form-builder *ngIf=\"formReady\" [formbuilder]=\"config.builder\" [form]=\"form\" #builder></form-builder>\r\n<button class=\"btn btn-primary\" style=\"margin-top: 10px;\" (click)=\"onSave()\">Save Form</button>\r\n" }]
        }] });

class FormManagerFormComponent {
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
FormManagerFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerFormComponent, deps: [{ token: FormManagerService }, { token: i2.ActivatedRoute }, { token: i3.FormioAppConfig }, { token: FormManagerConfig }, { token: i5$1.BsModalService }], target: i0.ɵɵFactoryTarget.Component });
FormManagerFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerFormComponent, selector: "ng-component", ngImport: i0, template: "<button *ngIf=\"options.viewer\" class=\"pull-right btn btn-outline-primary\" (click)=\"openEmbed(content)\"><em class=\"fa fa-share-alt glyphicon glyphicon-share\"></em> Share</button>\r\n<ul class=\"nav nav-tabs mb-2\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><em class=\"fa fa-pencil glyphicon glyphicon-pencil\"></em> Enter Data</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"submission\" routerLinkActive=\"active\"><em class=\"fa fa-list-alt glyphicon glyphicon-list-alt\"></em> View Data</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formEdit')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><em class=\"fa fa-edit glyphicon glyphicon-edit\"></em> Edit Form</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formDelete')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n<ng-template #content>\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">Share or Embed this form</h4>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <ul class=\"nav nav-tabs mr-auto mb-2\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isUrl'}\" (click)=\"choices('isUrl')\"><em class=\"fa fa-link\"></em> URL</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isEmbed'}\" (click)=\"choices('isEmbed')\"><em class=\"fa fa-code\"></em> Embed</a>\r\n      </li>\r\n    </ul>\r\n    <pre  *ngIf=\"choice === 'isEmbed'\"><textarea onclick=\"this.focus();this.select()\" readonly=\"readonly\" style=\"width:100%;\" rows=\"8\" [ngModel]=\"embedCode\"></textarea></pre>\r\n    <input *ngIf=\"choice === 'isUrl'\" type=\"text\" onclick=\"this.focus();this.select()\" readonly=\"readonly\" class=\"form-control\" [ngModel]=\"shareUrl\" placeholder=\"https://examples.form.io/example\">\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modalRef.hide()\">Close</button>\r\n  </div>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i5.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i5.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i5.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerFormComponent, decorators: [{
            type: Component,
            args: [{ template: "<button *ngIf=\"options.viewer\" class=\"pull-right btn btn-outline-primary\" (click)=\"openEmbed(content)\"><em class=\"fa fa-share-alt glyphicon glyphicon-share\"></em> Share</button>\r\n<ul class=\"nav nav-tabs mb-2\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><em class=\"fa fa-pencil glyphicon glyphicon-pencil\"></em> Enter Data</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"submission\" routerLinkActive=\"active\"><em class=\"fa fa-list-alt glyphicon glyphicon-list-alt\"></em> View Data</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formEdit')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><em class=\"fa fa-edit glyphicon glyphicon-edit\"></em> Edit Form</a></li>\r\n  <li *ngIf=\"service.actionAllowed('formDelete')\" class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n<ng-template #content>\r\n  <div class=\"modal-header\">\r\n    <h4 class=\"modal-title\">Share or Embed this form</h4>\r\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <ul class=\"nav nav-tabs mr-auto mb-2\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isUrl'}\" (click)=\"choices('isUrl')\"><em class=\"fa fa-link\"></em> URL</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [ngClass]=\"{'active': choice === 'isEmbed'}\" (click)=\"choices('isEmbed')\"><em class=\"fa fa-code\"></em> Embed</a>\r\n      </li>\r\n    </ul>\r\n    <pre  *ngIf=\"choice === 'isEmbed'\"><textarea onclick=\"this.focus();this.select()\" readonly=\"readonly\" style=\"width:100%;\" rows=\"8\" [ngModel]=\"embedCode\"></textarea></pre>\r\n    <input *ngIf=\"choice === 'isUrl'\" type=\"text\" onclick=\"this.focus();this.select()\" readonly=\"readonly\" class=\"form-control\" [ngModel]=\"shareUrl\" placeholder=\"https://examples.form.io/example\">\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-light\" (click)=\"modalRef.hide()\">Close</button>\r\n  </div>\r\n</ng-template>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.ActivatedRoute }, { type: i3.FormioAppConfig }, { type: FormManagerConfig }, { type: i5$1.BsModalService }]; } });

class FormManagerViewComponent {
    constructor(service, router, route, config, auth) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.config = config;
        this.auth = auth;
        this.onSuccess = new EventEmitter();
        this.onError = new EventEmitter();
        this.renderOptions = {
            saveDraft: this.config.saveDraft
        };
        this.submission = { data: {} };
    }
    ngOnInit() {
        this.service.formio = new Formio(this.service.formio.formUrl);
    }
    onSubmit(submission) {
        this.submission.data = submission.data;
        this.submission.state = 'complete';
        this.service.formio.saveSubmission(this.submission).then(saved => {
            this.onSuccess.emit();
            this.router.navigate(['../', 'submission', saved._id], { relativeTo: this.route });
        }).catch((err) => this.onError.emit(err));
    }
}
FormManagerViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerViewComponent, deps: [{ token: FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: FormManagerConfig }, { token: i3$1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormManagerViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerViewComponent, selector: "ng-component", ngImport: i0, template: "<formio *ngIf=\"service.form\"\r\n  [renderer]=\"config.renderer\"\r\n  [renderOptions]=\"renderOptions\"\r\n  [url]=\"service.formio.formUrl\"\r\n  [form]=\"service.form\"\r\n  [submission]=\"submission\"\r\n  [success]=\"onSuccess\"\r\n  [error]=\"onError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio *ngIf=\"service.form\"\r\n  [renderer]=\"config.renderer\"\r\n  [renderOptions]=\"renderOptions\"\r\n  [url]=\"service.formio.formUrl\"\r\n  [form]=\"service.form\"\r\n  [submission]=\"submission\"\r\n  [success]=\"onSuccess\"\r\n  [error]=\"onError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: FormManagerConfig }, { type: i3$1.FormioAuthService }]; } });

class FormManagerDeleteComponent {
    constructor(managerService, router, route, alerts, gridService) {
        this.managerService = managerService;
        this.router = router;
        this.route = route;
        this.alerts = alerts;
        this.gridService = gridService;
    }
    onDelete() {
        this.managerService.formio.deleteForm().then(() => {
            if (this.gridService) {
                const currentPage = +localStorage.getItem('currentPage') || 0;
                const formsNumberPerPage = this.gridService.getFormsPerPage();
                if (formsNumberPerPage === 1 && currentPage !== 0) {
                    localStorage.setItem('currentPage', `${currentPage - 1}`);
                }
            }
            this.router.navigate(['../../'], { relativeTo: this.route });
        }).catch(err => this.alerts.setAlert({ type: 'danger', message: (err.message || err) }));
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
}
FormManagerDeleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerDeleteComponent, deps: [{ token: FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormioAlerts }, { token: i4.GridService }], target: i0.ɵɵFactoryTarget.Component });
FormManagerDeleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormManagerDeleteComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this form?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n", dependencies: [{ kind: "component", type: i3.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this form?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormioAlerts }, { type: i4.GridService }]; } });

class SubmissionEditComponent {
    constructor(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
    }
    onSubmit(submission) {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
}
SubmissionEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionEditComponent, deps: [{ token: FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
SubmissionEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  (submit)=\"onSubmit($event)\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i3.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  (submit)=\"onSubmit($event)\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }]; } });

class SubmissionDeleteComponent {
    constructor(service, router, route, alerts) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.alerts = alerts;
    }
    onDelete() {
        this.service.formio.deleteSubmission().then(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
        }).catch(err => this.alerts.setAlert({ type: 'danger', message: (err.message || err) }));
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
}
SubmissionDeleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionDeleteComponent, deps: [{ token: FormManagerService }, { token: i2.Router }, { token: i2.ActivatedRoute }, { token: i3.FormioAlerts }], target: i0.ɵɵFactoryTarget.Component });
SubmissionDeleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionDeleteComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n", dependencies: [{ kind: "component", type: i3.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"alerts\"></formio-alerts>\r\n<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-default\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.Router }, { type: i2.ActivatedRoute }, { type: i3.FormioAlerts }]; } });

class SubmissionViewComponent {
    constructor(service) {
        this.service = service;
    }
}
SubmissionViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionViewComponent, deps: [{ token: FormManagerService }], target: i0.ɵɵFactoryTarget.Component });
SubmissionViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  [readOnly]=\"true\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i3.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [renderer]=\"service.config.renderer\"\r\n  [src]=\"service.formio.submissionUrl\"\r\n  [readOnly]=\"true\"\r\n  (formLoad)=\"service.setForm($event)\"\r\n  (submissionLoad)=\"service.submissionLoaded($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }]; } });

class SubmissionIndexComponent {
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    onSelect(row) {
        this.router.navigate([row._id, 'view'], { relativeTo: this.route });
    }
}
SubmissionIndexComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionIndexComponent, deps: [{ token: FormManagerService }, { token: i2.ActivatedRoute }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
SubmissionIndexComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid>\r\n", dependencies: [{ kind: "component", type: i4.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-grid [formio]=\"service.formio\" (rowSelect)=\"onSelect($event)\"></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.ActivatedRoute }, { type: i2.Router }]; } });

class SubmissionComponent {
    constructor(service, route) {
        this.service = service;
        this.route = route;
    }
    setDownloadUrl(url) {
        this.downloadUrl = url;
    }
    ngOnInit() {
        this.service.setSubmission(this.route).then((formio) => {
            formio.getDownloadUrl().then((url) => this.setDownloadUrl(url));
        });
    }
}
SubmissionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionComponent, deps: [{ token: FormManagerService }, { token: i2.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
SubmissionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: SubmissionComponent, selector: "ng-component", ngImport: i0, template: "<a *ngIf=\"downloadUrl\" [href]=\"downloadUrl\" target=\"_blank\" class=\"pull-right\"><img src=\"https://pro.formview.io/assets/pdf.png\" alt=\"pdfImage\" style=\"height: 2em;\" /></a>\r\n<ul aria-label=\"Submission\" role=\"navigation\" class=\"nav nav-tabs\" style=\"margin-bottom:10px\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><em class=\"fa fa-eye glyphicon glyphicon-eye\"></em> View</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"service.perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><em class=\"fa fa-edit glyphicon glyphicon-edit\"></em> Edit</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"service.perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n", dependencies: [{ kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: SubmissionComponent, decorators: [{
            type: Component,
            args: [{ template: "<a *ngIf=\"downloadUrl\" [href]=\"downloadUrl\" target=\"_blank\" class=\"pull-right\"><img src=\"https://pro.formview.io/assets/pdf.png\" alt=\"pdfImage\" style=\"height: 2em;\" /></a>\r\n<ul aria-label=\"Submission\" role=\"navigation\" class=\"nav nav-tabs\" style=\"margin-bottom:10px\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\"><em class=\"fa fa-eye glyphicon glyphicon-eye\"></em> View</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"service.perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\"><em class=\"fa fa-edit glyphicon glyphicon-edit\"></em> Edit</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"service.perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormManagerService }, { type: i2.ActivatedRoute }]; } });

function FormManagerRoutes(config) {
    return [
        {
            path: '',
            component: config && config.formIndex ? config.formIndex : FormManagerIndexComponent
        },
        {
            path: 'create',
            component: config && config.formCreate ? config.formCreate : FormManagerCreateComponent
        },
        {
            path: ':id',
            component: config && config.form ? config.form : FormManagerFormComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config && config.formView ? config.formView : FormManagerViewComponent
                },
                {
                    path: 'edit',
                    component: config && config.formEdit ? config.formEdit : FormManagerEditComponent
                },
                {
                    path: 'delete',
                    component: config && config.formDelete ? config.formDelete : FormManagerDeleteComponent
                },
                {
                    path: 'submission',
                    component: config && config.submissionIndex ? config.submissionIndex : SubmissionIndexComponent
                },
                {
                    path: 'submission/:id',
                    component: config && config.submission ? config.submission : SubmissionComponent,
                    children: [
                        {
                            path: '',
                            redirectTo: 'view',
                            pathMatch: 'full'
                        },
                        {
                            path: 'view',
                            component: config && config.submissionView ? config.submissionView : SubmissionViewComponent
                        },
                        {
                            path: 'edit',
                            component: config && config.submissionEdit ? config.submissionEdit : SubmissionEditComponent
                        },
                        {
                            path: 'delete',
                            component: config && config.submissionDelete ? config.submissionDelete : SubmissionDeleteComponent
                        }
                    ]
                }
            ]
        }
    ];
}

class FormManagerModule {
    static forChild(config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormManagerModule, config, FormManagerRoutes);
    }
}
FormManagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormManagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, declarations: [FormManagerIndexComponent,
        FormManagerCreateComponent,
        FormManagerFormComponent,
        FormManagerViewComponent,
        FormManagerEditComponent,
        FormManagerDeleteComponent,
        SubmissionComponent,
        SubmissionEditComponent,
        SubmissionDeleteComponent,
        SubmissionViewComponent,
        SubmissionIndexComponent], imports: [CommonModule,
        FormioModule,
        RouterModule,
        FormsModule,
        FormioGrid, i5$1.ModalModule, i2$1.PaginationModule] });
FormManagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, imports: [CommonModule,
        FormioModule,
        RouterModule,
        FormsModule,
        FormioGrid,
        ModalModule.forRoot(),
        PaginationModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule,
                        FormsModule,
                        FormioGrid,
                        ModalModule.forRoot(),
                        PaginationModule.forRoot()
                    ],
                    declarations: [
                        FormManagerIndexComponent,
                        FormManagerCreateComponent,
                        FormManagerFormComponent,
                        FormManagerViewComponent,
                        FormManagerEditComponent,
                        FormManagerDeleteComponent,
                        SubmissionComponent,
                        SubmissionEditComponent,
                        SubmissionDeleteComponent,
                        SubmissionViewComponent,
                        SubmissionIndexComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormManagerConfig, FormManagerCreateComponent, FormManagerDeleteComponent, FormManagerEditComponent, FormManagerFormComponent, FormManagerIndexComponent, FormManagerModule, FormManagerRoutes, FormManagerService, FormManagerViewComponent, SubmissionComponent, SubmissionDeleteComponent, SubmissionEditComponent, SubmissionIndexComponent, SubmissionViewComponent };
//# sourceMappingURL=formio-angular-manager.mjs.map
