import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Optional, Component, NgModule } from '@angular/core';
import * as i1 from '@formio/angular/auth';
import * as i1$1 from '@formio/angular';
import { FormioAlerts, FormioPromiseService, extendRouter, FormioModule } from '@formio/angular';
import Promise$1 from 'native-promise-only';
import { Formio, Utils } from 'formiojs';
import _, { each } from 'lodash';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@formio/angular/grid';
import { FormioGrid } from '@formio/angular/grid';

class FormioResourceConfig {
    constructor() {
        this.name = '';
        this.form = '';
        this.parents = [];
    }
}
FormioResourceConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormioResourceConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceConfig });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceConfig, decorators: [{
            type: Injectable
        }] });

class FormioResources {
    constructor(auth) {
        this.auth = auth;
        this.resources = {};
        this.error = new EventEmitter();
        this.onError = this.error;
        this.resources = {
            currentUser: {
                resourceLoaded: this.auth.userReady
            }
        };
    }
}
FormioResources.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResources, deps: [{ token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
FormioResources.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResources });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResources, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAuthService }]; } });

class FormioResourceService {
    constructor(appConfig, config, resourcesService, appRef) {
        this.appConfig = appConfig;
        this.config = config;
        this.resourcesService = resourcesService;
        this.appRef = appRef;
        this.initialized = false;
        this.isLoading = true;
        this.alerts = new FormioAlerts();
        this.refresh = new EventEmitter();
        this.formLoaded = new Promise$1((resolve, reject) => {
            this.formResolve = resolve;
            this.formReject = reject;
        });
        this.init();
    }
    initialize() {
        console.warn('FormioResourceService.initialize() has been deprecated.');
    }
    init() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
            Formio.formOnly = this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        // Create the form url and load the resources.
        this.formUrl = this.appConfig.appUrl + '/' + this.config.form;
        this.resource = { data: {} };
        // Add this resource service to the list of all resources in context.
        if (this.resourcesService) {
            this.resources = this.resourcesService.resources;
            this.resources[this.config.name] = this;
        }
        return this.loadForm();
    }
    onError(error) {
        this.alerts.setAlert({
            type: 'danger',
            message: error.message || error
        });
        if (this.resourcesService) {
            this.resourcesService.error.emit(error);
        }
        throw error;
    }
    onFormError(err) {
        this.formReject(err);
        this.onError(err);
    }
    setContext(route) {
        this.resourceId = route.snapshot.params['id'];
        this.resource = { data: {} };
        this.resourceUrl = this.appConfig.appUrl + '/' + this.config.form;
        if (this.resourceId) {
            this.resourceUrl += '/submission/' + this.resourceId;
        }
        this.formio = new FormioPromiseService(this.resourceUrl);
        if (this.resourcesService) {
            this.resources[this.config.name] = this;
        }
        this.loadParents();
    }
    loadForm() {
        this.formFormio = new FormioPromiseService(this.formUrl);
        this.isLoading = true;
        this.formLoading = this.formFormio
            .loadForm()
            .then((form) => {
            this.form = form;
            this.formResolve(form);
            this.isLoading = false;
            this.loadParents();
            return form;
        }, (err) => this.onFormError(err))
            .catch((err) => this.onFormError(err));
        return this.formLoading;
    }
    loadParents() {
        if (!this.config.parents || !this.config.parents.length) {
            return Promise$1.resolve([]);
        }
        if (!this.resourcesService) {
            console.warn('You must provide the FormioResources within your application to use nested resources.');
            return Promise$1.resolve([]);
        }
        return this.formLoading.then((form) => {
            // Iterate through the list of parents.
            const _parentsLoaded = [];
            this.config.parents.forEach((parent) => {
                const resourceName = parent.resource || parent;
                const resourceField = parent.field || parent;
                const filterResource = parent.hasOwnProperty('filter') ? parent.filter : true;
                if (this.resources.hasOwnProperty(resourceName) && this.resources[resourceName].resourceLoaded) {
                    _parentsLoaded.push(this.resources[resourceName].resourceLoaded.then((resource) => {
                        let parentPath = '';
                        Utils.eachComponent(form.components, (component, path) => {
                            if (component.key === resourceField) {
                                component.hidden = true;
                                component.clearOnHide = false;
                                _.set(this.resource.data, path, resource);
                                parentPath = path;
                                return true;
                            }
                        });
                        return {
                            name: parentPath,
                            filter: filterResource,
                            resource
                        };
                    }));
                }
            });
            // When all the parents have loaded, emit that to the onParents emitter.
            return Promise$1.all(_parentsLoaded).then((parents) => {
                this.refresh.emit({
                    form: form,
                    submission: this.resource
                });
                return parents;
            });
        });
    }
    onSubmissionError(err) {
        this.onError(err);
    }
    loadResource(route) {
        this.setContext(route);
        this.isLoading = true;
        this.resourceLoading = this.resourceLoaded = this.formio
            .loadSubmission(null, { ignoreCache: true })
            .then((resource) => {
            this.resource = resource;
            this.isLoading = false;
            this.refresh.emit({
                property: 'submission',
                value: this.resource
            });
            return resource;
        }, (err) => this.onSubmissionError(err))
            .catch((err) => this.onSubmissionError(err));
        return this.resourceLoading;
    }
    save(resource) {
        const formio = resource._id ? this.formio : this.formFormio;
        return formio
            .saveSubmission(resource)
            .then((saved) => {
            this.resource = saved;
            return saved;
        }, (err) => this.onError(err))
            .catch((err) => this.onError(err));
    }
    remove() {
        return this.formio
            .deleteSubmission()
            .then(() => {
            this.resource = null;
        }, (err) => this.onError(err))
            .catch((err) => this.onError(err));
    }
}
FormioResourceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceService, deps: [{ token: i1$1.FormioAppConfig }, { token: FormioResourceConfig }, { token: FormioResources, optional: true }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
FormioResourceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.FormioAppConfig }, { type: FormioResourceConfig }, { type: FormioResources, decorators: [{
                    type: Optional
                }] }, { type: i0.ApplicationRef }]; } });

class FormioResourceComponent {
    constructor(service, route, auth) {
        this.service = service;
        this.route = route;
        this.auth = auth;
        this.perms = { delete: false, edit: false };
        // subscribe to the route param changes, so that we could re-load the submission if navigation happens from one submission to another
        this.paramsSubscription = this.route.params.subscribe((params) => {
            this.init();
        });
    }
    ngOnInit() {
        this.init();
    }
    init() {
        this.service.loadResource(this.route);
        this.service.formLoaded.then((form) => {
            this.auth.ready.then(() => {
                this.service.resourceLoaded.then((resource) => {
                    this.service.formFormio.userPermissions(this.auth.user, form, resource).then((perms) => {
                        this.perms.delete = perms.delete;
                        this.perms.edit = perms.edit;
                    });
                });
            });
        });
    }
    ngOnDestroy() {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    }
}
FormioResourceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i1.FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceComponent, selector: "ng-component", ngImport: i0, template: "<ul class=\"nav nav-tabs\" style=\"margin-bottom: 10px\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\">View</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\">Edit</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i2.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceComponent, decorators: [{
            type: Component,
            args: [{ template: "<ul class=\"nav nav-tabs\" style=\"margin-bottom: 10px\">\r\n  <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"../\"><em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em></a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"view\" routerLinkActive=\"active\">View</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.edit\"><a class=\"nav-link\" routerLink=\"edit\" routerLinkActive=\"active\">Edit</a></li>\r\n  <li class=\"nav-item\" routerLinkActive=\"active\" *ngIf=\"perms.delete\"><a class=\"nav-link\" routerLink=\"delete\" routerLinkActive=\"active\"><span class=\"fa fa-trash glyphicon glyphicon-trash\"></span></a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i1.FormioAuthService }]; } });

class FormioResourceViewComponent {
    constructor(service, config) {
        this.service = service;
        this.config = config;
        this.submission = { data: {} };
    }
    ngOnDestroy() {
        Formio.clearCache();
    }
}
FormioResourceViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceViewComponent, deps: [{ token: FormioResourceService }, { token: FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceViewComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i1$1.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceViewComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [hideComponents]=\"config.parents\"\r\n  [readOnly]=\"true\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: FormioResourceConfig }]; } });

class FormioResourceEditComponent {
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.triggerError = new EventEmitter();
        this.submission = { data: {} };
    }
    onSubmit(submission) {
        const edit = this.service.resource;
        edit.data = submission.data;
        this.service.save(edit)
            .then(() => {
            this.router.navigate(['../', 'view'], { relativeTo: this.route });
        })
            .catch((err) => this.triggerError.emit(err));
    }
    ngOnDestroy() {
        Formio.clearCache();
    }
}
FormioResourceEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceEditComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceEditComponent, selector: "ng-component", ngImport: i0, template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", dependencies: [{ kind: "component", type: i1$1.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceEditComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [error]=\"triggerError\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormioResourceConfig }]; } });

class FormioResourceDeleteComponent {
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    onDelete() {
        this.service.remove().then(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
    onCancel() {
        this.router.navigate(['../', 'view'], { relativeTo: this.route });
    }
}
FormioResourceDeleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceDeleteComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceDeleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceDeleteComponent, selector: "ng-component", ngImport: i0, template: "<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button>\r\n</div>\r\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceDeleteComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3>Are you sure you wish to delete this record?</h3>\r\n<div class=\"btn-toolbar\">\r\n  <button type=\"button\" (click)=\"onDelete()\" class=\"btn btn-danger\" style=\"margin-right: 10px;\">Yes</button>\r\n  <button type=\"button\" (click)=\"onCancel()\" class=\"btn btn-danger\">No</button>\r\n</div>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }]; } });

class FormioResourceCreateComponent {
    constructor(service, route, router, config) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.onError = new EventEmitter();
        this.onSuccess = new EventEmitter();
    }
    ngOnInit() {
        this.service.setContext(this.route);
    }
    onSubmit(submission) {
        this.service
            .save(submission)
            .then(() => {
            this.router.navigate(['../', this.service.resource._id, 'view'], {
                relativeTo: this.route
            });
        })
            .catch((err) => this.onError.emit(err));
    }
}
FormioResourceCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceCreateComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormioResourceConfig }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceCreateComponent, selector: "ng-component", ngImport: i0, template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1$1.FormioComponent, selector: "formio" }, { kind: "directive", type: i2.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceCreateComponent, decorators: [{
            type: Component,
            args: [{ template: "<h3 *ngIf=\"service.form\" style=\"margin-top:0;\">\r\n  <a routerLink=\"../\" class=\"back-button\">\r\n    <em class=\"fa fa-chevron-left glyphicon glyphicon-chevron-left\"></em>\r\n  </a> | New {{ service.form.title }}\r\n</h3>\r\n<formio\r\n  [form]=\"service.form\"\r\n  [submission]=\"service.resource\"\r\n  [refresh]=\"service.refresh\"\r\n  [error]=\"onError\"\r\n  [success]=\"onSuccess\"\r\n  (submit)=\"onSubmit($event)\"\r\n></formio>\r\n", styles: [".back-button{font-size:.8em}\n"] }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormioResourceConfig }]; } });

class FormioResourceIndexComponent {
    constructor(service, route, router, config, cdr, ngZone) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.config = config;
        this.cdr = cdr;
        this.ngZone = ngZone;
    }
    ngOnInit() {
        this.gridQuery = {};
        this.service.setContext(this.route);
        this.service.formLoaded.then(() => {
            if (this.service &&
                this.config.parents &&
                this.config.parents.length) {
                this.service.loadParents().then((parents) => {
                    each(parents, (parent) => {
                        if (parent && parent.filter) {
                            this.gridQuery['data.' + parent.name + '._id'] =
                                parent.resource._id;
                        }
                    });
                    // Set the source to load the grid.
                    this.gridSrc = this.service.formUrl;
                    this.createText = `New ${this.service.form.title}`;
                });
            }
            else if (this.service.formUrl) {
                this.gridSrc = this.service.formUrl;
                this.createText = `New ${this.service.form.title}`;
            }
            this.cdr.detectChanges();
        });
    }
    onSelect(row) {
        this.ngZone.run(() => {
            this.router.navigate([row._id, 'view'], { relativeTo: this.route });
        });
    }
    onCreateItem() {
        this.ngZone.run(() => {
            this.router.navigate(['new'], { relativeTo: this.route });
        });
    }
}
FormioResourceIndexComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceIndexComponent, deps: [{ token: FormioResourceService }, { token: i2.ActivatedRoute }, { token: i2.Router }, { token: FormioResourceConfig }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
FormioResourceIndexComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResourceIndexComponent, selector: "ng-component", ngImport: i0, template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n", dependencies: [{ kind: "component", type: i1$1.FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }, { kind: "component", type: i5.FormioGridComponent, selector: "formio-grid", inputs: ["footerPosition", "src", "items", "onForm", "query", "refresh", "columns", "gridType", "size", "components", "formio", "label", "createText", "isActionAllowed"], outputs: ["select", "rowSelect", "rowAction", "createItem", "error"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceIndexComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio-alerts [alerts]=\"service.alerts\"></formio-alerts>\r\n<formio-grid\r\n  [src]=\"gridSrc\"\r\n  [query]=\"gridQuery\"\r\n  [onForm]=\"service.formLoaded\"\r\n  (rowSelect)=\"onSelect($event)\"\r\n  (error)=\"service.onError($event)\"\r\n  (createItem)=\"onCreateItem()\"\r\n  [createText]=\"createText\"\r\n></formio-grid>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioResourceService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: FormioResourceConfig }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; } });

function FormioResourceRoutes(config) {
    return [
        {
            path: '',
            component: config && config.index ? config.index : FormioResourceIndexComponent
        },
        {
            path: 'new',
            component: config && config.create ? config.create : FormioResourceCreateComponent
        },
        {
            path: ':id',
            component: config && config.resource ? config.resource : FormioResourceComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'view',
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: config && config.view ? config.view : FormioResourceViewComponent
                },
                {
                    path: 'edit',
                    component: config && config.edit ? config.edit : FormioResourceEditComponent
                },
                {
                    path: 'delete',
                    component: config && config.delete ? config.delete : FormioResourceDeleteComponent
                }
            ]
        }
    ];
}

class FormioResource {
    static forChild(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
    static forRoot(config) {
        return extendRouter(FormioResource, config, FormioResourceRoutes);
    }
}
FormioResource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormioResource.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, declarations: [FormioResourceComponent,
        FormioResourceCreateComponent,
        FormioResourceIndexComponent,
        FormioResourceViewComponent,
        FormioResourceEditComponent,
        FormioResourceDeleteComponent], imports: [CommonModule,
        FormioModule,
        FormioGrid,
        RouterModule] });
FormioResource.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, providers: [
        FormioAlerts
    ], imports: [CommonModule,
        FormioModule,
        FormioGrid,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResource, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        FormioGrid,
                        RouterModule
                    ],
                    declarations: [
                        FormioResourceComponent,
                        FormioResourceCreateComponent,
                        FormioResourceIndexComponent,
                        FormioResourceViewComponent,
                        FormioResourceEditComponent,
                        FormioResourceDeleteComponent
                    ],
                    providers: [
                        FormioAlerts
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormioResource, FormioResourceComponent, FormioResourceConfig, FormioResourceCreateComponent, FormioResourceDeleteComponent, FormioResourceEditComponent, FormioResourceIndexComponent, FormioResourceRoutes, FormioResourceService, FormioResourceViewComponent, FormioResources };
//# sourceMappingURL=formio-angular-resource.mjs.map
