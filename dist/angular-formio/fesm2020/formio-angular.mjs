import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Optional, Input, Output, ViewChild, Pipe, ViewEncapsulation, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { Formio, Form, Utils, FormBuilder, Components } from 'formiojs';
export { Components, Formio, Utils as FormioUtils, Templates } from 'formiojs';
import { RouterModule } from '@angular/router';
import { each, assign, get, isEmpty, isArray, isNil, clone } from 'lodash';
import Evaluator from 'formiojs/utils/Evaluator';
import { fastCloneDeep } from 'formiojs/utils/utils';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

class FormioAppConfig {
    constructor() {
        this.appUrl = '';
        this.apiUrl = '';
    }
}
FormioAppConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAppConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormioAppConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAppConfig });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAppConfig, decorators: [{
            type: Injectable
        }] });

class FormioError {
    constructor(message, component, silent) {
        this.message = message;
        this.component = component;
        this.silent = silent;
    }
}

class FormioService {
    constructor(url, options) {
        this.url = url;
        this.options = options;
        this.formio = new Formio(this.url, this.options);
    }
    requestWrapper(fn) {
        let record;
        let called = false;
        return Observable.create((observer) => {
            try {
                if (!called) {
                    called = true;
                    fn()
                        .then((_record) => {
                        record = _record;
                        observer.next(record);
                        observer.complete();
                    })
                        .catch((err) => observer.error(err));
                }
                else if (record) {
                    observer.next(record);
                    observer.complete();
                }
            }
            catch (err) {
                observer.error(err);
            }
        });
    }
    saveForm(form, options) {
        return this.requestWrapper(() => this.formio.saveForm(form, options));
    }
    loadForm(query, options) {
        return this.requestWrapper(() => this.formio.loadForm(query, options));
    }
    loadForms(query, options) {
        return this.requestWrapper(() => this.formio.loadForms(query, options));
    }
    loadSubmission(query, options) {
        return this.requestWrapper(() => this.formio.loadSubmission(query, options));
    }
    userPermissions(user, form, submission) {
        return this.requestWrapper(() => this.formio.userPermissions(user, form, submission));
    }
    deleteSubmission(data, options) {
        return this.requestWrapper(() => this.formio.deleteSubmission(data, options));
    }
    saveSubmission(submission, options) {
        return this.requestWrapper(() => this.formio.saveSubmission(submission, options));
    }
    loadSubmissions(query, options) {
        return this.requestWrapper(() => this.formio.loadSubmissions(query, options));
    }
}

class FormioPromiseService {
    constructor(url, options) {
        this.url = url;
        this.options = options;
        this.formioService = new FormioService(url, options);
    }
    saveForm(form, options) {
        return this.formioService.saveForm(form, options).toPromise();
    }
    loadForm(query, options) {
        return this.formioService.loadForm(query, options).toPromise();
    }
    loadSubmission(query, options) {
        return this.formioService.loadSubmission(query, options).toPromise();
    }
    userPermissions(user, form, submission) {
        return this.formioService.userPermissions(user, form, submission).toPromise();
    }
    deleteSubmission(data, options) {
        return this.formioService.deleteSubmission(data, options).toPromise();
    }
    loadForms(query, options) {
        return this.formioService.loadForms(query, options).toPromise();
    }
    saveSubmission(submission, options) {
        return this.formioService.saveSubmission(submission, options).toPromise();
    }
    loadSubmissions(query, options) {
        return this.formioService.loadSubmissions(query, options).toPromise();
    }
}

function extendRouter(Class, config, ClassRoutes) {
    each(Class.decorators, decorator => {
        each(decorator.args, arg => {
            if (arg.declarations) {
                each(config, component => arg.declarations.push(component));
            }
            if (arg.imports) {
                each(arg.imports, (_import, index) => {
                    if ((_import.ngModule && (_import.ngModule.name === 'RouterModule')) ||
                        (_import.name === 'RouterModule')) {
                        arg.imports[index] = RouterModule.forChild(ClassRoutes(config));
                    }
                });
            }
        });
    });
    return Class;
}

class FormioAlerts {
    constructor() {
        this.alerts = [];
    }
    setAlert(alert) {
        this.alerts = [alert];
    }
    addAlert(alert) {
        this.alerts.push(alert);
    }
    setAlerts(alerts) {
        this.alerts = alerts;
    }
}

var AlertsPosition;
(function (AlertsPosition) {
    AlertsPosition[AlertsPosition["none"] = 0] = "none";
    AlertsPosition[AlertsPosition["top"] = 1] = "top";
    AlertsPosition[AlertsPosition["bottom"] = 2] = "bottom";
    AlertsPosition[AlertsPosition["both"] = 3] = "both";
})(AlertsPosition || (AlertsPosition = {}));

class CustomTagsService {
    constructor() {
        this.tags = [];
    }
    addCustomTag(tag) {
        this.tags.push(tag);
    }
}
CustomTagsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: CustomTagsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CustomTagsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: CustomTagsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: CustomTagsService, decorators: [{
            type: Injectable
        }] });

class FormioBaseComponent {
    constructor(ngZone, config, customTags) {
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        this.submission = {};
        this.noeval = Evaluator.noeval;
        this.readOnly = false;
        this.viewOnly = false;
        this.hideLoading = false;
        this.hooks = {};
        this.watchSubmissionErrors = false;
        this.dataTableActions = [];
        this.render = new EventEmitter();
        this.customEvent = new EventEmitter();
        this.fileUploadingStatus = new EventEmitter();
        this.submit = new EventEmitter();
        this.prevPage = new EventEmitter();
        this.nextPage = new EventEmitter();
        this.beforeSubmit = new EventEmitter();
        this.rowAdd = new EventEmitter();
        this.rowAdded = new EventEmitter();
        this.rowEdit = new EventEmitter();
        this.rowEdited = new EventEmitter();
        this.rowDelete = new EventEmitter();
        this.rowClick = new EventEmitter();
        this.rowSelectChange = new EventEmitter();
        this.change = new EventEmitter();
        this.invalid = new EventEmitter();
        this.errorChange = new EventEmitter();
        this.formLoad = new EventEmitter();
        this.submissionLoad = new EventEmitter();
        this.ready = new EventEmitter();
        this.AlertsPosition = AlertsPosition;
        this.initialized = false;
        this.alerts = new FormioAlerts();
        this.submitting = false;
        this.submissionSuccess = false;
        this.isLoading = true;
        this.formioReady = new Promise((ready) => {
            this.formioReadyResolve = ready;
        });
    }
    getRenderer() {
        return this.renderer;
    }
    getRendererOptions() {
        const extraTags = this.customTags ? this.customTags.tags : [];
        return assign({}, {
            icons: get(this.config, 'icons', 'fontawesome'),
            noAlerts: get(this.options, 'noAlerts', true),
            readOnly: this.readOnly,
            viewAsHtml: this.viewOnly,
            ...(this.viewOnly && { renderMode: "html" }),
            i18n: get(this.options, 'i18n', null),
            fileService: get(this.options, 'fileService', null),
            hooks: this.hooks,
            sanitizeConfig: {
                addTags: extraTags
            },
            dataTableActions: this.dataTableActions
        }, this.renderOptions || {});
    }
    createRenderer() {
        const Renderer = this.getRenderer();
        const form = (new Renderer(this.formioElement ? this.formioElement.nativeElement : null, this.form, this.getRendererOptions()));
        return form.instance;
    }
    setForm(form) {
        this.form = form;
        if (this.formio) {
            this.formio.destroy();
        }
        if (this.form.title) {
            this.label = this.form.title;
        }
        else if (this.form.components && this.form.components[0]) {
            this.label = this.form.components[0].label;
        }
        // Clear out the element to render the new form.
        if (this.formioElement && this.formioElement.nativeElement) {
            this.formioElement.nativeElement.innerHTML = '';
        }
        this.formio = this.createRenderer();
        this.formio.submission = this.submission;
        if (this.renderOptions && this.renderOptions.validateOnInit) {
            this.formio.setValue(this.submission, { validateOnInit: true });
        }
        if (this.url) {
            this.formio.setUrl(this.url, this.formioOptions || {});
        }
        if (this.src) {
            this.formio.setUrl(this.src, this.formioOptions || {});
        }
        this.formio.nosubmit = true;
        this.formio.on('prevPage', (data) => this.ngZone.run(() => this.onPrevPage(data)));
        this.formio.on('nextPage', (data) => this.ngZone.run(() => this.onNextPage(data)));
        this.formio.on('change', (value, flags, isModified) => this.ngZone.run(() => this.onChange(value, flags, isModified)));
        this.formio.on('rowAdd', (component) => this.ngZone.run(() => this.rowAdd.emit(component)));
        this.formio.on('rowAdded', (data, component) => this.ngZone.run(() => this.rowAdded.emit({ component, row: data })));
        this.formio.on('rowEdit', (data, rowIndex, index, component) => this.ngZone.run(() => this.rowEdit.emit({ component, row: data, rowIndex, index })));
        this.formio.on('rowEdited', (data, rowIndex, component) => this.ngZone.run(() => this.rowEdited.emit({ component, row: data, rowIndex })));
        this.formio.on('rowDelete', (data, rowIndex, index, component) => this.ngZone.run(() => this.rowDelete.emit({ component, row: data, rowIndex, index })));
        this.formio.on('rowClick', (row, rowIndex, index, component) => this.ngZone.run(() => this.rowClick.emit({ component, row, rowIndex, index })));
        this.formio.on('rowSelectChange', (selectedRows, component) => this.ngZone.run(() => this.rowSelectChange.emit({ selectedRows, component })));
        this.formio.on('customEvent', (event) => this.ngZone.run(() => this.customEvent.emit(event)));
        ['fileUploadingStart', 'fileUploadingEnd'].forEach((eventName, index) => {
            const status = !!index ? 'end' : 'start';
            this.formio.on(eventName, () => this.ngZone.run(() => this.fileUploadingStatus.emit(status)));
        });
        this.formio.on('submit', (submission, saved) => this.ngZone.run(() => this.submitForm(submission, saved)));
        this.formio.on('error', (err) => this.ngZone.run(() => {
            this.submissionSuccess = false;
            return this.onError(err);
        }));
        this.formio.on('render', () => this.ngZone.run(() => this.render.emit()));
        this.formio.on('formLoad', (loadedForm) => this.ngZone.run(() => this.formLoad.emit(loadedForm)));
        return this.formio.ready.then(() => {
            this.ngZone.run(() => {
                this.isLoading = false;
                this.ready.emit(this);
                this.formioReadyResolve(this.formio);
                if (this.formio.submissionReady) {
                    this.formio.submissionReady.then((submission) => {
                        this.submissionLoad.emit(submission);
                    });
                }
            });
            return this.formio;
        });
    }
    initialize() {
        if (this.initialized) {
            return;
        }
        const extraTags = this.customTags ? this.customTags.tags : [];
        const defaultOptions = {
            errors: {
                message: 'Please fix the following errors before submitting.'
            },
            alerts: {
                submitMessage: 'Submission Complete.'
            },
            disableAlerts: false,
            hooks: {
                beforeSubmit: null
            },
            sanitizeConfig: {
                addTags: extraTags
            },
            alertsPosition: AlertsPosition.top,
        };
        this.options = Object.assign(defaultOptions, this.options);
        if (this.options.disableAlerts) {
            this.options.alertsPosition = AlertsPosition.none;
        }
        this.initialized = true;
    }
    ngOnInit() {
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (this.language) {
            if (typeof this.language === 'string') {
                this.formio.language = this.language;
            }
            else {
                this.language.subscribe((lang) => {
                    this.formio.language = lang;
                });
            }
        }
        if (this.refresh) {
            this.refresh.subscribe((refresh) => this.onRefresh(refresh));
        }
        if (this.error) {
            this.error.subscribe((err) => this.onError(err));
        }
        if (this.success) {
            this.success.subscribe((message) => {
                this.alerts.setAlert({
                    type: 'success',
                    message: message || get(this.options, 'alerts.submitMessage')
                });
            });
        }
        if (this.src) {
            if (!this.service) {
                this.service = new FormioService(this.src);
            }
            this.isLoading = true;
            this.service.loadForm({ params: { live: 1 } }).subscribe((form) => {
                if (form && form.components) {
                    this.ngZone.runOutsideAngular(() => {
                        this.setForm(form);
                    });
                }
                // if a submission is also provided.
                if (isEmpty(this.submission) &&
                    this.service &&
                    this.service.formio.submissionId) {
                    this.service.loadSubmission().subscribe((submission) => {
                        if (this.readOnly) {
                            this.formio.options.readOnly = true;
                        }
                        this.submission = this.formio.submission = submission;
                    }, err => this.onError(err));
                }
            }, err => this.onError(err));
        }
        if (this.url && !this.service) {
            this.service = new FormioService(this.url);
        }
    }
    ngOnDestroy() {
        if (this.formio) {
            this.formio.destroy();
        }
    }
    onRefresh(refresh) {
        this.formioReady.then(() => {
            if (refresh.form) {
                this.formio.setForm(refresh.form).then(() => {
                    if (refresh.submission) {
                        this.formio.setSubmission(refresh.submission);
                    }
                });
            }
            else if (refresh.submission) {
                this.formio.setSubmission(refresh.submission);
            }
            else {
                switch (refresh.property) {
                    case 'submission':
                        this.formio.submission = refresh.value;
                        break;
                    case 'form':
                        this.formio.form = refresh.value;
                        break;
                }
            }
        });
    }
    ngOnChanges(changes) {
        Evaluator.noeval = this.noeval;
        this.initialize();
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular(() => {
                this.setForm(changes.form.currentValue);
            });
        }
        this.formioReady.then(() => {
            if (changes.submission && changes.submission.currentValue) {
                this.formio.setSubmission(changes.submission.currentValue, {
                    fromSubmission: !changes.submission.firstChange
                });
            }
            if (changes.hideComponents && changes.hideComponents.currentValue) {
                const hiddenComponents = changes.hideComponents.currentValue;
                this.formio.options.hide = hiddenComponents;
                this.formio.everyComponent((component) => {
                    component.options.hide = hiddenComponents;
                    if (hiddenComponents.includes(component.component.key)) {
                        component.visible = false;
                    }
                });
            }
        });
    }
    onPrevPage(data) {
        this.alerts.setAlerts([]);
        this.prevPage.emit(data);
    }
    onNextPage(data) {
        this.alerts.setAlerts([]);
        this.nextPage.emit(data);
    }
    onSubmit(submission, saved, noemit) {
        this.submitting = false;
        this.submissionSuccess = true;
        this.formio.setValue(fastCloneDeep(submission), {
            noValidate: true,
            noCheck: true
        });
        if (saved) {
            this.formio.emit('submitDone', submission);
        }
        if (!noemit) {
            this.submit.emit(submission);
        }
        if (!this.success) {
            this.alerts.setAlert({
                type: 'success',
                message: get(this.options, 'alerts.submitMessage')
            });
        }
    }
    onError(err) {
        this.alerts.setAlerts([]);
        this.submitting = false;
        this.isLoading = false;
        if (!err) {
            return;
        }
        // Make sure it is an array.
        const errors = Array.isArray(err) ? err : [err];
        // Emit these errors again.
        this.errorChange.emit(errors);
        if (err.silent) {
            return;
        }
        if (this.formio && errors.length) {
            this.formio.emit('submitError', errors);
        }
        // Iterate through each one and set the alerts array.
        errors.forEach((error) => {
            const { message, paths, } = error
                ? error.details
                    ? {
                        message: error.details.map((detail) => detail.message),
                        paths: error.details.map((detail) => detail.path),
                    }
                    : {
                        message: error.message || error.toString(),
                        paths: error.path ? [error.path] : [],
                    }
                : {
                    message: '',
                    paths: [],
                };
            let shouldErrorDisplay = true;
            if (this.formio) {
                paths.forEach((path, index) => {
                    const component = this.formio.getComponent(path);
                    if (component) {
                        const components = Array.isArray(component) ? component : [component];
                        const messageText = Array.isArray(message) ? message[index] : message;
                        components.forEach((comp) => comp.setCustomValidity(messageText, true));
                        this.alerts.addAlert({
                            type: 'danger',
                            message: message[index],
                            component,
                        });
                        shouldErrorDisplay = false;
                    }
                });
                if (window.VPAT_ENABLED) {
                    if (typeof error === 'string' && this.formio.components) {
                        this.formio.components.forEach((comp) => {
                            if (comp && comp.type !== 'button') {
                                comp.setCustomValidity(message, true);
                            }
                        });
                    }
                }
                if (!this.noAlerts) {
                    this.formio.showErrors();
                }
            }
            if (shouldErrorDisplay) {
                this.alerts.addAlert({
                    type: 'danger',
                    message,
                    component: error.component,
                });
            }
        });
    }
    focusOnComponet(key) {
        if (this.formio) {
            this.formio.focusOnComponent(key);
        }
    }
    submitExecute(submission, saved = false) {
        if (this.service && !this.url && !saved) {
            this.service
                .saveSubmission(submission)
                .subscribe((sub) => this.onSubmit(sub, true), err => this.onError(err));
        }
        else {
            this.onSubmit(submission, false);
        }
    }
    submitForm(submission, saved = false) {
        // Keep double submits from occurring...
        if (this.submitting) {
            return;
        }
        this.formio.setMetadata(submission);
        this.submissionSuccess = false;
        this.submitting = true;
        this.beforeSubmit.emit(submission);
        // if they provide a beforeSubmit hook, then allow them to alter the submission asynchronously
        // or even provide a custom Error method.
        const beforeSubmit = get(this.options, 'hooks.beforeSubmit');
        if (beforeSubmit) {
            beforeSubmit(submission, (err, sub) => {
                if (err) {
                    this.onError(err);
                    return;
                }
                this.submitExecute(sub, saved);
            });
        }
        else {
            this.submitExecute(submission, saved);
        }
    }
    onChange(value, flags, isModified) {
        if (this.watchSubmissionErrors && !this.submissionSuccess) {
            const errors = get(this, 'formio.errors', []);
            const alerts = get(this, 'alerts.alerts', []);
            const submitted = get(this, 'formio.submitted', false);
            if (submitted && (errors.length || alerts.length)) {
                this.onError(errors);
            }
        }
        return this.change.emit({ ...value, flags, isModified });
    }
}
FormioBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioBaseComponent, deps: [{ token: i0.NgZone }, { token: FormioAppConfig, optional: true }, { token: CustomTagsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
FormioBaseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioBaseComponent, selector: "ng-component", inputs: { form: "form", submission: "submission", src: "src", url: "url", service: "service", options: "options", noeval: "noeval", formioOptions: "formioOptions", renderOptions: "renderOptions", readOnly: "readOnly", viewOnly: "viewOnly", hideLoading: "hideLoading", hideComponents: "hideComponents", refresh: "refresh", error: "error", success: "success", language: "language", hooks: "hooks", renderer: "renderer", watchSubmissionErrors: "watchSubmissionErrors", dataTableActions: "dataTableActions" }, outputs: { render: "render", customEvent: "customEvent", fileUploadingStatus: "fileUploadingStatus", submit: "submit", prevPage: "prevPage", nextPage: "nextPage", beforeSubmit: "beforeSubmit", rowAdd: "rowAdd", rowAdded: "rowAdded", rowEdit: "rowEdit", rowEdited: "rowEdited", rowDelete: "rowDelete", rowClick: "rowClick", rowSelectChange: "rowSelectChange", change: "change", invalid: "invalid", errorChange: "errorChange", formLoad: "formLoad", submissionLoad: "submissionLoad", ready: "ready" }, viewQueries: [{ propertyName: "formioElement", first: true, predicate: ["formio"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioBaseComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: FormioAppConfig, decorators: [{
                    type: Optional
                }] }, { type: CustomTagsService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { form: [{
                type: Input
            }], submission: [{
                type: Input
            }], src: [{
                type: Input
            }], url: [{
                type: Input
            }], service: [{
                type: Input
            }], options: [{
                type: Input
            }], noeval: [{
                type: Input
            }], formioOptions: [{
                type: Input
            }], renderOptions: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], viewOnly: [{
                type: Input
            }], hideLoading: [{
                type: Input
            }], hideComponents: [{
                type: Input
            }], refresh: [{
                type: Input
            }], error: [{
                type: Input
            }], success: [{
                type: Input
            }], language: [{
                type: Input
            }], hooks: [{
                type: Input
            }], renderer: [{
                type: Input
            }], watchSubmissionErrors: [{
                type: Input
            }], dataTableActions: [{
                type: Input
            }], render: [{
                type: Output
            }], customEvent: [{
                type: Output
            }], fileUploadingStatus: [{
                type: Output
            }], submit: [{
                type: Output
            }], prevPage: [{
                type: Output
            }], nextPage: [{
                type: Output
            }], beforeSubmit: [{
                type: Output
            }], rowAdd: [{
                type: Output
            }], rowAdded: [{
                type: Output
            }], rowEdit: [{
                type: Output
            }], rowEdited: [{
                type: Output
            }], rowDelete: [{
                type: Output
            }], rowClick: [{
                type: Output
            }], rowSelectChange: [{
                type: Output
            }], change: [{
                type: Output
            }], invalid: [{
                type: Output
            }], errorChange: [{
                type: Output
            }], formLoad: [{
                type: Output
            }], submissionLoad: [{
                type: Output
            }], ready: [{
                type: Output
            }], formioElement: [{
                type: ViewChild,
                args: ['formio', { static: true }]
            }] } });

class FormioLoaderComponent {
}
FormioLoaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioLoaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FormioLoaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioLoaderComponent, selector: "formio-loader", inputs: { isLoading: "isLoading" }, ngImport: i0, template: "<div class=\"formio-loader-wrapper\" *ngIf=\"isLoading\">\r\n  <div class=\"formio-loader\"></div>\r\n</div>\r\n", styles: [".formio-loader-wrapper{position:absolute;top:0px;bottom:0px;left:0px;right:0px;z-index:1000}.formio-loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioLoaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-loader', template: "<div class=\"formio-loader-wrapper\" *ngIf=\"isLoading\">\r\n  <div class=\"formio-loader\"></div>\r\n</div>\r\n", styles: [".formio-loader-wrapper{position:absolute;top:0px;bottom:0px;left:0px;right:0px;z-index:1000}.formio-loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { isLoading: [{
                type: Input
            }] } });

class ParseHtmlContentPipe {
    /*
      Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
      And then render in template.
    */
    transform(content) {
        const parsedContent = new DOMParser().parseFromString(content, 'text/html').body.childNodes[0];
        return parsedContent?.textContent;
    }
}
ParseHtmlContentPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: ParseHtmlContentPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ParseHtmlContentPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: ParseHtmlContentPipe, name: "parseHtmlContent", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: ParseHtmlContentPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'parseHtmlContent', pure: false }]
        }] });

class FormioAlertsComponent {
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
FormioAlertsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioAlertsComponent, selector: "formio-alerts", inputs: { alerts: "alerts" }, outputs: { focusComponent: "focusComponent" }, ngImport: i0, template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">\r\n  {{alert.message | parseHtmlContent}}\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "pipe", type: ParseHtmlContentPipe, name: "parseHtmlContent" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAlertsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio-alerts', template: "<div *ngFor=\"let alert of alerts.alerts\" class=\"alert alert-{{ alert.type }}\" role=\"alert\" (click)=\"getComponent($event, alert)\">\r\n  {{alert.message | parseHtmlContent}}\r\n</div>\r\n" }]
        }], propDecorators: { alerts: [{
                type: Input
            }], focusComponent: [{
                type: Output
            }] } });

/* tslint:disable */
/* tslint:enable */
class FormioComponent extends FormioBaseComponent {
    constructor(ngZone, config, customTags) {
        super(ngZone, config, customTags);
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        if (this.config) {
            Formio.setBaseUrl(this.config.apiUrl);
            Formio.setProjectUrl(this.config.appUrl);
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
    }
    getRenderer() {
        return this.renderer || Form;
    }
}
FormioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioComponent, deps: [{ token: i0.NgZone }, { token: FormioAppConfig, optional: true }, { token: CustomTagsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
FormioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioComponent, selector: "formio", usesInheritance: true, ngImport: i0, template: "<div role=\"form\" [attr.aria-label]=\"label\">\r\n  <div *ngIf=\"isLoading && !hideLoading\" style=\"position:relative;height:200px\">\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n  </div>\r\n  <formio-alerts *ngIf=\"this.options.alertsPosition === AlertsPosition.top || this.options.alertsPosition === AlertsPosition.both\" (focusComponent)=\"focusOnComponet($event)\" [alerts]=\"alerts\"></formio-alerts>\r\n  <div #formio></div>\r\n  <formio-alerts *ngIf=\"this.options.alertsPosition === AlertsPosition.bottom || this.options.alertsPosition === AlertsPosition.both\" (focusComponent)=\"focusOnComponet($event)\" [alerts]=\"alerts\"></formio-alerts>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";.choices{position:relative;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.5}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=\"\"] .choices__button{display:none}.choices[data-type*=select-one]:after{content:\"\";height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}dialog{position:absolute;left:0;right:0;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;margin:auto;border:solid;padding:1em;background:#fff;color:#000;display:block}dialog:not([open]){display:none}dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.1)}._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}dialog.fixed{position:fixed;top:50%;transform:translateY(-50%)}.formio-loader{position:relative;min-height:60px}.loader-wrapper{z-index:1000;position:absolute;top:0;left:0;bottom:0;right:0;height:120px;background-color:#0000}.loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.formio-form{position:relative;min-height:80px}.formio-error-wrapper,.formio-warning-wrapper{padding:1em}.formio-error-wrapper{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.formio-error-wrapper .formio-errors .error{color:#c20000}.formio-error-wrapper .field-required:after{color:#c20000}.formio-warning-wrapper{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.formio-disabled-input .form-control.flatpickr-input{background-color:#eee}.builder-component.has-error .invalid-feedback,.formio-component.alert-danger .invalid-feedback,.formio-component.has-error .invalid-feedback,.formio-component.has-message .invalid-feedback{display:block;color:inherit;margin-top:4px}.formio-errors .error{color:#dc3545}.formio-errors .warning{color:#856404}.formio-errors .info{color:#004085}.formio-wysiwyg-editor{min-height:200px;background-color:#fff}.has-feedback .form-control{padding-right:10px}.has-feedback .form-control[type=hidden]{padding-right:0}.has-error.bg-danger{padding:4px}.ql-source:after{content:\"[source]\";white-space:nowrap}.quill-source-code{width:100%;margin:0;background:#1d1d1d;box-sizing:border-box;color:#ccc;font-size:15px;outline:0;padding:20px;line-height:24px;font-family:Consolas,Menlo,Monaco,Courier New,monospace;position:absolute;top:0;bottom:0;border:none;display:none}.formio-component-tags tags{background-color:#fff}.field-required:after,.tab-error:after{content:\" *\";color:#eb0000}.field-required:after{position:relative;z-index:10}.glyphicon-spin{animation:formio-spin 1s infinite linear}@keyframes formio-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.button-icon-right{margin-left:5px}.formio-component-submit .submit-success:after{content:\"\\2713\";position:relative;right:-4px;top:1px;line-height:1}.formio-component-submit .submit-fail:after{content:\"\\2717\";position:relative;right:-4px;top:1px;line-height:1}.card-vertical{display:flex;flex-direction:row;margin-top:5px}.card-vertical .card-body,.tab,.tab-content{flex-grow:2}.nav-tabs-vertical{display:flex;flex-direction:column;border-right:1px solid #ddd;padding-left:5px;margin-right:10px;border-bottom:0}.card-vertical>.card-body,.card-vertical>.tab,.card-vertical>.tab-content{flex-basis:85%}.card-vertical ul>li>.nav-link-vertical{border-right-color:transparent;border-radius:4px 0 0 4px;margin-right:0}.card-vertical ul>li>.nav-link-vertical.active{border-bottom-color:#ddd;border-right-color:transparent}.card-vertical ul>li>.nav-link-vertical.active:hover{border-right-color:transparent}.nav-tabs-vertical>li{margin:0 -1px 0 0}.formio-component-submit .submit-fail[disabled]{opacity:1}.form-control.flatpickr-input{background-color:#fff}.input-group .flatpickr-wrapper{flex-grow:1}.flatpickr-calendar .flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-calendar .flatpickr-current-month input.cur-year:focus,.flatpickr-calendar .flatpickr-days:focus{outline:auto}td>.form-group{margin-bottom:0}.signature-pad-body{overflow:hidden;position:relative}.signature-pad-canvas{border-radius:4px;box-shadow:0 0 5px #00000005 inset;border:1px solid #f4f4f4}.btn.signature-pad-refresh{position:absolute;left:0;top:0;z-index:1000;padding:3px;line-height:0}[dir=rtl] .btn.signature-pad-refresh{left:unset;right:0}.formio-component-multiple .choices__input{width:100%}.formio-component-multiple .is-invalid{border-color:#f04124}.formio-component-multiple :not(.is-invalid){border-color:#ccc}.choices__list--dropdown .choices__item--selectable{padding-right:0}.signature-pad-refresh img{height:1.2em}.signature-pad-footer{text-align:center;color:#c3c3c3}.choices__list--dropdown{z-index:100}.choices__list--multiple .choices__item{border-radius:0;padding:2px 8px;line-height:1em;margin-bottom:6px}.choices__list--single{padding:0}.choices__item.choices__item--selectable{white-space:nowrap;overflow:hidden;padding-right:25px;text-overflow:ellipsis}.choices__input{padding:2px}.choices[dir=rtl]>*{text-align:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable]{padding-left:5px;float:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable] .choices__button{float:left;margin:0 8px 0 -4px;padding-left:unset;padding-right:16px;border-left:unset;border-right:1px solid #008fa1;overflow:hidden}@-moz-document url-prefix(){.choices__button{float:right}}.formio-component-file .fileSelector{position:relative;padding:15px;border:2px dashed #ddd;text-align:center}.formio-component-file .fileSelector .loader-wrapper{display:none;width:100%;height:100%;background-color:#0000001a}.formio-component-file .fileSelector .loader-wrapper .loader{height:45px;width:45px;margin-top:-23px;margin-left:-23px}.formio-component-file .fileSelector a{text-decoration:underline}.formio-component-file .fileSelector.fileDragOver{border-color:#127abe}.formio-component-file .fileSelector .fa,.formio-component-file .fileSelector .glyphicon{font-size:20px;margin-right:5px}[dir=rtl] .formio-component-file .fileSelector .fa,[dir=rtl] .formio-component-file .fileSelector .glyphicon{margin-right:unset;margin-left:5px}.formio-component-file .fileSelector .browse{cursor:pointer}@keyframes formio-dialog-fadeout{0%{opacity:1}to{opacity:0}}@keyframes formio-dialog-fadein{0%{opacity:0}to{opacity:1}}.formio-dialog{box-sizing:border-box;font-size:.8em;color:#666}.formio-dialog.formio-modaledit-dialog{font-size:inherit}.formio-dialog *,.formio-dialog :after,.formio-dialog :before{box-sizing:inherit}.formio-dialog{position:fixed;overflow:auto;-webkit-overflow-scrolling:touch;z-index:10000;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.4);animation:formio-dialog-fadein .5s}.formio-dialog.formio-dialog-disabled-animation,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-content,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-overlay{animation:none!important}.formio-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;margin-right:15px;background:0 0}.formio-dialog-no-overlay{pointer-events:none}.formio-dialog.formio-dialog-closing .formio-dialog-overlay{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-content{background:#fff;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;pointer-events:all;overflow:auto}.formio-component-modal-wrapper-select .formio-dialog-content{overflow:initial}.formio-dialog.formio-dialog-closing .formio-dialog-content{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-close:before{font-family:Helvetica,Arial,sans-serif;content:\"\\d7\";cursor:pointer}body.formio-dialog-open,html.formio-dialog-open{overflow:hidden}.formio-dialog .tab-content{padding-top:12px}.formio-dialog-close{z-index:1000}@keyframes formio-dialog-flyin{0%{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:translateY(0)}}@keyframes formio-dialog-flyout{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-40px)}}.formio-dialog.formio-dialog-theme-default{padding-bottom:160px;padding-top:160px}.formio-dialog.formio-dialog-theme-default .component-edit-container{padding:.5em}.formio-dialog.formio-dialog-theme-default.formio-dialog-closing .formio-dialog-content{animation:formio-dialog-flyout .5s}.formio-dialog.formio-dialog-theme-default .formio-dialog-content{animation:formio-dialog-flyin .5s;background:#f0f0f0;border-radius:5px;font-family:Helvetica,sans-serif;font-size:1.1em;line-height:1.5em;margin:0 auto;max-width:100%;padding:1em;position:relative;width:80%}.formio-dialog.formio-dialog-theme-default .formio-dialog-close{border:none;background:0 0;cursor:pointer;position:absolute;right:1px;top:1px;z-index:100}.formio-clickable{cursor:pointer}.component-settings .nav>li>a{padding:8px 10px}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:before{display:block;padding:3px;background:0 0;color:#8a8a8a;content:\"\\d7\";font-size:26px;font-weight:400;line-height:26px;text-align:center}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:active:before,.formio-dialog.formio-dialog-theme-default .formio-dialog-close:hover:before{color:#777}.formio-dialog.formio-dialog-theme-default .formio-dialog-message{margin-bottom:.5em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input{margin-bottom:1em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url],.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea{background:#fff;border:0;border-radius:3px;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0 0 .25em;min-height:2.5em;padding:.25em .67em;width:100%}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea:focus{box-shadow:inset 0 0 0 2px #8dbdf1;outline:0}.formio-dialog-buttons{display:flex;justify-content:flex-end}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons{*zoom:1}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons:after{content:\"\";display:table;clear:both}.formio-dialog.formio-dialog-theme-default .formio-dialog-button{border:0;border-radius:3px;cursor:pointer;float:right;font-family:inherit;font-size:.8em;letter-spacing:.1em;line-height:1em;margin:0 0 0 .5em;padding:.75em 2em;text-transform:uppercase}.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:formio-dialog-pulse 1.1s infinite;outline:0}@media (max-width:568px){.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:none}}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-primary{background:#3288e6;color:#fff}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-secondary{background:#e0e0e0;color:#777}.formio-dialog-content .panel{margin:0}.formio-dialog-content [ref=dialogHeader]{padding-right:15px}.formio-placeholder{position:absolute;color:#999}.formio-dialog .formio-dialog-close{cursor:pointer}.formio-iframe{border:none;width:100%;height:1000px}.inline-form-button{margin-right:10px}.tooltip{opacity:1}.tooltip[x-placement=right] .tooltip-arrow{border-right:5px solid #000}.tooltip[x-placement=right] .tooltip-inner{margin-left:8px}.control-label--bottom{margin-bottom:0;margin-top:5px}.formio-component-label-hidden{position:relative}.formio-hidden{margin:0}.formio-removed{display:none}.control-label--hidden{position:absolute;top:6px;right:5px}.formio-component-datetime .control-label--hidden.field-required{right:45px;z-index:3}.formio-component-selectboxes .control-label--hidden.field-required,.formio-component-survey .control-label--hidden.field-required{top:0}.formio-component-resource .control-label--hidden.field-required,.formio-component-select .control-label--hidden.field-required{right:40px;z-index:2}.formio-component-radio .control-label--hidden.field-required:after,.formio-component-selectboxes .control-label--hidden.field-required:after{display:none}.formio-component-radio.formio-component-label-hidden.required .form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .form-check-label:before{position:relative;content:\"* \";color:#eb0000}.formio-component-radio.formio-component-label-hidden.required .label-position-right.form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .label-position-right.form-check-label:before{right:20px}.formio-component-datasource,.formio-component-hidden:not(.formio-component-checkbox){margin-bottom:0}.checkbox-inline label,.radio-inline label{font-weight:400;cursor:pointer}.editgrid-listgroup{margin-bottom:10px}.tree-listgroup{flex-direction:row}.formio-component-submit button[disabled]+.has-error{display:block}.formio-choices.form-group{margin-bottom:0}.formio-choices[data-type=select-multiple] .form-control{height:auto}.form-control.formio-multiple-mask-select{width:15%;z-index:4}.form-control.formio-multiple-mask-input{width:85%}.input-group.formio-multiple-mask-container{width:100%}.formio-component .table{margin-bottom:0}.editgrid-table-container{margin-bottom:10px;max-width:calc(100vw - 140px)}.editgrid-table-container .table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.editgrid-table-column{border:none}.editgrid-table-head{border:1px solid #ddd}.editgrid-table-body{border:1px solid #ddd;border-top:0}.formio-hide-label-panel-tooltip{margin-top:-10px;margin-left:-10px}.is-disabled .choices__list--multiple .choices__item{padding:5px 10px}.is-disabled .choices__list--multiple .choices__item .choices__button{display:none}.formio-collapse-icon{cursor:pointer;margin-right:4px}[dir=rtl] .formio-collapse-icon{margin-right:unset;margin-left:4px}.formio-component-dateTime .form-control[type=datetime-local]~.input-group-addon,.formio-component-datetime .form-control[type=datetime-local]~.input-group-addon{width:auto}.formio-component-datagrid .formio-datagrid-remove{position:absolute;top:0;right:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-datagrid .datagrid-table>tbody>tr>td:last-child{position:relative}.formio-component-datagrid .datagrid-table>tbody>tr:hover>td:last-child .formio-datagrid-remove{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-component-modaledit .formio-modaledit-view-container{position:relative;border:1px solid #ddd;min-height:34px;padding:6px 12px;cursor:text}td .formio-component-modaledit .formio-modaledit-view-container{padding:0;border-style:none}.formio-component-modaledit .formio-modaledit-edit{position:absolute;top:0;left:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-modaledit .formio-modaledit-view-container:hover .formio-modaledit-edit{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-modaledit-dialog .formio-modaledit-close{position:absolute;top:100%;right:0;border-radius:0}.reset-margins a,.reset-margins abbr,.reset-margins acronym,.reset-margins address,.reset-margins applet,.reset-margins article,.reset-margins aside,.reset-margins audio,.reset-margins b,.reset-margins big,.reset-margins blockquote,.reset-margins body,.reset-margins canvas,.reset-margins caption,.reset-margins center,.reset-margins cite,.reset-margins code,.reset-margins dd,.reset-margins del,.reset-margins details,.reset-margins dfn,.reset-margins div,.reset-margins dl,.reset-margins dt,.reset-margins em,.reset-margins embed,.reset-margins fieldset,.reset-margins figcaption,.reset-margins figure,.reset-margins footer,.reset-margins form,.reset-margins h1,.reset-margins h2,.reset-margins h3,.reset-margins h4,.reset-margins h5,.reset-margins h6,.reset-margins header,.reset-margins hgroup,.reset-margins html,.reset-margins i,.reset-margins iframe,.reset-margins img,.reset-margins ins,.reset-margins kbd,.reset-margins label,.reset-margins legend,.reset-margins li,.reset-margins mark,.reset-margins menu,.reset-margins nav,.reset-margins object,.reset-margins ol,.reset-margins output,.reset-margins p,.reset-margins pre,.reset-margins q,.reset-margins ruby,.reset-margins s,.reset-margins samp,.reset-margins section,.reset-margins small,.reset-margins span,.reset-margins strike,.reset-margins strong,.reset-margins sub,.reset-margins summary,.reset-margins sup,.reset-margins table,.reset-margins tbody,.reset-margins td,.reset-margins tfoot,.reset-margins th,.reset-margins thead,.reset-margins time,.reset-margins tr,.reset-margins tt,.reset-margins u,.reset-margins ul,.reset-margins var,.reset-margins video{margin:0}.ck-body .ck.ck-balloon-panel{z-index:101000}.formio-component-select select[disabled=disabled]{-webkit-appearance:none;-moz-appearance:none;text-indent:1px;text-overflow:\"\"}.formio-component-select .choices.is-disabled[data-type*=select-one]:after,.formio-component-select div[disabled=disabled] button{display:none}.datagrid-group-label.collapsed>td{display:none}.datagrid-group-header.clickable{cursor:pointer}.datagrid-group-header.clickable .datagrid-group-label:before{display:inline-block;vertical-align:middle;content:\"\\25be\";margin:0 5px}.datagrid-group-header.clickable.collapsed .datagrid-group-label:before{content:\"\\25b8\"}.formio-component.alert-danger .help-block,.formio-component.alert-warning .help-block{color:inherit}.tree__level_even{background-color:#f6f6f6}.tree__node-content{margin-bottom:10px}.tree__node-children{margin:0}.formio-select-autocomplete-input{opacity:0;position:relative;z-index:-1;display:block;height:0;border:none}.has-error>.help-block{margin-top:5px;margin-bottom:10px}.no-top-border-table>.table>tbody>tr:first-child>td{border-top:none}.table>tbody>tr>td.cell-align-left{text-align:left}.table>tbody>tr>td.cell-align-center{text-align:center}.table>tbody>tr>td.cell-align-center>div{margin-left:auto;margin-right:auto}.table>tbody>tr>td.cell-align-right{text-align:right}.table>tbody>tr>td.cell-align-right>div{margin-left:auto}.table-responsive[ref=component]{overflow-x:visible}.formio-component-textarea .alert .ck-editor__editable{color:inherit}.formio-component-textarea .ck.ck-editor__editable .image .ck-progress-bar{height:4px}div[data-oembed-url]{width:100%}.checkbox label.label-position-bottom,.checkbox label.label-position-left,.checkbox label.label-position-top,.radio label.label-position-bottom,.radio label.label-position-left,.radio label.label-position-top{padding-left:0}.checkbox label.label-position-bottom span,.checkbox label.label-position-top span,.radio label.label-position-bottom span,.radio label.label-position-top span{display:block}.checkbox label.label-position-bottom input[type=checkbox],.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-bottom input[type=radio],.radio label.label-position-top input[type=radio]{position:relative;margin-left:0}.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-top input[type=radio]{margin-top:4px}.checkbox label.label-position-bottom input[type=checkbox],.radio label.label-position-bottom input[type=radio]{margin-bottom:8px}.radio label.label-position-left input[type=radio]{margin-left:10px}.checkbox label.label-position-left input[type=checkbox]{margin-left:4px;position:relative}.open-modal-button{width:100%;text-align:left;white-space:normal;height:auto}.formio-component-modal-wrapper-signature .open-modal-button{text-align:center;height:100%;font-size:1.4em;padding:0;margin:0}.formio-component-content .image{display:table;clear:both;text-align:center;margin:1em auto}.formio-component-content .image>img{display:block;margin:0 auto;max-width:100%;min-width:50px}.formio-component-content .image>figcaption{display:table-caption;caption-side:bottom;word-break:break-word;color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}.formio-component-content .image.image_resized{max-width:100%;display:block;box-sizing:border-box}.formio-component-content .image.image_resized img{width:100%}.formio-component-content .image.image_resized>figcaption{display:block}.formio-component-content .media{clear:both;margin:1em 0;display:block;min-width:15em}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-side{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-center{margin-left:auto;margin-right:auto}.formio-component-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content blockquote{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;margin-right:0;font-style:italic;border-left:solid 5px hsl(0deg,0%,80%)}.formio-component-content[dir=rtl] blockquote{border-left:0;border-right:solid 5px hsl(0deg,0%,80%)}.formio-component-content .text-tiny{font-size:.7em}.formio-component-content .text-small{font-size:.85em}.formio-component-content .text-big{font-size:1.4em}.formio-component-content .text-huge{font-size:1.8em}.formio-component-address.formio-component-label-hidden>label.field-required{z-index:1}.formio-component-address.formio-component-label-hidden>label.field-required~.address-autocomplete-container .address-autocomplete-remove-value-icon{right:20px}.address-autocomplete-container{position:relative}.address-autocomplete-container .address-autocomplete-remove-value-icon{cursor:pointer;position:absolute;margin-top:-9px;right:10px;top:50%}.address-autocomplete-container .address-autocomplete-remove-value-icon--hidden{display:none}.autocomplete{background:#fff;font:14px/22px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;overflow:auto;box-sizing:border-box;border:1px solid rgba(50,50,50,.6);z-index:11000}.autocomplete>div{cursor:pointer;padding:6px 10px}.autocomplete>div.selected,.autocomplete>div:hover:not(.group){background:#1e90ff;color:#fff}.field-wrapper{display:flex}.field-wrapper--reverse{flex-direction:row-reverse}.field-wrapper .field-label--right{text-align:right}.formio-component-modal-wrapper{margin-bottom:10px}.formio-component-modal-wrapper .open-modal-button{height:auto}.formio-component-modal-wrapper .component-rendering-hidden{visibility:hidden}.formio-component-textarea div.formio-editor-read-only-content[ref=input]{white-space:pre-wrap}.formio-editor-read-only-content img{max-width:100%}.formio-editor-read-only-content li[data-list=bullet]{list-style-type:none}.formio-editor-read-only-content li[data-list=bullet] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=bullet] .ql-ui:before{content:\"\\2022\"}.formio-editor-read-only-content li[data-list=ordered]{list-style-type:none;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-0}.formio-editor-read-only-content li[data-list=ordered] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=ordered] .ql-ui:before{content:counter(list-0,decimal) \". \"}.formio-editor-read-only-content figure.table table{border-collapse:collapse;border-spacing:0;width:100%;height:100%;border:1px double #b3b3b3;table-layout:fixed}.formio-editor-read-only-content figure.table table td,.formio-editor-read-only-content figure.table table th{min-width:2em;padding:.4em;border:1px solid #bfbfbf}.formio-component-password .pull-right:not(:last-child),.formio-component-textarea .pull-right:not(:last-child),.formio-component-textfield .pull-right:not(:last-child){padding-left:12px}.formio-form>div>nav>ul.pagination{flex-flow:wrap row}.formio-form>div>nav>ul.pagination .page-link{cursor:pointer;color:#1c74d9}.formio-form>div>nav>ul.pagination .page-item.active .page-link{color:#fff;background-color:#1c74d9;border-color:#1c74d9}.classic-pagination{border-bottom:solid 1px #e0e0e0;padding:0 15px 10px;line-height:1em}.classic-pagination-page{padding:0;position:relative}.classic-pagination-title{color:#595959;font-size:16px;margin-bottom:5px}.classic-pagination-dot{position:absolute;width:30px;height:30px;display:block;background:#fbe8aa;top:40px;left:50%;margin-top:-15px;margin-left:-15px;border-radius:50%}.classic-pagination-dot:after{content:\" \";width:14px;height:14px;background:#fbbd19;border-radius:50px;position:absolute;top:8px;left:8px}.classic-pagination .progress,.classic-pagination-progress{position:relative;border-radius:0;height:8px;box-shadow:none;margin:20px 0;border:none;padding:0;background-color:#f6f6f6}.classic-pagination .progress-bar,.classic-pagination-progress-bar{width:0;height:10px;box-shadow:none;background:#fbe8aa}.classic-pagination-page.complete .classic-pagination-progress-bar,.classic-pagination-page.complete .progress-bar{width:100%}.classic-pagination-page.active .classic-pagination-progress-bar,.classic-pagination-page.active .progress-bar{width:50%}.classic-pagination-page.disabled .classic-pagination-dot{background-color:#f5f5f5}.classic-pagination-page.disabled .classic-pagination-dot:after{opacity:0}.classic-pagination-page:first-child .classic-pagination-progress,.classic-pagination-page:first-child .progress{left:50%;width:50%}.classic-pagination-page:first-child.active .classic-pagination-progress-bar,.classic-pagination-page:first-child.active .progress-bar{width:0%}.classic-pagination-page:last-child .classic-pagination-progress,.classic-pagination-page:last-child .progress{width:50%}.classic-pagination-page:last-child.active .classic-pagination-progress-bar,.classic-pagination-page:last-child.active .progress-bar{width:100%}.pac-container{z-index:11000}[ref=buttonMessageContainer].has-error{cursor:pointer}[ref=passwordStrengthIndicator]{display:inline}.formio-security-indicator{display:flex;height:5px}.formio-security-indicator [class^=security-]{width:100%;height:100%}.formio-security-indicator .security-low{background-color:#c51e00}.formio-security-indicator .security-medium{background-color:#ebb400}.formio-security-indicator .security-high{background-color:#bddf00}.formio-security-indicator .security-very-high{background-color:#009118}.formio-component-textarea .formio-editor-read-only-content .text-big{font-size:1.4em}.formio-component-textarea .formio-editor-read-only-content .text-huge{font-size:1.8em}.formio-component-textarea .formio-editor-read-only-content .text-small{font-size:.85em}.formio-component-textarea .formio-editor-read-only-content .text-tiny{font-size:.7em}.formio-component [ref=valueMaskInput]{display:none}.formio-wizard-nav-container{display:flex}.formio-wizard-nav-container li{margin-right:.5rem}@media not all and (min-width:30em){.formio-wizard-nav-container{flex-direction:column}.formio-wizard-nav-container li{margin-right:0}.formio-wizard-nav-container li .btn{width:100%;margin-bottom:.25rem}}.formio-tooltip__trigger{cursor:pointer}.formio-tooltip__body{background-color:#1b1b1b;border-radius:.25rem;bottom:0;color:#f0f0f0;display:none;font-size:1rem;padding:.5rem;position:absolute;left:0;transform:translate(-50%);width:auto;white-space:pre;z-index:1000}.formio-tooltip__body.formio-tooltip--is-set{display:block}.formio-tooltip__body--whitespace{white-space:normal;width:250px}.formio-tooltip__body--right{top:auto;transform:translate(0)}.formio-tooltip__body--left{top:auto;left:0;right:auto;transform:translate(0)}.formio-tooltip__body--bottom{bottom:auto;top:0}.formio-tooltip__wrapper{position:relative}.formio-tooltip__wrapper>span{font-weight:400}span[role=link]{text-decoration:underline;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: FormioLoaderComponent, selector: "formio-loader", inputs: ["isLoading"] }, { kind: "component", type: FormioAlertsComponent, selector: "formio-alerts", inputs: ["alerts"], outputs: ["focusComponent"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'formio', encapsulation: ViewEncapsulation.None, template: "<div role=\"form\" [attr.aria-label]=\"label\">\r\n  <div *ngIf=\"isLoading && !hideLoading\" style=\"position:relative;height:200px\">\r\n    <formio-loader [isLoading]=\"isLoading\"></formio-loader>\r\n  </div>\r\n  <formio-alerts *ngIf=\"this.options.alertsPosition === AlertsPosition.top || this.options.alertsPosition === AlertsPosition.both\" (focusComponent)=\"focusOnComponet($event)\" [alerts]=\"alerts\"></formio-alerts>\r\n  <div #formio></div>\r\n  <formio-alerts *ngIf=\"this.options.alertsPosition === AlertsPosition.bottom || this.options.alertsPosition === AlertsPosition.both\" (focusComponent)=\"focusOnComponet($event)\" [alerts]=\"alerts\"></formio-alerts>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";.choices{position:relative;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.5}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=\"\"] .choices__button{display:none}.choices[data-type*=select-one]:after{content:\"\";height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}dialog{position:absolute;left:0;right:0;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;margin:auto;border:solid;padding:1em;background:#fff;color:#000;display:block}dialog:not([open]){display:none}dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.1)}._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}dialog.fixed{position:fixed;top:50%;transform:translateY(-50%)}.formio-loader{position:relative;min-height:60px}.loader-wrapper{z-index:1000;position:absolute;top:0;left:0;bottom:0;right:0;height:120px;background-color:#0000}.loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.formio-form{position:relative;min-height:80px}.formio-error-wrapper,.formio-warning-wrapper{padding:1em}.formio-error-wrapper{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.formio-error-wrapper .formio-errors .error{color:#c20000}.formio-error-wrapper .field-required:after{color:#c20000}.formio-warning-wrapper{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.formio-disabled-input .form-control.flatpickr-input{background-color:#eee}.builder-component.has-error .invalid-feedback,.formio-component.alert-danger .invalid-feedback,.formio-component.has-error .invalid-feedback,.formio-component.has-message .invalid-feedback{display:block;color:inherit;margin-top:4px}.formio-errors .error{color:#dc3545}.formio-errors .warning{color:#856404}.formio-errors .info{color:#004085}.formio-wysiwyg-editor{min-height:200px;background-color:#fff}.has-feedback .form-control{padding-right:10px}.has-feedback .form-control[type=hidden]{padding-right:0}.has-error.bg-danger{padding:4px}.ql-source:after{content:\"[source]\";white-space:nowrap}.quill-source-code{width:100%;margin:0;background:#1d1d1d;box-sizing:border-box;color:#ccc;font-size:15px;outline:0;padding:20px;line-height:24px;font-family:Consolas,Menlo,Monaco,Courier New,monospace;position:absolute;top:0;bottom:0;border:none;display:none}.formio-component-tags tags{background-color:#fff}.field-required:after,.tab-error:after{content:\" *\";color:#eb0000}.field-required:after{position:relative;z-index:10}.glyphicon-spin{animation:formio-spin 1s infinite linear}@keyframes formio-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.button-icon-right{margin-left:5px}.formio-component-submit .submit-success:after{content:\"\\2713\";position:relative;right:-4px;top:1px;line-height:1}.formio-component-submit .submit-fail:after{content:\"\\2717\";position:relative;right:-4px;top:1px;line-height:1}.card-vertical{display:flex;flex-direction:row;margin-top:5px}.card-vertical .card-body,.tab,.tab-content{flex-grow:2}.nav-tabs-vertical{display:flex;flex-direction:column;border-right:1px solid #ddd;padding-left:5px;margin-right:10px;border-bottom:0}.card-vertical>.card-body,.card-vertical>.tab,.card-vertical>.tab-content{flex-basis:85%}.card-vertical ul>li>.nav-link-vertical{border-right-color:transparent;border-radius:4px 0 0 4px;margin-right:0}.card-vertical ul>li>.nav-link-vertical.active{border-bottom-color:#ddd;border-right-color:transparent}.card-vertical ul>li>.nav-link-vertical.active:hover{border-right-color:transparent}.nav-tabs-vertical>li{margin:0 -1px 0 0}.formio-component-submit .submit-fail[disabled]{opacity:1}.form-control.flatpickr-input{background-color:#fff}.input-group .flatpickr-wrapper{flex-grow:1}.flatpickr-calendar .flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-calendar .flatpickr-current-month input.cur-year:focus,.flatpickr-calendar .flatpickr-days:focus{outline:auto}td>.form-group{margin-bottom:0}.signature-pad-body{overflow:hidden;position:relative}.signature-pad-canvas{border-radius:4px;box-shadow:0 0 5px #00000005 inset;border:1px solid #f4f4f4}.btn.signature-pad-refresh{position:absolute;left:0;top:0;z-index:1000;padding:3px;line-height:0}[dir=rtl] .btn.signature-pad-refresh{left:unset;right:0}.formio-component-multiple .choices__input{width:100%}.formio-component-multiple .is-invalid{border-color:#f04124}.formio-component-multiple :not(.is-invalid){border-color:#ccc}.choices__list--dropdown .choices__item--selectable{padding-right:0}.signature-pad-refresh img{height:1.2em}.signature-pad-footer{text-align:center;color:#c3c3c3}.choices__list--dropdown{z-index:100}.choices__list--multiple .choices__item{border-radius:0;padding:2px 8px;line-height:1em;margin-bottom:6px}.choices__list--single{padding:0}.choices__item.choices__item--selectable{white-space:nowrap;overflow:hidden;padding-right:25px;text-overflow:ellipsis}.choices__input{padding:2px}.choices[dir=rtl]>*{text-align:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable]{padding-left:5px;float:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable] .choices__button{float:left;margin:0 8px 0 -4px;padding-left:unset;padding-right:16px;border-left:unset;border-right:1px solid #008fa1;overflow:hidden}@-moz-document url-prefix(){.choices__button{float:right}}.formio-component-file .fileSelector{position:relative;padding:15px;border:2px dashed #ddd;text-align:center}.formio-component-file .fileSelector .loader-wrapper{display:none;width:100%;height:100%;background-color:#0000001a}.formio-component-file .fileSelector .loader-wrapper .loader{height:45px;width:45px;margin-top:-23px;margin-left:-23px}.formio-component-file .fileSelector a{text-decoration:underline}.formio-component-file .fileSelector.fileDragOver{border-color:#127abe}.formio-component-file .fileSelector .fa,.formio-component-file .fileSelector .glyphicon{font-size:20px;margin-right:5px}[dir=rtl] .formio-component-file .fileSelector .fa,[dir=rtl] .formio-component-file .fileSelector .glyphicon{margin-right:unset;margin-left:5px}.formio-component-file .fileSelector .browse{cursor:pointer}@keyframes formio-dialog-fadeout{0%{opacity:1}to{opacity:0}}@keyframes formio-dialog-fadein{0%{opacity:0}to{opacity:1}}.formio-dialog{box-sizing:border-box;font-size:.8em;color:#666}.formio-dialog.formio-modaledit-dialog{font-size:inherit}.formio-dialog *,.formio-dialog :after,.formio-dialog :before{box-sizing:inherit}.formio-dialog{position:fixed;overflow:auto;-webkit-overflow-scrolling:touch;z-index:10000;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.4);animation:formio-dialog-fadein .5s}.formio-dialog.formio-dialog-disabled-animation,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-content,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-overlay{animation:none!important}.formio-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;margin-right:15px;background:0 0}.formio-dialog-no-overlay{pointer-events:none}.formio-dialog.formio-dialog-closing .formio-dialog-overlay{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-content{background:#fff;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;pointer-events:all;overflow:auto}.formio-component-modal-wrapper-select .formio-dialog-content{overflow:initial}.formio-dialog.formio-dialog-closing .formio-dialog-content{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-close:before{font-family:Helvetica,Arial,sans-serif;content:\"\\d7\";cursor:pointer}body.formio-dialog-open,html.formio-dialog-open{overflow:hidden}.formio-dialog .tab-content{padding-top:12px}.formio-dialog-close{z-index:1000}@keyframes formio-dialog-flyin{0%{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:translateY(0)}}@keyframes formio-dialog-flyout{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-40px)}}.formio-dialog.formio-dialog-theme-default{padding-bottom:160px;padding-top:160px}.formio-dialog.formio-dialog-theme-default .component-edit-container{padding:.5em}.formio-dialog.formio-dialog-theme-default.formio-dialog-closing .formio-dialog-content{animation:formio-dialog-flyout .5s}.formio-dialog.formio-dialog-theme-default .formio-dialog-content{animation:formio-dialog-flyin .5s;background:#f0f0f0;border-radius:5px;font-family:Helvetica,sans-serif;font-size:1.1em;line-height:1.5em;margin:0 auto;max-width:100%;padding:1em;position:relative;width:80%}.formio-dialog.formio-dialog-theme-default .formio-dialog-close{border:none;background:0 0;cursor:pointer;position:absolute;right:1px;top:1px;z-index:100}.formio-clickable{cursor:pointer}.component-settings .nav>li>a{padding:8px 10px}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:before{display:block;padding:3px;background:0 0;color:#8a8a8a;content:\"\\d7\";font-size:26px;font-weight:400;line-height:26px;text-align:center}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:active:before,.formio-dialog.formio-dialog-theme-default .formio-dialog-close:hover:before{color:#777}.formio-dialog.formio-dialog-theme-default .formio-dialog-message{margin-bottom:.5em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input{margin-bottom:1em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url],.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea{background:#fff;border:0;border-radius:3px;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0 0 .25em;min-height:2.5em;padding:.25em .67em;width:100%}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea:focus{box-shadow:inset 0 0 0 2px #8dbdf1;outline:0}.formio-dialog-buttons{display:flex;justify-content:flex-end}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons{*zoom:1}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons:after{content:\"\";display:table;clear:both}.formio-dialog.formio-dialog-theme-default .formio-dialog-button{border:0;border-radius:3px;cursor:pointer;float:right;font-family:inherit;font-size:.8em;letter-spacing:.1em;line-height:1em;margin:0 0 0 .5em;padding:.75em 2em;text-transform:uppercase}.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:formio-dialog-pulse 1.1s infinite;outline:0}@media (max-width:568px){.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:none}}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-primary{background:#3288e6;color:#fff}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-secondary{background:#e0e0e0;color:#777}.formio-dialog-content .panel{margin:0}.formio-dialog-content [ref=dialogHeader]{padding-right:15px}.formio-placeholder{position:absolute;color:#999}.formio-dialog .formio-dialog-close{cursor:pointer}.formio-iframe{border:none;width:100%;height:1000px}.inline-form-button{margin-right:10px}.tooltip{opacity:1}.tooltip[x-placement=right] .tooltip-arrow{border-right:5px solid #000}.tooltip[x-placement=right] .tooltip-inner{margin-left:8px}.control-label--bottom{margin-bottom:0;margin-top:5px}.formio-component-label-hidden{position:relative}.formio-hidden{margin:0}.formio-removed{display:none}.control-label--hidden{position:absolute;top:6px;right:5px}.formio-component-datetime .control-label--hidden.field-required{right:45px;z-index:3}.formio-component-selectboxes .control-label--hidden.field-required,.formio-component-survey .control-label--hidden.field-required{top:0}.formio-component-resource .control-label--hidden.field-required,.formio-component-select .control-label--hidden.field-required{right:40px;z-index:2}.formio-component-radio .control-label--hidden.field-required:after,.formio-component-selectboxes .control-label--hidden.field-required:after{display:none}.formio-component-radio.formio-component-label-hidden.required .form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .form-check-label:before{position:relative;content:\"* \";color:#eb0000}.formio-component-radio.formio-component-label-hidden.required .label-position-right.form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .label-position-right.form-check-label:before{right:20px}.formio-component-datasource,.formio-component-hidden:not(.formio-component-checkbox){margin-bottom:0}.checkbox-inline label,.radio-inline label{font-weight:400;cursor:pointer}.editgrid-listgroup{margin-bottom:10px}.tree-listgroup{flex-direction:row}.formio-component-submit button[disabled]+.has-error{display:block}.formio-choices.form-group{margin-bottom:0}.formio-choices[data-type=select-multiple] .form-control{height:auto}.form-control.formio-multiple-mask-select{width:15%;z-index:4}.form-control.formio-multiple-mask-input{width:85%}.input-group.formio-multiple-mask-container{width:100%}.formio-component .table{margin-bottom:0}.editgrid-table-container{margin-bottom:10px;max-width:calc(100vw - 140px)}.editgrid-table-container .table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.editgrid-table-column{border:none}.editgrid-table-head{border:1px solid #ddd}.editgrid-table-body{border:1px solid #ddd;border-top:0}.formio-hide-label-panel-tooltip{margin-top:-10px;margin-left:-10px}.is-disabled .choices__list--multiple .choices__item{padding:5px 10px}.is-disabled .choices__list--multiple .choices__item .choices__button{display:none}.formio-collapse-icon{cursor:pointer;margin-right:4px}[dir=rtl] .formio-collapse-icon{margin-right:unset;margin-left:4px}.formio-component-dateTime .form-control[type=datetime-local]~.input-group-addon,.formio-component-datetime .form-control[type=datetime-local]~.input-group-addon{width:auto}.formio-component-datagrid .formio-datagrid-remove{position:absolute;top:0;right:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-datagrid .datagrid-table>tbody>tr>td:last-child{position:relative}.formio-component-datagrid .datagrid-table>tbody>tr:hover>td:last-child .formio-datagrid-remove{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-component-modaledit .formio-modaledit-view-container{position:relative;border:1px solid #ddd;min-height:34px;padding:6px 12px;cursor:text}td .formio-component-modaledit .formio-modaledit-view-container{padding:0;border-style:none}.formio-component-modaledit .formio-modaledit-edit{position:absolute;top:0;left:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-modaledit .formio-modaledit-view-container:hover .formio-modaledit-edit{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-modaledit-dialog .formio-modaledit-close{position:absolute;top:100%;right:0;border-radius:0}.reset-margins a,.reset-margins abbr,.reset-margins acronym,.reset-margins address,.reset-margins applet,.reset-margins article,.reset-margins aside,.reset-margins audio,.reset-margins b,.reset-margins big,.reset-margins blockquote,.reset-margins body,.reset-margins canvas,.reset-margins caption,.reset-margins center,.reset-margins cite,.reset-margins code,.reset-margins dd,.reset-margins del,.reset-margins details,.reset-margins dfn,.reset-margins div,.reset-margins dl,.reset-margins dt,.reset-margins em,.reset-margins embed,.reset-margins fieldset,.reset-margins figcaption,.reset-margins figure,.reset-margins footer,.reset-margins form,.reset-margins h1,.reset-margins h2,.reset-margins h3,.reset-margins h4,.reset-margins h5,.reset-margins h6,.reset-margins header,.reset-margins hgroup,.reset-margins html,.reset-margins i,.reset-margins iframe,.reset-margins img,.reset-margins ins,.reset-margins kbd,.reset-margins label,.reset-margins legend,.reset-margins li,.reset-margins mark,.reset-margins menu,.reset-margins nav,.reset-margins object,.reset-margins ol,.reset-margins output,.reset-margins p,.reset-margins pre,.reset-margins q,.reset-margins ruby,.reset-margins s,.reset-margins samp,.reset-margins section,.reset-margins small,.reset-margins span,.reset-margins strike,.reset-margins strong,.reset-margins sub,.reset-margins summary,.reset-margins sup,.reset-margins table,.reset-margins tbody,.reset-margins td,.reset-margins tfoot,.reset-margins th,.reset-margins thead,.reset-margins time,.reset-margins tr,.reset-margins tt,.reset-margins u,.reset-margins ul,.reset-margins var,.reset-margins video{margin:0}.ck-body .ck.ck-balloon-panel{z-index:101000}.formio-component-select select[disabled=disabled]{-webkit-appearance:none;-moz-appearance:none;text-indent:1px;text-overflow:\"\"}.formio-component-select .choices.is-disabled[data-type*=select-one]:after,.formio-component-select div[disabled=disabled] button{display:none}.datagrid-group-label.collapsed>td{display:none}.datagrid-group-header.clickable{cursor:pointer}.datagrid-group-header.clickable .datagrid-group-label:before{display:inline-block;vertical-align:middle;content:\"\\25be\";margin:0 5px}.datagrid-group-header.clickable.collapsed .datagrid-group-label:before{content:\"\\25b8\"}.formio-component.alert-danger .help-block,.formio-component.alert-warning .help-block{color:inherit}.tree__level_even{background-color:#f6f6f6}.tree__node-content{margin-bottom:10px}.tree__node-children{margin:0}.formio-select-autocomplete-input{opacity:0;position:relative;z-index:-1;display:block;height:0;border:none}.has-error>.help-block{margin-top:5px;margin-bottom:10px}.no-top-border-table>.table>tbody>tr:first-child>td{border-top:none}.table>tbody>tr>td.cell-align-left{text-align:left}.table>tbody>tr>td.cell-align-center{text-align:center}.table>tbody>tr>td.cell-align-center>div{margin-left:auto;margin-right:auto}.table>tbody>tr>td.cell-align-right{text-align:right}.table>tbody>tr>td.cell-align-right>div{margin-left:auto}.table-responsive[ref=component]{overflow-x:visible}.formio-component-textarea .alert .ck-editor__editable{color:inherit}.formio-component-textarea .ck.ck-editor__editable .image .ck-progress-bar{height:4px}div[data-oembed-url]{width:100%}.checkbox label.label-position-bottom,.checkbox label.label-position-left,.checkbox label.label-position-top,.radio label.label-position-bottom,.radio label.label-position-left,.radio label.label-position-top{padding-left:0}.checkbox label.label-position-bottom span,.checkbox label.label-position-top span,.radio label.label-position-bottom span,.radio label.label-position-top span{display:block}.checkbox label.label-position-bottom input[type=checkbox],.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-bottom input[type=radio],.radio label.label-position-top input[type=radio]{position:relative;margin-left:0}.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-top input[type=radio]{margin-top:4px}.checkbox label.label-position-bottom input[type=checkbox],.radio label.label-position-bottom input[type=radio]{margin-bottom:8px}.radio label.label-position-left input[type=radio]{margin-left:10px}.checkbox label.label-position-left input[type=checkbox]{margin-left:4px;position:relative}.open-modal-button{width:100%;text-align:left;white-space:normal;height:auto}.formio-component-modal-wrapper-signature .open-modal-button{text-align:center;height:100%;font-size:1.4em;padding:0;margin:0}.formio-component-content .image{display:table;clear:both;text-align:center;margin:1em auto}.formio-component-content .image>img{display:block;margin:0 auto;max-width:100%;min-width:50px}.formio-component-content .image>figcaption{display:table-caption;caption-side:bottom;word-break:break-word;color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}.formio-component-content .image.image_resized{max-width:100%;display:block;box-sizing:border-box}.formio-component-content .image.image_resized img{width:100%}.formio-component-content .image.image_resized>figcaption{display:block}.formio-component-content .media{clear:both;margin:1em 0;display:block;min-width:15em}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-side{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-center{margin-left:auto;margin-right:auto}.formio-component-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content blockquote{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;margin-right:0;font-style:italic;border-left:solid 5px hsl(0deg,0%,80%)}.formio-component-content[dir=rtl] blockquote{border-left:0;border-right:solid 5px hsl(0deg,0%,80%)}.formio-component-content .text-tiny{font-size:.7em}.formio-component-content .text-small{font-size:.85em}.formio-component-content .text-big{font-size:1.4em}.formio-component-content .text-huge{font-size:1.8em}.formio-component-address.formio-component-label-hidden>label.field-required{z-index:1}.formio-component-address.formio-component-label-hidden>label.field-required~.address-autocomplete-container .address-autocomplete-remove-value-icon{right:20px}.address-autocomplete-container{position:relative}.address-autocomplete-container .address-autocomplete-remove-value-icon{cursor:pointer;position:absolute;margin-top:-9px;right:10px;top:50%}.address-autocomplete-container .address-autocomplete-remove-value-icon--hidden{display:none}.autocomplete{background:#fff;font:14px/22px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;overflow:auto;box-sizing:border-box;border:1px solid rgba(50,50,50,.6);z-index:11000}.autocomplete>div{cursor:pointer;padding:6px 10px}.autocomplete>div.selected,.autocomplete>div:hover:not(.group){background:#1e90ff;color:#fff}.field-wrapper{display:flex}.field-wrapper--reverse{flex-direction:row-reverse}.field-wrapper .field-label--right{text-align:right}.formio-component-modal-wrapper{margin-bottom:10px}.formio-component-modal-wrapper .open-modal-button{height:auto}.formio-component-modal-wrapper .component-rendering-hidden{visibility:hidden}.formio-component-textarea div.formio-editor-read-only-content[ref=input]{white-space:pre-wrap}.formio-editor-read-only-content img{max-width:100%}.formio-editor-read-only-content li[data-list=bullet]{list-style-type:none}.formio-editor-read-only-content li[data-list=bullet] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=bullet] .ql-ui:before{content:\"\\2022\"}.formio-editor-read-only-content li[data-list=ordered]{list-style-type:none;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-0}.formio-editor-read-only-content li[data-list=ordered] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=ordered] .ql-ui:before{content:counter(list-0,decimal) \". \"}.formio-editor-read-only-content figure.table table{border-collapse:collapse;border-spacing:0;width:100%;height:100%;border:1px double #b3b3b3;table-layout:fixed}.formio-editor-read-only-content figure.table table td,.formio-editor-read-only-content figure.table table th{min-width:2em;padding:.4em;border:1px solid #bfbfbf}.formio-component-password .pull-right:not(:last-child),.formio-component-textarea .pull-right:not(:last-child),.formio-component-textfield .pull-right:not(:last-child){padding-left:12px}.formio-form>div>nav>ul.pagination{flex-flow:wrap row}.formio-form>div>nav>ul.pagination .page-link{cursor:pointer;color:#1c74d9}.formio-form>div>nav>ul.pagination .page-item.active .page-link{color:#fff;background-color:#1c74d9;border-color:#1c74d9}.classic-pagination{border-bottom:solid 1px #e0e0e0;padding:0 15px 10px;line-height:1em}.classic-pagination-page{padding:0;position:relative}.classic-pagination-title{color:#595959;font-size:16px;margin-bottom:5px}.classic-pagination-dot{position:absolute;width:30px;height:30px;display:block;background:#fbe8aa;top:40px;left:50%;margin-top:-15px;margin-left:-15px;border-radius:50%}.classic-pagination-dot:after{content:\" \";width:14px;height:14px;background:#fbbd19;border-radius:50px;position:absolute;top:8px;left:8px}.classic-pagination .progress,.classic-pagination-progress{position:relative;border-radius:0;height:8px;box-shadow:none;margin:20px 0;border:none;padding:0;background-color:#f6f6f6}.classic-pagination .progress-bar,.classic-pagination-progress-bar{width:0;height:10px;box-shadow:none;background:#fbe8aa}.classic-pagination-page.complete .classic-pagination-progress-bar,.classic-pagination-page.complete .progress-bar{width:100%}.classic-pagination-page.active .classic-pagination-progress-bar,.classic-pagination-page.active .progress-bar{width:50%}.classic-pagination-page.disabled .classic-pagination-dot{background-color:#f5f5f5}.classic-pagination-page.disabled .classic-pagination-dot:after{opacity:0}.classic-pagination-page:first-child .classic-pagination-progress,.classic-pagination-page:first-child .progress{left:50%;width:50%}.classic-pagination-page:first-child.active .classic-pagination-progress-bar,.classic-pagination-page:first-child.active .progress-bar{width:0%}.classic-pagination-page:last-child .classic-pagination-progress,.classic-pagination-page:last-child .progress{width:50%}.classic-pagination-page:last-child.active .classic-pagination-progress-bar,.classic-pagination-page:last-child.active .progress-bar{width:100%}.pac-container{z-index:11000}[ref=buttonMessageContainer].has-error{cursor:pointer}[ref=passwordStrengthIndicator]{display:inline}.formio-security-indicator{display:flex;height:5px}.formio-security-indicator [class^=security-]{width:100%;height:100%}.formio-security-indicator .security-low{background-color:#c51e00}.formio-security-indicator .security-medium{background-color:#ebb400}.formio-security-indicator .security-high{background-color:#bddf00}.formio-security-indicator .security-very-high{background-color:#009118}.formio-component-textarea .formio-editor-read-only-content .text-big{font-size:1.4em}.formio-component-textarea .formio-editor-read-only-content .text-huge{font-size:1.8em}.formio-component-textarea .formio-editor-read-only-content .text-small{font-size:.85em}.formio-component-textarea .formio-editor-read-only-content .text-tiny{font-size:.7em}.formio-component [ref=valueMaskInput]{display:none}.formio-wizard-nav-container{display:flex}.formio-wizard-nav-container li{margin-right:.5rem}@media not all and (min-width:30em){.formio-wizard-nav-container{flex-direction:column}.formio-wizard-nav-container li{margin-right:0}.formio-wizard-nav-container li .btn{width:100%;margin-bottom:.25rem}}.formio-tooltip__trigger{cursor:pointer}.formio-tooltip__body{background-color:#1b1b1b;border-radius:.25rem;bottom:0;color:#f0f0f0;display:none;font-size:1rem;padding:.5rem;position:absolute;left:0;transform:translate(-50%);width:auto;white-space:pre;z-index:1000}.formio-tooltip__body.formio-tooltip--is-set{display:block}.formio-tooltip__body--whitespace{white-space:normal;width:250px}.formio-tooltip__body--right{top:auto;transform:translate(0)}.formio-tooltip__body--left{top:auto;left:0;right:auto;transform:translate(0)}.formio-tooltip__body--bottom{bottom:auto;top:0}.formio-tooltip__wrapper{position:relative}.formio-tooltip__wrapper>span{font-weight:400}span[role=link]{text-decoration:underline;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: FormioAppConfig, decorators: [{
                    type: Optional
                }] }, { type: CustomTagsService, decorators: [{
                    type: Optional
                }] }]; } });

/* tslint:disable */
/* tslint:enable */
class FormBuilderComponent {
    constructor(ngZone, config, customTags) {
        this.ngZone = ngZone;
        this.config = config;
        this.customTags = customTags;
        this.componentAdding = false;
        this.noeval = false;
        if (this.config) {
            Formio.setBaseUrl(this.config.apiUrl);
            Formio.setProjectUrl(this.config.appUrl);
        }
        else {
            console.warn('You must provide an AppConfig within your application!');
        }
        this.change = new EventEmitter();
        this.ready = new Promise((resolve) => {
            this.readyResolve = resolve;
        });
    }
    ngOnInit() {
        Utils.Evaluator.noeval = this.noeval;
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.ngZone.runOutsideAngular(() => {
                    this.buildForm(this.form);
                });
            });
        }
        if (this.rebuild) {
            this.rebuild.subscribe((options) => {
                this.ngZone.runOutsideAngular(() => {
                    this.rebuildForm(this.form, options);
                });
            });
        }
    }
    setInstance(instance) {
        this.formio = instance;
        instance.off('addComponent');
        instance.off('saveComponent');
        instance.off('updateComponent');
        instance.off('removeComponent');
        instance.on('addComponent', (component, parent, path, index, isNew) => {
            this.ngZone.run(() => {
                if (isNew) {
                    this.componentAdding = true;
                }
                else {
                    this.change.emit({
                        type: 'addComponent',
                        builder: instance,
                        form: instance.schema,
                        component: component,
                        parent: parent,
                        path: path,
                        index: index
                    });
                    this.componentAdding = false;
                }
            });
        });
        instance.on('saveComponent', (component, original, parent, path, index, isNew) => {
            this.ngZone.run(() => {
                this.change.emit({
                    type: this.componentAdding ? 'addComponent' : 'saveComponent',
                    builder: instance,
                    form: instance.schema,
                    component: component,
                    originalComponent: original,
                    parent: parent,
                    path: path,
                    index: index,
                    isNew: isNew || false
                });
                this.componentAdding = false;
            });
        });
        instance.on('updateComponent', (component) => {
            this.ngZone.run(() => {
                this.change.emit({
                    type: 'updateComponent',
                    builder: instance,
                    form: instance.schema,
                    component: component
                });
            });
        });
        instance.on('removeComponent', (component, parent, path, index) => {
            this.ngZone.run(() => {
                this.change.emit({
                    type: 'deleteComponent',
                    builder: instance,
                    form: instance.schema,
                    component: component,
                    parent: parent,
                    path: path,
                    index: index
                });
            });
        });
        this.ngZone.run(() => {
            this.readyResolve(instance);
        });
        return instance;
    }
    setDisplay(display, prevDisplay) {
        if (display && display !== prevDisplay) {
            this.builder.setDisplay(display);
        }
    }
    buildForm(form, prevForm) {
        if (!form || !this.builderElement || !this.builderElement.nativeElement) {
            return;
        }
        if (this.builder) {
            this.setDisplay(form.display, prevForm?.display);
            this.setInstance(this.builder.instance);
            this.builder.form = form;
            this.builder.instance.form = form;
            return this.builder.instance;
        }
        return this.rebuildForm(form);
    }
    rebuildForm(form, options) {
        const Builder = this.formbuilder || FormBuilder;
        const extraTags = this.customTags ? this.customTags.tags : [];
        this.builder = new Builder(this.builderElement.nativeElement, form, assign({
            icons: 'fontawesome',
            sanitizeConfig: {
                addTags: extraTags
            }
        }, options || this.options || {}));
        return this.builder.ready.then(instance => this.setInstance(instance));
    }
    ngOnChanges(changes) {
        Utils.Evaluator.noeval = this.noeval;
        if (changes.form && changes.form.currentValue) {
            this.ngZone.runOutsideAngular(() => {
                this.buildForm(changes.form.currentValue || { components: [] }, changes.form.previousValue);
            });
        }
    }
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
        if (this.formio) {
            this.formio.destroy();
        }
    }
}
FormBuilderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormBuilderComponent, deps: [{ token: i0.NgZone }, { token: FormioAppConfig, optional: true }, { token: CustomTagsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
FormBuilderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormBuilderComponent, selector: "form-builder", inputs: { form: "form", options: "options", formbuilder: "formbuilder", noeval: "noeval", refresh: "refresh", rebuild: "rebuild" }, outputs: { change: "change" }, viewQueries: [{ propertyName: "builderElement", first: true, predicate: ["builder"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div #builder></div>\r\n", styles: ["@charset \"UTF-8\";.choices{position:relative;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.5}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=\"\"] .choices__button{display:none}.choices[data-type*=select-one]:after{content:\"\";height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}dialog{position:absolute;left:0;right:0;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;margin:auto;border:solid;padding:1em;background:#fff;color:#000;display:block}dialog:not([open]){display:none}dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.1)}._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}dialog.fixed{position:fixed;top:50%;transform:translateY(-50%)}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";filter:alpha(opacity=80)}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";filter:alpha(opacity=20)}.formio-loader{position:relative;min-height:60px}.loader-wrapper{z-index:1000;position:absolute;top:0;left:0;bottom:0;right:0;height:120px;background-color:#0000}.loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.formio-form{position:relative;min-height:80px}.formio-error-wrapper,.formio-warning-wrapper{padding:1em}.formio-error-wrapper{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.formio-error-wrapper .formio-errors .error{color:#c20000}.formio-error-wrapper .field-required:after{color:#c20000}.formio-warning-wrapper{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.formio-disabled-input .form-control.flatpickr-input{background-color:#eee}.builder-component.has-error .invalid-feedback,.formio-component.alert-danger .invalid-feedback,.formio-component.has-error .invalid-feedback,.formio-component.has-message .invalid-feedback{display:block;color:inherit;margin-top:4px}.formio-errors .error{color:#dc3545}.formio-errors .warning{color:#856404}.formio-errors .info{color:#004085}.formio-wysiwyg-editor{min-height:200px;background-color:#fff}.has-feedback .form-control{padding-right:10px}.has-feedback .form-control[type=hidden]{padding-right:0}.has-error.bg-danger{padding:4px}.ql-source:after{content:\"[source]\";white-space:nowrap}.quill-source-code{width:100%;margin:0;background:#1d1d1d;box-sizing:border-box;color:#ccc;font-size:15px;outline:0;padding:20px;line-height:24px;font-family:Consolas,Menlo,Monaco,Courier New,monospace;position:absolute;top:0;bottom:0;border:none;display:none}.formio-component-tags tags{background-color:#fff}.field-required:after,.tab-error:after{content:\" *\";color:#eb0000}.field-required:after{position:relative;z-index:10}.glyphicon-spin{animation:formio-spin 1s infinite linear}@keyframes formio-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.button-icon-right{margin-left:5px}.formio-component-submit .submit-success:after{content:\"\\2713\";position:relative;right:-4px;top:1px;line-height:1}.formio-component-submit .submit-fail:after{content:\"\\2717\";position:relative;right:-4px;top:1px;line-height:1}.card-vertical{display:flex;flex-direction:row;margin-top:5px}.card-vertical .card-body,.tab,.tab-content{flex-grow:2}.nav-tabs-vertical{display:flex;flex-direction:column;border-right:1px solid #ddd;padding-left:5px;margin-right:10px;border-bottom:0}.card-vertical>.card-body,.card-vertical>.tab,.card-vertical>.tab-content{flex-basis:85%}.card-vertical ul>li>.nav-link-vertical{border-right-color:transparent;border-radius:4px 0 0 4px;margin-right:0}.card-vertical ul>li>.nav-link-vertical.active{border-bottom-color:#ddd;border-right-color:transparent}.card-vertical ul>li>.nav-link-vertical.active:hover{border-right-color:transparent}.nav-tabs-vertical>li{margin:0 -1px 0 0}.formio-component-submit .submit-fail[disabled]{opacity:1}.form-control.flatpickr-input{background-color:#fff}.input-group .flatpickr-wrapper{flex-grow:1}.flatpickr-calendar .flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-calendar .flatpickr-current-month input.cur-year:focus,.flatpickr-calendar .flatpickr-days:focus{outline:auto}td>.form-group{margin-bottom:0}.signature-pad-body{overflow:hidden;position:relative}.signature-pad-canvas{border-radius:4px;box-shadow:0 0 5px #00000005 inset;border:1px solid #f4f4f4}.btn.signature-pad-refresh{position:absolute;left:0;top:0;z-index:1000;padding:3px;line-height:0}[dir=rtl] .btn.signature-pad-refresh{left:unset;right:0}.formio-component-multiple .choices__input{width:100%}.formio-component-multiple .is-invalid{border-color:#f04124}.formio-component-multiple :not(.is-invalid){border-color:#ccc}.choices__list--dropdown .choices__item--selectable{padding-right:0}.signature-pad-refresh img{height:1.2em}.signature-pad-footer{text-align:center;color:#c3c3c3}.choices__list--dropdown{z-index:100}.choices__list--multiple .choices__item{border-radius:0;padding:2px 8px;line-height:1em;margin-bottom:6px}.choices__list--single{padding:0}.choices__item.choices__item--selectable{white-space:nowrap;overflow:hidden;padding-right:25px;text-overflow:ellipsis}.choices__input{padding:2px}.choices[dir=rtl]>*{text-align:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable]{padding-left:5px;float:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable] .choices__button{float:left;margin:0 8px 0 -4px;padding-left:unset;padding-right:16px;border-left:unset;border-right:1px solid #008fa1;overflow:hidden}@-moz-document url-prefix(){.choices__button{float:right}}.formio-component-file .fileSelector{position:relative;padding:15px;border:2px dashed #ddd;text-align:center}.formio-component-file .fileSelector .loader-wrapper{display:none;width:100%;height:100%;background-color:#0000001a}.formio-component-file .fileSelector .loader-wrapper .loader{height:45px;width:45px;margin-top:-23px;margin-left:-23px}.formio-component-file .fileSelector a{text-decoration:underline}.formio-component-file .fileSelector.fileDragOver{border-color:#127abe}.formio-component-file .fileSelector .fa,.formio-component-file .fileSelector .glyphicon{font-size:20px;margin-right:5px}[dir=rtl] .formio-component-file .fileSelector .fa,[dir=rtl] .formio-component-file .fileSelector .glyphicon{margin-right:unset;margin-left:5px}.formio-component-file .fileSelector .browse{cursor:pointer}@keyframes formio-dialog-fadeout{0%{opacity:1}to{opacity:0}}@keyframes formio-dialog-fadein{0%{opacity:0}to{opacity:1}}.formio-dialog{box-sizing:border-box;font-size:.8em;color:#666}.formio-dialog.formio-modaledit-dialog{font-size:inherit}.formio-dialog *,.formio-dialog :after,.formio-dialog :before{box-sizing:inherit}.formio-dialog{position:fixed;overflow:auto;-webkit-overflow-scrolling:touch;z-index:10000;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.4);animation:formio-dialog-fadein .5s}.formio-dialog.formio-dialog-disabled-animation,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-content,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-overlay{animation:none!important}.formio-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;margin-right:15px;background:0 0}.formio-dialog-no-overlay{pointer-events:none}.formio-dialog.formio-dialog-closing .formio-dialog-overlay{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-content{background:#fff;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;pointer-events:all;overflow:auto}.formio-component-modal-wrapper-select .formio-dialog-content{overflow:initial}.formio-dialog.formio-dialog-closing .formio-dialog-content{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-close:before{font-family:Helvetica,Arial,sans-serif;content:\"\\d7\";cursor:pointer}body.formio-dialog-open,html.formio-dialog-open{overflow:hidden}.formio-dialog .tab-content{padding-top:12px}.formio-dialog-close{z-index:1000}@keyframes formio-dialog-flyin{0%{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:translateY(0)}}@keyframes formio-dialog-flyout{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-40px)}}.formio-dialog.formio-dialog-theme-default{padding-bottom:160px;padding-top:160px}.formio-dialog.formio-dialog-theme-default .component-edit-container{padding:.5em}.formio-dialog.formio-dialog-theme-default.formio-dialog-closing .formio-dialog-content{animation:formio-dialog-flyout .5s}.formio-dialog.formio-dialog-theme-default .formio-dialog-content{animation:formio-dialog-flyin .5s;background:#f0f0f0;border-radius:5px;font-family:Helvetica,sans-serif;font-size:1.1em;line-height:1.5em;margin:0 auto;max-width:100%;padding:1em;position:relative;width:80%}.formio-dialog.formio-dialog-theme-default .formio-dialog-close{border:none;background:0 0;cursor:pointer;position:absolute;right:1px;top:1px;z-index:100}.formio-clickable{cursor:pointer}.component-settings .nav>li>a{padding:8px 10px}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:before{display:block;padding:3px;background:0 0;color:#8a8a8a;content:\"\\d7\";font-size:26px;font-weight:400;line-height:26px;text-align:center}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:active:before,.formio-dialog.formio-dialog-theme-default .formio-dialog-close:hover:before{color:#777}.formio-dialog.formio-dialog-theme-default .formio-dialog-message{margin-bottom:.5em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input{margin-bottom:1em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url],.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea{background:#fff;border:0;border-radius:3px;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0 0 .25em;min-height:2.5em;padding:.25em .67em;width:100%}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea:focus{box-shadow:inset 0 0 0 2px #8dbdf1;outline:0}.formio-dialog-buttons{display:flex;justify-content:flex-end}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons{*zoom:1}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons:after{content:\"\";display:table;clear:both}.formio-dialog.formio-dialog-theme-default .formio-dialog-button{border:0;border-radius:3px;cursor:pointer;float:right;font-family:inherit;font-size:.8em;letter-spacing:.1em;line-height:1em;margin:0 0 0 .5em;padding:.75em 2em;text-transform:uppercase}.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:formio-dialog-pulse 1.1s infinite;outline:0}@media (max-width:568px){.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:none}}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-primary{background:#3288e6;color:#fff}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-secondary{background:#e0e0e0;color:#777}.formio-dialog-content .panel{margin:0}.formio-dialog-content [ref=dialogHeader]{padding-right:15px}.formio-placeholder{position:absolute;color:#999}.formio-dialog .formio-dialog-close{cursor:pointer}.formio-iframe{border:none;width:100%;height:1000px}.inline-form-button{margin-right:10px}.tooltip{opacity:1}.tooltip[x-placement=right] .tooltip-arrow{border-right:5px solid #000}.tooltip[x-placement=right] .tooltip-inner{margin-left:8px}.control-label--bottom{margin-bottom:0;margin-top:5px}.formio-component-label-hidden{position:relative}.formio-hidden{margin:0}.formio-removed{display:none}.control-label--hidden{position:absolute;top:6px;right:5px}.formio-component-datetime .control-label--hidden.field-required{right:45px;z-index:3}.formio-component-selectboxes .control-label--hidden.field-required,.formio-component-survey .control-label--hidden.field-required{top:0}.formio-component-resource .control-label--hidden.field-required,.formio-component-select .control-label--hidden.field-required{right:40px;z-index:2}.formio-component-radio .control-label--hidden.field-required:after,.formio-component-selectboxes .control-label--hidden.field-required:after{display:none}.formio-component-radio.formio-component-label-hidden.required .form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .form-check-label:before{position:relative;content:\"* \";color:#eb0000}.formio-component-radio.formio-component-label-hidden.required .label-position-right.form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .label-position-right.form-check-label:before{right:20px}.formio-component-datasource,.formio-component-hidden:not(.formio-component-checkbox){margin-bottom:0}.checkbox-inline label,.radio-inline label{font-weight:400;cursor:pointer}.editgrid-listgroup{margin-bottom:10px}.tree-listgroup{flex-direction:row}.formio-component-submit button[disabled]+.has-error{display:block}.formio-choices.form-group{margin-bottom:0}.formio-choices[data-type=select-multiple] .form-control{height:auto}.form-control.formio-multiple-mask-select{width:15%;z-index:4}.form-control.formio-multiple-mask-input{width:85%}.input-group.formio-multiple-mask-container{width:100%}.formio-component .table{margin-bottom:0}.editgrid-table-container{margin-bottom:10px;max-width:calc(100vw - 140px)}.editgrid-table-container .table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.editgrid-table-column{border:none}.editgrid-table-head{border:1px solid #ddd}.editgrid-table-body{border:1px solid #ddd;border-top:0}.formio-hide-label-panel-tooltip{margin-top:-10px;margin-left:-10px}.is-disabled .choices__list--multiple .choices__item{padding:5px 10px}.is-disabled .choices__list--multiple .choices__item .choices__button{display:none}.formio-collapse-icon{cursor:pointer;margin-right:4px}[dir=rtl] .formio-collapse-icon{margin-right:unset;margin-left:4px}.formio-component-dateTime .form-control[type=datetime-local]~.input-group-addon,.formio-component-datetime .form-control[type=datetime-local]~.input-group-addon{width:auto}.formio-component-datagrid .formio-datagrid-remove{position:absolute;top:0;right:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-datagrid .datagrid-table>tbody>tr>td:last-child{position:relative}.formio-component-datagrid .datagrid-table>tbody>tr:hover>td:last-child .formio-datagrid-remove{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-component-modaledit .formio-modaledit-view-container{position:relative;border:1px solid #ddd;min-height:34px;padding:6px 12px;cursor:text}td .formio-component-modaledit .formio-modaledit-view-container{padding:0;border-style:none}.formio-component-modaledit .formio-modaledit-edit{position:absolute;top:0;left:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-modaledit .formio-modaledit-view-container:hover .formio-modaledit-edit{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-modaledit-dialog .formio-modaledit-close{position:absolute;top:100%;right:0;border-radius:0}.reset-margins a,.reset-margins abbr,.reset-margins acronym,.reset-margins address,.reset-margins applet,.reset-margins article,.reset-margins aside,.reset-margins audio,.reset-margins b,.reset-margins big,.reset-margins blockquote,.reset-margins body,.reset-margins canvas,.reset-margins caption,.reset-margins center,.reset-margins cite,.reset-margins code,.reset-margins dd,.reset-margins del,.reset-margins details,.reset-margins dfn,.reset-margins div,.reset-margins dl,.reset-margins dt,.reset-margins em,.reset-margins embed,.reset-margins fieldset,.reset-margins figcaption,.reset-margins figure,.reset-margins footer,.reset-margins form,.reset-margins h1,.reset-margins h2,.reset-margins h3,.reset-margins h4,.reset-margins h5,.reset-margins h6,.reset-margins header,.reset-margins hgroup,.reset-margins html,.reset-margins i,.reset-margins iframe,.reset-margins img,.reset-margins ins,.reset-margins kbd,.reset-margins label,.reset-margins legend,.reset-margins li,.reset-margins mark,.reset-margins menu,.reset-margins nav,.reset-margins object,.reset-margins ol,.reset-margins output,.reset-margins p,.reset-margins pre,.reset-margins q,.reset-margins ruby,.reset-margins s,.reset-margins samp,.reset-margins section,.reset-margins small,.reset-margins span,.reset-margins strike,.reset-margins strong,.reset-margins sub,.reset-margins summary,.reset-margins sup,.reset-margins table,.reset-margins tbody,.reset-margins td,.reset-margins tfoot,.reset-margins th,.reset-margins thead,.reset-margins time,.reset-margins tr,.reset-margins tt,.reset-margins u,.reset-margins ul,.reset-margins var,.reset-margins video{margin:0}.ck-body .ck.ck-balloon-panel{z-index:101000}.formio-component-select select[disabled=disabled]{-webkit-appearance:none;-moz-appearance:none;text-indent:1px;text-overflow:\"\"}.formio-component-select .choices.is-disabled[data-type*=select-one]:after,.formio-component-select div[disabled=disabled] button{display:none}.datagrid-group-label.collapsed>td{display:none}.datagrid-group-header.clickable{cursor:pointer}.datagrid-group-header.clickable .datagrid-group-label:before{display:inline-block;vertical-align:middle;content:\"\\25be\";margin:0 5px}.datagrid-group-header.clickable.collapsed .datagrid-group-label:before{content:\"\\25b8\"}.formio-component.alert-danger .help-block,.formio-component.alert-warning .help-block{color:inherit}.tree__level_even{background-color:#f6f6f6}.tree__node-content{margin-bottom:10px}.tree__node-children{margin:0}.formio-select-autocomplete-input{opacity:0;position:relative;z-index:-1;display:block;height:0;border:none}.has-error>.help-block{margin-top:5px;margin-bottom:10px}.no-top-border-table>.table>tbody>tr:first-child>td{border-top:none}.table>tbody>tr>td.cell-align-left{text-align:left}.table>tbody>tr>td.cell-align-center{text-align:center}.table>tbody>tr>td.cell-align-center>div{margin-left:auto;margin-right:auto}.table>tbody>tr>td.cell-align-right{text-align:right}.table>tbody>tr>td.cell-align-right>div{margin-left:auto}.table-responsive[ref=component]{overflow-x:visible}.formio-component-textarea .alert .ck-editor__editable{color:inherit}.formio-component-textarea .ck.ck-editor__editable .image .ck-progress-bar{height:4px}div[data-oembed-url]{width:100%}.checkbox label.label-position-bottom,.checkbox label.label-position-left,.checkbox label.label-position-top,.radio label.label-position-bottom,.radio label.label-position-left,.radio label.label-position-top{padding-left:0}.checkbox label.label-position-bottom span,.checkbox label.label-position-top span,.radio label.label-position-bottom span,.radio label.label-position-top span{display:block}.checkbox label.label-position-bottom input[type=checkbox],.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-bottom input[type=radio],.radio label.label-position-top input[type=radio]{position:relative;margin-left:0}.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-top input[type=radio]{margin-top:4px}.checkbox label.label-position-bottom input[type=checkbox],.radio label.label-position-bottom input[type=radio]{margin-bottom:8px}.radio label.label-position-left input[type=radio]{margin-left:10px}.checkbox label.label-position-left input[type=checkbox]{margin-left:4px;position:relative}.open-modal-button{width:100%;text-align:left;white-space:normal;height:auto}.formio-component-modal-wrapper-signature .open-modal-button{text-align:center;height:100%;font-size:1.4em;padding:0;margin:0}.formio-component-content .image{display:table;clear:both;text-align:center;margin:1em auto}.formio-component-content .image>img{display:block;margin:0 auto;max-width:100%;min-width:50px}.formio-component-content .image>figcaption{display:table-caption;caption-side:bottom;word-break:break-word;color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}.formio-component-content .image.image_resized{max-width:100%;display:block;box-sizing:border-box}.formio-component-content .image.image_resized img{width:100%}.formio-component-content .image.image_resized>figcaption{display:block}.formio-component-content .media{clear:both;margin:1em 0;display:block;min-width:15em}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-side{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-center{margin-left:auto;margin-right:auto}.formio-component-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content blockquote{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;margin-right:0;font-style:italic;border-left:solid 5px hsl(0deg,0%,80%)}.formio-component-content[dir=rtl] blockquote{border-left:0;border-right:solid 5px hsl(0deg,0%,80%)}.formio-component-content .text-tiny{font-size:.7em}.formio-component-content .text-small{font-size:.85em}.formio-component-content .text-big{font-size:1.4em}.formio-component-content .text-huge{font-size:1.8em}.formio-component-address.formio-component-label-hidden>label.field-required{z-index:1}.formio-component-address.formio-component-label-hidden>label.field-required~.address-autocomplete-container .address-autocomplete-remove-value-icon{right:20px}.address-autocomplete-container{position:relative}.address-autocomplete-container .address-autocomplete-remove-value-icon{cursor:pointer;position:absolute;margin-top:-9px;right:10px;top:50%}.address-autocomplete-container .address-autocomplete-remove-value-icon--hidden{display:none}.autocomplete{background:#fff;font:14px/22px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;overflow:auto;box-sizing:border-box;border:1px solid rgba(50,50,50,.6);z-index:11000}.autocomplete>div{cursor:pointer;padding:6px 10px}.autocomplete>div.selected,.autocomplete>div:hover:not(.group){background:#1e90ff;color:#fff}.field-wrapper{display:flex}.field-wrapper--reverse{flex-direction:row-reverse}.field-wrapper .field-label--right{text-align:right}.formio-component-modal-wrapper{margin-bottom:10px}.formio-component-modal-wrapper .open-modal-button{height:auto}.formio-component-modal-wrapper .component-rendering-hidden{visibility:hidden}.formio-component-textarea div.formio-editor-read-only-content[ref=input]{white-space:pre-wrap}.formio-editor-read-only-content img{max-width:100%}.formio-editor-read-only-content li[data-list=bullet]{list-style-type:none}.formio-editor-read-only-content li[data-list=bullet] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=bullet] .ql-ui:before{content:\"\\2022\"}.formio-editor-read-only-content li[data-list=ordered]{list-style-type:none;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-0}.formio-editor-read-only-content li[data-list=ordered] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=ordered] .ql-ui:before{content:counter(list-0,decimal) \". \"}.formio-editor-read-only-content figure.table table{border-collapse:collapse;border-spacing:0;width:100%;height:100%;border:1px double #b3b3b3;table-layout:fixed}.formio-editor-read-only-content figure.table table td,.formio-editor-read-only-content figure.table table th{min-width:2em;padding:.4em;border:1px solid #bfbfbf}.formio-component-password .pull-right:not(:last-child),.formio-component-textarea .pull-right:not(:last-child),.formio-component-textfield .pull-right:not(:last-child){padding-left:12px}.formio-form>div>nav>ul.pagination{flex-flow:wrap row}.formio-form>div>nav>ul.pagination .page-link{cursor:pointer;color:#1c74d9}.formio-form>div>nav>ul.pagination .page-item.active .page-link{color:#fff;background-color:#1c74d9;border-color:#1c74d9}.classic-pagination{border-bottom:solid 1px #e0e0e0;padding:0 15px 10px;line-height:1em}.classic-pagination-page{padding:0;position:relative}.classic-pagination-title{color:#595959;font-size:16px;margin-bottom:5px}.classic-pagination-dot{position:absolute;width:30px;height:30px;display:block;background:#fbe8aa;top:40px;left:50%;margin-top:-15px;margin-left:-15px;border-radius:50%}.classic-pagination-dot:after{content:\" \";width:14px;height:14px;background:#fbbd19;border-radius:50px;position:absolute;top:8px;left:8px}.classic-pagination .progress,.classic-pagination-progress{position:relative;border-radius:0;height:8px;box-shadow:none;margin:20px 0;border:none;padding:0;background-color:#f6f6f6}.classic-pagination .progress-bar,.classic-pagination-progress-bar{width:0;height:10px;box-shadow:none;background:#fbe8aa}.classic-pagination-page.complete .classic-pagination-progress-bar,.classic-pagination-page.complete .progress-bar{width:100%}.classic-pagination-page.active .classic-pagination-progress-bar,.classic-pagination-page.active .progress-bar{width:50%}.classic-pagination-page.disabled .classic-pagination-dot{background-color:#f5f5f5}.classic-pagination-page.disabled .classic-pagination-dot:after{opacity:0}.classic-pagination-page:first-child .classic-pagination-progress,.classic-pagination-page:first-child .progress{left:50%;width:50%}.classic-pagination-page:first-child.active .classic-pagination-progress-bar,.classic-pagination-page:first-child.active .progress-bar{width:0%}.classic-pagination-page:last-child .classic-pagination-progress,.classic-pagination-page:last-child .progress{width:50%}.classic-pagination-page:last-child.active .classic-pagination-progress-bar,.classic-pagination-page:last-child.active .progress-bar{width:100%}.pac-container{z-index:11000}[ref=buttonMessageContainer].has-error{cursor:pointer}[ref=passwordStrengthIndicator]{display:inline}.formio-security-indicator{display:flex;height:5px}.formio-security-indicator [class^=security-]{width:100%;height:100%}.formio-security-indicator .security-low{background-color:#c51e00}.formio-security-indicator .security-medium{background-color:#ebb400}.formio-security-indicator .security-high{background-color:#bddf00}.formio-security-indicator .security-very-high{background-color:#009118}.formio-component-textarea .formio-editor-read-only-content .text-big{font-size:1.4em}.formio-component-textarea .formio-editor-read-only-content .text-huge{font-size:1.8em}.formio-component-textarea .formio-editor-read-only-content .text-small{font-size:.85em}.formio-component-textarea .formio-editor-read-only-content .text-tiny{font-size:.7em}.formio-component [ref=valueMaskInput]{display:none}.formio-wizard-nav-container{display:flex}.formio-wizard-nav-container li{margin-right:.5rem}@media not all and (min-width:30em){.formio-wizard-nav-container{flex-direction:column}.formio-wizard-nav-container li{margin-right:0}.formio-wizard-nav-container li .btn{width:100%;margin-bottom:.25rem}}.formio-tooltip__trigger{cursor:pointer}.formio-tooltip__body{background-color:#1b1b1b;border-radius:.25rem;bottom:0;color:#f0f0f0;display:none;font-size:1rem;padding:.5rem;position:absolute;left:0;transform:translate(-50%);width:auto;white-space:pre;z-index:1000}.formio-tooltip__body.formio-tooltip--is-set{display:block}.formio-tooltip__body--whitespace{white-space:normal;width:250px}.formio-tooltip__body--right{top:auto;transform:translate(0)}.formio-tooltip__body--left{top:auto;left:0;right:auto;transform:translate(0)}.formio-tooltip__body--bottom{bottom:auto;top:0}.formio-tooltip__wrapper{position:relative}.formio-tooltip__wrapper>span{font-weight:400}span[role=link]{text-decoration:underline;cursor:pointer}.formbuilder{position:relative}.drag-container{padding:10px;border:dotted 2px #e8e8e8}.drag-container:hover{cursor:move;border:dotted 2px #ccc}.drag-container.formio-builder-form,.drag-container.formio-builder-form:hover,.panel-body>.drag-container.formio-builder-components,.panel-body>.drag-container.formio-builder-components:hover,.tab-pane>.drag-container.formio-builder-components,.tab-pane>.drag-container.formio-builder-components:hover{padding:0 0 1rem;border:none}.component-btn-group{display:flex;flex-direction:row-reverse;position:absolute;right:0;z-index:1000;margin-top:-2px}.builder-component{position:relative;min-height:15px;margin-bottom:15px}.builder-component .formio-component-htmlelement{border:dotted 2px #e8e8e8}.builder-component .formio-component-htmlelement [ref=html]:empty:before{content:\"HTML Content\";color:#aaa}.builder-component:not(:hover) .component-btn-group{display:none}.builder-group-button{background-color:transparent;white-space:normal;text-align:left}.form-builder-group-header{padding:0}.component-btn-group .component-settings-button{float:right;margin:4px 4px 0 0;z-index:1001;box-shadow:0 0 10px 1px #3071a999}.formbuilder .formio-component-content,.formbuilder .formio-component-datasource,.formbuilder .formio-component-form,.formbuilder .formio-component-hidden{border:2px dashed #ddd}.formbuilder .formio-component-datasource,.formbuilder .formio-component-form,.formbuilder .formio-component-hidden{min-height:3em;text-align:center;color:#aaa;padding-top:.5em}.btn-group-xxs>.btn,.btn-xxs,.component-btn-group .component-settings-button{padding:2px;font-size:10px;line-height:1.2em;border-radius:0;width:18px;height:18px}.formcomponents .formcomponent{text-align:left;padding:5px 5px 5px 8px;margin-top:.2rem;font-size:.8em;line-height:1.2;border-radius:.3em}.form-builder-panel .panel-body{padding:5px}.formio-component-tabs .ui.tabular.menu .item{padding:.8em}.formio-pdf-builder{position:relative}.formio-drop-zone{display:none;position:absolute;z-index:10;background-color:#0d87e9;opacity:.1}.formio-drop-zone.enabled{display:inherit}.component-settings .formio-dialog-content{max-height:100%}.component-btn-group .btn.component-settings-button-paste{display:none}.builder-paste-mode .component-settings-button-paste{display:inherit!important}.wizard-page-label{cursor:pointer;border-radius:0}.panel-body .drag-and-drop-alert{margin-bottom:0}.builder-sidebar_scroll{position:sticky;top:15px}.builder-sidebar_search{margin-bottom:10px;-webkit-appearance:auto;appearance:auto}.formio-wizard-builder-component-title{color:#6c757d;text-align:center;padding:.5rem}.formio-wizard-position{position:relative}.formio-settings-help{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;margin-top:10px}.help-block{margin:0}.builder-sidebar .btn{white-space:normal}.component-settings{padding-top:20px!important;padding-bottom:20px!important}.component-edit-container{height:auto;overflow:hidden}.component-edit-content{height:calc(100% - 4em)}.component-edit-tabs.col-sm-6{height:100%;overflow-y:auto}.component-edit-tabs.col-sm-12,.component-edit-tabs.col-sm-12 .editForm{height:calc(100% - 4em);overflow-y:auto}.progress.pdf-progress{height:2rem}.progress.pdf-progress .progress-bar{font-size:1rem;line-height:2rem}.builder-sidebar.disabled .formcomponent{cursor:not-allowed;opacity:.65;box-shadow:none}\n"], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormBuilderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'form-builder', encapsulation: ViewEncapsulation.None, template: "<div #builder></div>\r\n", styles: ["@charset \"UTF-8\";.choices{position:relative;margin-bottom:24px;font-size:16px}.choices:focus{outline:0}.choices:last-child{margin-bottom:0}.choices.is-disabled .choices__inner,.choices.is-disabled .choices__input{background-color:#eaeaea;cursor:not-allowed;-webkit-user-select:none;user-select:none}.choices.is-disabled .choices__item{cursor:not-allowed}.choices [hidden]{display:none!important}.choices[data-type*=select-one]{cursor:pointer}.choices[data-type*=select-one] .choices__inner{padding-bottom:7.5px}.choices[data-type*=select-one] .choices__input{display:block;width:100%;padding:10px;border-bottom:1px solid #ddd;background-color:#fff;margin:0}.choices[data-type*=select-one] .choices__button{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);padding:0;background-size:8px;position:absolute;top:50%;right:0;margin-top:-10px;margin-right:25px;height:20px;width:20px;border-radius:10em;opacity:.5}.choices[data-type*=select-one] .choices__button:focus,.choices[data-type*=select-one] .choices__button:hover{opacity:1}.choices[data-type*=select-one] .choices__button:focus{box-shadow:0 0 0 2px #00bcd4}.choices[data-type*=select-one] .choices__item[data-value=\"\"] .choices__button{display:none}.choices[data-type*=select-one]:after{content:\"\";height:0;width:0;border-style:solid;border-color:#333 transparent transparent;border-width:5px;position:absolute;right:11.5px;top:50%;margin-top:-2.5px;pointer-events:none}.choices[data-type*=select-one].is-open:after{border-color:transparent transparent #333;margin-top:-7.5px}.choices[data-type*=select-one][dir=rtl]:after{left:11.5px;right:auto}.choices[data-type*=select-one][dir=rtl] .choices__button{right:auto;left:0;margin-left:25px;margin-right:0}.choices[data-type*=select-multiple] .choices__inner,.choices[data-type*=text] .choices__inner{cursor:text}.choices[data-type*=select-multiple] .choices__button,.choices[data-type*=text] .choices__button{position:relative;display:inline-block;margin:0 -4px 0 8px;padding-left:16px;border-left:1px solid #008fa1;background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==);background-size:8px;width:8px;line-height:1;opacity:.75;border-radius:0}.choices[data-type*=select-multiple] .choices__button:focus,.choices[data-type*=select-multiple] .choices__button:hover,.choices[data-type*=text] .choices__button:focus,.choices[data-type*=text] .choices__button:hover{opacity:1}.choices__inner{display:inline-block;vertical-align:top;width:100%;background-color:#f9f9f9;padding:7.5px 7.5px 3.75px;border:1px solid #ddd;border-radius:2.5px;font-size:14px;min-height:44px;overflow:hidden}.is-focused .choices__inner,.is-open .choices__inner{border-color:#b7b7b7}.is-open .choices__inner{border-radius:2.5px 2.5px 0 0}.is-flipped.is-open .choices__inner{border-radius:0 0 2.5px 2.5px}.choices__list{margin:0;padding-left:0;list-style:none}.choices__list--single{display:inline-block;padding:4px 16px 4px 4px;width:100%}[dir=rtl] .choices__list--single{padding-right:4px;padding-left:16px}.choices__list--single .choices__item{width:100%}.choices__list--multiple{display:inline}.choices__list--multiple .choices__item{display:inline-block;vertical-align:middle;border-radius:20px;padding:4px 10px;font-size:12px;font-weight:500;margin-right:3.75px;margin-bottom:3.75px;background-color:#00bcd4;border:1px solid #00a5bb;color:#fff;word-break:break-all;box-sizing:border-box}.choices__list--multiple .choices__item[data-deletable]{padding-right:5px}[dir=rtl] .choices__list--multiple .choices__item{margin-right:0;margin-left:3.75px}.choices__list--multiple .choices__item.is-highlighted{background-color:#00a5bb;border:1px solid #008fa1}.is-disabled .choices__list--multiple .choices__item{background-color:#aaa;border:1px solid #919191}.choices__list--dropdown{visibility:hidden;z-index:1;position:absolute;width:100%;background-color:#fff;border:1px solid #ddd;top:100%;margin-top:-1px;border-bottom-left-radius:2.5px;border-bottom-right-radius:2.5px;overflow:hidden;word-break:break-all;will-change:visibility}.choices__list--dropdown.is-active{visibility:visible}.is-open .choices__list--dropdown{border-color:#b7b7b7}.is-flipped .choices__list--dropdown{top:auto;bottom:100%;margin-top:0;margin-bottom:-1px;border-radius:.25rem .25rem 0 0}.choices__list--dropdown .choices__list{position:relative;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch;will-change:scroll-position}.choices__list--dropdown .choices__item{position:relative;padding:10px;font-size:14px}[dir=rtl] .choices__list--dropdown .choices__item{text-align:right}@media (min-width:640px){.choices__list--dropdown .choices__item--selectable{padding-right:100px}.choices__list--dropdown .choices__item--selectable:after{content:attr(data-select-text);font-size:12px;opacity:0;position:absolute;right:10px;top:50%;transform:translateY(-50%)}[dir=rtl] .choices__list--dropdown .choices__item--selectable{text-align:right;padding-left:100px;padding-right:10px}[dir=rtl] .choices__list--dropdown .choices__item--selectable:after{right:auto;left:10px}}.choices__list--dropdown .choices__item--selectable.is-highlighted{background-color:#f2f2f2}.choices__list--dropdown .choices__item--selectable.is-highlighted:after{opacity:.5}.choices__item{cursor:default}.choices__item--selectable{cursor:pointer}.choices__item--disabled{cursor:not-allowed;-webkit-user-select:none;user-select:none;opacity:.5}.choices__heading{font-weight:600;font-size:12px;padding:10px;border-bottom:1px solid #f7f7f7;color:gray}.choices__button{text-indent:-9999px;-webkit-appearance:none;appearance:none;border:0;background-color:transparent;background-repeat:no-repeat;background-position:center;cursor:pointer}.choices__button:focus,.choices__input:focus{outline:0}.choices__input{display:inline-block;vertical-align:baseline;background-color:#f9f9f9;font-size:14px;margin-bottom:5px;border:0;border-radius:0;max-width:100%;padding:4px 0 4px 2px}[dir=rtl] .choices__input{padding-right:2px;padding-left:0}.choices__placeholder{opacity:.5}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}dialog{position:absolute;left:0;right:0;width:-moz-fit-content;width:fit-content;height:-moz-fit-content;height:fit-content;margin:auto;border:solid;padding:1em;background:#fff;color:#000;display:block}dialog:not([open]){display:none}dialog+.backdrop{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.1)}._dialog_overlay{position:fixed;top:0;right:0;bottom:0;left:0}dialog.fixed{position:fixed;top:50%;transform:translateY(-50%)}.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)\";filter:alpha(opacity=80)}.gu-hide{display:none!important}.gu-unselectable{-webkit-user-select:none!important;user-select:none!important}.gu-transit{opacity:.2;-ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)\";filter:alpha(opacity=20)}.formio-loader{position:relative;min-height:60px}.loader-wrapper{z-index:1000;position:absolute;top:0;left:0;bottom:0;right:0;height:120px;background-color:#0000}.loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px;z-index:10000;display:inline-block;border:6px solid #f3f3f3;border-top:6px solid #3498db;border-radius:50%;width:60px;height:60px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.formio-form{position:relative;min-height:80px}.formio-error-wrapper,.formio-warning-wrapper{padding:1em}.formio-error-wrapper{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.formio-error-wrapper .formio-errors .error{color:#c20000}.formio-error-wrapper .field-required:after{color:#c20000}.formio-warning-wrapper{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.formio-disabled-input .form-control.flatpickr-input{background-color:#eee}.builder-component.has-error .invalid-feedback,.formio-component.alert-danger .invalid-feedback,.formio-component.has-error .invalid-feedback,.formio-component.has-message .invalid-feedback{display:block;color:inherit;margin-top:4px}.formio-errors .error{color:#dc3545}.formio-errors .warning{color:#856404}.formio-errors .info{color:#004085}.formio-wysiwyg-editor{min-height:200px;background-color:#fff}.has-feedback .form-control{padding-right:10px}.has-feedback .form-control[type=hidden]{padding-right:0}.has-error.bg-danger{padding:4px}.ql-source:after{content:\"[source]\";white-space:nowrap}.quill-source-code{width:100%;margin:0;background:#1d1d1d;box-sizing:border-box;color:#ccc;font-size:15px;outline:0;padding:20px;line-height:24px;font-family:Consolas,Menlo,Monaco,Courier New,monospace;position:absolute;top:0;bottom:0;border:none;display:none}.formio-component-tags tags{background-color:#fff}.field-required:after,.tab-error:after{content:\" *\";color:#eb0000}.field-required:after{position:relative;z-index:10}.glyphicon-spin{animation:formio-spin 1s infinite linear}@keyframes formio-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.button-icon-right{margin-left:5px}.formio-component-submit .submit-success:after{content:\"\\2713\";position:relative;right:-4px;top:1px;line-height:1}.formio-component-submit .submit-fail:after{content:\"\\2717\";position:relative;right:-4px;top:1px;line-height:1}.card-vertical{display:flex;flex-direction:row;margin-top:5px}.card-vertical .card-body,.tab,.tab-content{flex-grow:2}.nav-tabs-vertical{display:flex;flex-direction:column;border-right:1px solid #ddd;padding-left:5px;margin-right:10px;border-bottom:0}.card-vertical>.card-body,.card-vertical>.tab,.card-vertical>.tab-content{flex-basis:85%}.card-vertical ul>li>.nav-link-vertical{border-right-color:transparent;border-radius:4px 0 0 4px;margin-right:0}.card-vertical ul>li>.nav-link-vertical.active{border-bottom-color:#ddd;border-right-color:transparent}.card-vertical ul>li>.nav-link-vertical.active:hover{border-right-color:transparent}.nav-tabs-vertical>li{margin:0 -1px 0 0}.formio-component-submit .submit-fail[disabled]{opacity:1}.form-control.flatpickr-input{background-color:#fff}.input-group .flatpickr-wrapper{flex-grow:1}.flatpickr-calendar .flatpickr-current-month .flatpickr-monthDropdown-months:focus,.flatpickr-calendar .flatpickr-current-month input.cur-year:focus,.flatpickr-calendar .flatpickr-days:focus{outline:auto}td>.form-group{margin-bottom:0}.signature-pad-body{overflow:hidden;position:relative}.signature-pad-canvas{border-radius:4px;box-shadow:0 0 5px #00000005 inset;border:1px solid #f4f4f4}.btn.signature-pad-refresh{position:absolute;left:0;top:0;z-index:1000;padding:3px;line-height:0}[dir=rtl] .btn.signature-pad-refresh{left:unset;right:0}.formio-component-multiple .choices__input{width:100%}.formio-component-multiple .is-invalid{border-color:#f04124}.formio-component-multiple :not(.is-invalid){border-color:#ccc}.choices__list--dropdown .choices__item--selectable{padding-right:0}.signature-pad-refresh img{height:1.2em}.signature-pad-footer{text-align:center;color:#c3c3c3}.choices__list--dropdown{z-index:100}.choices__list--multiple .choices__item{border-radius:0;padding:2px 8px;line-height:1em;margin-bottom:6px}.choices__list--single{padding:0}.choices__item.choices__item--selectable{white-space:nowrap;overflow:hidden;padding-right:25px;text-overflow:ellipsis}.choices__input{padding:2px}.choices[dir=rtl]>*{text-align:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable]{padding-left:5px;float:right}.choices[dir=rtl] .choices__list--multiple .choices__item[data-deletable] .choices__button{float:left;margin:0 8px 0 -4px;padding-left:unset;padding-right:16px;border-left:unset;border-right:1px solid #008fa1;overflow:hidden}@-moz-document url-prefix(){.choices__button{float:right}}.formio-component-file .fileSelector{position:relative;padding:15px;border:2px dashed #ddd;text-align:center}.formio-component-file .fileSelector .loader-wrapper{display:none;width:100%;height:100%;background-color:#0000001a}.formio-component-file .fileSelector .loader-wrapper .loader{height:45px;width:45px;margin-top:-23px;margin-left:-23px}.formio-component-file .fileSelector a{text-decoration:underline}.formio-component-file .fileSelector.fileDragOver{border-color:#127abe}.formio-component-file .fileSelector .fa,.formio-component-file .fileSelector .glyphicon{font-size:20px;margin-right:5px}[dir=rtl] .formio-component-file .fileSelector .fa,[dir=rtl] .formio-component-file .fileSelector .glyphicon{margin-right:unset;margin-left:5px}.formio-component-file .fileSelector .browse{cursor:pointer}@keyframes formio-dialog-fadeout{0%{opacity:1}to{opacity:0}}@keyframes formio-dialog-fadein{0%{opacity:0}to{opacity:1}}.formio-dialog{box-sizing:border-box;font-size:.8em;color:#666}.formio-dialog.formio-modaledit-dialog{font-size:inherit}.formio-dialog *,.formio-dialog :after,.formio-dialog :before{box-sizing:inherit}.formio-dialog{position:fixed;overflow:auto;-webkit-overflow-scrolling:touch;z-index:10000;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.4);animation:formio-dialog-fadein .5s}.formio-dialog.formio-dialog-disabled-animation,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-content,.formio-dialog.formio-dialog-disabled-animation .formio-dialog-overlay{animation:none!important}.formio-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;margin-right:15px;background:0 0}.formio-dialog-no-overlay{pointer-events:none}.formio-dialog.formio-dialog-closing .formio-dialog-overlay{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-content{background:#fff;-webkit-backface-visibility:hidden;animation:formio-dialog-fadein .5s;pointer-events:all;overflow:auto}.formio-component-modal-wrapper-select .formio-dialog-content{overflow:initial}.formio-dialog.formio-dialog-closing .formio-dialog-content{-webkit-backface-visibility:hidden;animation:formio-dialog-fadeout .5s}.formio-dialog-close:before{font-family:Helvetica,Arial,sans-serif;content:\"\\d7\";cursor:pointer}body.formio-dialog-open,html.formio-dialog-open{overflow:hidden}.formio-dialog .tab-content{padding-top:12px}.formio-dialog-close{z-index:1000}@keyframes formio-dialog-flyin{0%{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:translateY(0)}}@keyframes formio-dialog-flyout{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-40px)}}.formio-dialog.formio-dialog-theme-default{padding-bottom:160px;padding-top:160px}.formio-dialog.formio-dialog-theme-default .component-edit-container{padding:.5em}.formio-dialog.formio-dialog-theme-default.formio-dialog-closing .formio-dialog-content{animation:formio-dialog-flyout .5s}.formio-dialog.formio-dialog-theme-default .formio-dialog-content{animation:formio-dialog-flyin .5s;background:#f0f0f0;border-radius:5px;font-family:Helvetica,sans-serif;font-size:1.1em;line-height:1.5em;margin:0 auto;max-width:100%;padding:1em;position:relative;width:80%}.formio-dialog.formio-dialog-theme-default .formio-dialog-close{border:none;background:0 0;cursor:pointer;position:absolute;right:1px;top:1px;z-index:100}.formio-clickable{cursor:pointer}.component-settings .nav>li>a{padding:8px 10px}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:before{display:block;padding:3px;background:0 0;color:#8a8a8a;content:\"\\d7\";font-size:26px;font-weight:400;line-height:26px;text-align:center}.formio-dialog.formio-dialog-theme-default .formio-dialog-close:active:before,.formio-dialog.formio-dialog-theme-default .formio-dialog-close:hover:before{color:#777}.formio-dialog.formio-dialog-theme-default .formio-dialog-message{margin-bottom:.5em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input{margin-bottom:1em}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text],.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url],.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea{background:#fff;border:0;border-radius:3px;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0 0 .25em;min-height:2.5em;padding:.25em .67em;width:100%}.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=email]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=password]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=text]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input input[type=url]:focus,.formio-dialog.formio-dialog-theme-default .formio-dialog-input textarea:focus{box-shadow:inset 0 0 0 2px #8dbdf1;outline:0}.formio-dialog-buttons{display:flex;justify-content:flex-end}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons{*zoom:1}.formio-dialog.formio-dialog-theme-default .formio-dialog-buttons:after{content:\"\";display:table;clear:both}.formio-dialog.formio-dialog-theme-default .formio-dialog-button{border:0;border-radius:3px;cursor:pointer;float:right;font-family:inherit;font-size:.8em;letter-spacing:.1em;line-height:1em;margin:0 0 0 .5em;padding:.75em 2em;text-transform:uppercase}.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:formio-dialog-pulse 1.1s infinite;outline:0}@media (max-width:568px){.formio-dialog.formio-dialog-theme-default .formio-dialog-button:focus{animation:none}}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-primary{background:#3288e6;color:#fff}.formio-dialog.formio-dialog-theme-default .formio-dialog-button.formio-dialog-button-secondary{background:#e0e0e0;color:#777}.formio-dialog-content .panel{margin:0}.formio-dialog-content [ref=dialogHeader]{padding-right:15px}.formio-placeholder{position:absolute;color:#999}.formio-dialog .formio-dialog-close{cursor:pointer}.formio-iframe{border:none;width:100%;height:1000px}.inline-form-button{margin-right:10px}.tooltip{opacity:1}.tooltip[x-placement=right] .tooltip-arrow{border-right:5px solid #000}.tooltip[x-placement=right] .tooltip-inner{margin-left:8px}.control-label--bottom{margin-bottom:0;margin-top:5px}.formio-component-label-hidden{position:relative}.formio-hidden{margin:0}.formio-removed{display:none}.control-label--hidden{position:absolute;top:6px;right:5px}.formio-component-datetime .control-label--hidden.field-required{right:45px;z-index:3}.formio-component-selectboxes .control-label--hidden.field-required,.formio-component-survey .control-label--hidden.field-required{top:0}.formio-component-resource .control-label--hidden.field-required,.formio-component-select .control-label--hidden.field-required{right:40px;z-index:2}.formio-component-radio .control-label--hidden.field-required:after,.formio-component-selectboxes .control-label--hidden.field-required:after{display:none}.formio-component-radio.formio-component-label-hidden.required .form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .form-check-label:before{position:relative;content:\"* \";color:#eb0000}.formio-component-radio.formio-component-label-hidden.required .label-position-right.form-check-label:before,.formio-component-selectboxes.formio-component-label-hidden.required .label-position-right.form-check-label:before{right:20px}.formio-component-datasource,.formio-component-hidden:not(.formio-component-checkbox){margin-bottom:0}.checkbox-inline label,.radio-inline label{font-weight:400;cursor:pointer}.editgrid-listgroup{margin-bottom:10px}.tree-listgroup{flex-direction:row}.formio-component-submit button[disabled]+.has-error{display:block}.formio-choices.form-group{margin-bottom:0}.formio-choices[data-type=select-multiple] .form-control{height:auto}.form-control.formio-multiple-mask-select{width:15%;z-index:4}.form-control.formio-multiple-mask-input{width:85%}.input-group.formio-multiple-mask-container{width:100%}.formio-component .table{margin-bottom:0}.editgrid-table-container{margin-bottom:10px;max-width:calc(100vw - 140px)}.editgrid-table-container .table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.editgrid-table-column{border:none}.editgrid-table-head{border:1px solid #ddd}.editgrid-table-body{border:1px solid #ddd;border-top:0}.formio-hide-label-panel-tooltip{margin-top:-10px;margin-left:-10px}.is-disabled .choices__list--multiple .choices__item{padding:5px 10px}.is-disabled .choices__list--multiple .choices__item .choices__button{display:none}.formio-collapse-icon{cursor:pointer;margin-right:4px}[dir=rtl] .formio-collapse-icon{margin-right:unset;margin-left:4px}.formio-component-dateTime .form-control[type=datetime-local]~.input-group-addon,.formio-component-datetime .form-control[type=datetime-local]~.input-group-addon{width:auto}.formio-component-datagrid .formio-datagrid-remove{position:absolute;top:0;right:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-datagrid .datagrid-table>tbody>tr>td:last-child{position:relative}.formio-component-datagrid .datagrid-table>tbody>tr:hover>td:last-child .formio-datagrid-remove{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-component-modaledit .formio-modaledit-view-container{position:relative;border:1px solid #ddd;min-height:34px;padding:6px 12px;cursor:text}td .formio-component-modaledit .formio-modaledit-view-container{padding:0;border-style:none}.formio-component-modaledit .formio-modaledit-edit{position:absolute;top:0;left:0;visibility:hidden;opacity:0;transition:opacity .2s linear,visibility 0s .2s}.formio-component-modaledit .formio-modaledit-view-container:hover .formio-modaledit-edit{visibility:visible;opacity:1;transition:visibility 0s,opacity .2s linear}.formio-modaledit-dialog .formio-modaledit-close{position:absolute;top:100%;right:0;border-radius:0}.reset-margins a,.reset-margins abbr,.reset-margins acronym,.reset-margins address,.reset-margins applet,.reset-margins article,.reset-margins aside,.reset-margins audio,.reset-margins b,.reset-margins big,.reset-margins blockquote,.reset-margins body,.reset-margins canvas,.reset-margins caption,.reset-margins center,.reset-margins cite,.reset-margins code,.reset-margins dd,.reset-margins del,.reset-margins details,.reset-margins dfn,.reset-margins div,.reset-margins dl,.reset-margins dt,.reset-margins em,.reset-margins embed,.reset-margins fieldset,.reset-margins figcaption,.reset-margins figure,.reset-margins footer,.reset-margins form,.reset-margins h1,.reset-margins h2,.reset-margins h3,.reset-margins h4,.reset-margins h5,.reset-margins h6,.reset-margins header,.reset-margins hgroup,.reset-margins html,.reset-margins i,.reset-margins iframe,.reset-margins img,.reset-margins ins,.reset-margins kbd,.reset-margins label,.reset-margins legend,.reset-margins li,.reset-margins mark,.reset-margins menu,.reset-margins nav,.reset-margins object,.reset-margins ol,.reset-margins output,.reset-margins p,.reset-margins pre,.reset-margins q,.reset-margins ruby,.reset-margins s,.reset-margins samp,.reset-margins section,.reset-margins small,.reset-margins span,.reset-margins strike,.reset-margins strong,.reset-margins sub,.reset-margins summary,.reset-margins sup,.reset-margins table,.reset-margins tbody,.reset-margins td,.reset-margins tfoot,.reset-margins th,.reset-margins thead,.reset-margins time,.reset-margins tr,.reset-margins tt,.reset-margins u,.reset-margins ul,.reset-margins var,.reset-margins video{margin:0}.ck-body .ck.ck-balloon-panel{z-index:101000}.formio-component-select select[disabled=disabled]{-webkit-appearance:none;-moz-appearance:none;text-indent:1px;text-overflow:\"\"}.formio-component-select .choices.is-disabled[data-type*=select-one]:after,.formio-component-select div[disabled=disabled] button{display:none}.datagrid-group-label.collapsed>td{display:none}.datagrid-group-header.clickable{cursor:pointer}.datagrid-group-header.clickable .datagrid-group-label:before{display:inline-block;vertical-align:middle;content:\"\\25be\";margin:0 5px}.datagrid-group-header.clickable.collapsed .datagrid-group-label:before{content:\"\\25b8\"}.formio-component.alert-danger .help-block,.formio-component.alert-warning .help-block{color:inherit}.tree__level_even{background-color:#f6f6f6}.tree__node-content{margin-bottom:10px}.tree__node-children{margin:0}.formio-select-autocomplete-input{opacity:0;position:relative;z-index:-1;display:block;height:0;border:none}.has-error>.help-block{margin-top:5px;margin-bottom:10px}.no-top-border-table>.table>tbody>tr:first-child>td{border-top:none}.table>tbody>tr>td.cell-align-left{text-align:left}.table>tbody>tr>td.cell-align-center{text-align:center}.table>tbody>tr>td.cell-align-center>div{margin-left:auto;margin-right:auto}.table>tbody>tr>td.cell-align-right{text-align:right}.table>tbody>tr>td.cell-align-right>div{margin-left:auto}.table-responsive[ref=component]{overflow-x:visible}.formio-component-textarea .alert .ck-editor__editable{color:inherit}.formio-component-textarea .ck.ck-editor__editable .image .ck-progress-bar{height:4px}div[data-oembed-url]{width:100%}.checkbox label.label-position-bottom,.checkbox label.label-position-left,.checkbox label.label-position-top,.radio label.label-position-bottom,.radio label.label-position-left,.radio label.label-position-top{padding-left:0}.checkbox label.label-position-bottom span,.checkbox label.label-position-top span,.radio label.label-position-bottom span,.radio label.label-position-top span{display:block}.checkbox label.label-position-bottom input[type=checkbox],.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-bottom input[type=radio],.radio label.label-position-top input[type=radio]{position:relative;margin-left:0}.checkbox label.label-position-top input[type=checkbox],.radio label.label-position-top input[type=radio]{margin-top:4px}.checkbox label.label-position-bottom input[type=checkbox],.radio label.label-position-bottom input[type=radio]{margin-bottom:8px}.radio label.label-position-left input[type=radio]{margin-left:10px}.checkbox label.label-position-left input[type=checkbox]{margin-left:4px;position:relative}.open-modal-button{width:100%;text-align:left;white-space:normal;height:auto}.formio-component-modal-wrapper-signature .open-modal-button{text-align:center;height:100%;font-size:1.4em;padding:0;margin:0}.formio-component-content .image{display:table;clear:both;text-align:center;margin:1em auto}.formio-component-content .image>img{display:block;margin:0 auto;max-width:100%;min-width:50px}.formio-component-content .image>figcaption{display:table-caption;caption-side:bottom;word-break:break-word;color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}.formio-component-content .image.image_resized{max-width:100%;display:block;box-sizing:border-box}.formio-component-content .image.image_resized img{width:100%}.formio-component-content .image.image_resized>figcaption{display:block}.formio-component-content .media{clear:both;margin:1em 0;display:block;min-width:15em}.formio-component-content .image-style-align-center:not(.image_resized),.formio-component-content .image-style-align-left:not(.image_resized),.formio-component-content .image-style-align-right:not(.image_resized),.formio-component-content .image-style-side:not(.image_resized){max-width:50%}.formio-component-content .image-style-side{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-left{float:left;margin-right:var(--ck-image-style-spacing)}.formio-component-content .image-style-align-center{margin-left:auto;margin-right:auto}.formio-component-content .image-style-align-right{float:right;margin-left:var(--ck-image-style-spacing)}.formio-component-content blockquote{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;margin-right:0;font-style:italic;border-left:solid 5px hsl(0deg,0%,80%)}.formio-component-content[dir=rtl] blockquote{border-left:0;border-right:solid 5px hsl(0deg,0%,80%)}.formio-component-content .text-tiny{font-size:.7em}.formio-component-content .text-small{font-size:.85em}.formio-component-content .text-big{font-size:1.4em}.formio-component-content .text-huge{font-size:1.8em}.formio-component-address.formio-component-label-hidden>label.field-required{z-index:1}.formio-component-address.formio-component-label-hidden>label.field-required~.address-autocomplete-container .address-autocomplete-remove-value-icon{right:20px}.address-autocomplete-container{position:relative}.address-autocomplete-container .address-autocomplete-remove-value-icon{cursor:pointer;position:absolute;margin-top:-9px;right:10px;top:50%}.address-autocomplete-container .address-autocomplete-remove-value-icon--hidden{display:none}.autocomplete{background:#fff;font:14px/22px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;overflow:auto;box-sizing:border-box;border:1px solid rgba(50,50,50,.6);z-index:11000}.autocomplete>div{cursor:pointer;padding:6px 10px}.autocomplete>div.selected,.autocomplete>div:hover:not(.group){background:#1e90ff;color:#fff}.field-wrapper{display:flex}.field-wrapper--reverse{flex-direction:row-reverse}.field-wrapper .field-label--right{text-align:right}.formio-component-modal-wrapper{margin-bottom:10px}.formio-component-modal-wrapper .open-modal-button{height:auto}.formio-component-modal-wrapper .component-rendering-hidden{visibility:hidden}.formio-component-textarea div.formio-editor-read-only-content[ref=input]{white-space:pre-wrap}.formio-editor-read-only-content img{max-width:100%}.formio-editor-read-only-content li[data-list=bullet]{list-style-type:none}.formio-editor-read-only-content li[data-list=bullet] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=bullet] .ql-ui:before{content:\"\\2022\"}.formio-editor-read-only-content li[data-list=ordered]{list-style-type:none;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-0}.formio-editor-read-only-content li[data-list=ordered] .ql-ui{padding-right:.5rem}.formio-editor-read-only-content li[data-list=ordered] .ql-ui:before{content:counter(list-0,decimal) \". \"}.formio-editor-read-only-content figure.table table{border-collapse:collapse;border-spacing:0;width:100%;height:100%;border:1px double #b3b3b3;table-layout:fixed}.formio-editor-read-only-content figure.table table td,.formio-editor-read-only-content figure.table table th{min-width:2em;padding:.4em;border:1px solid #bfbfbf}.formio-component-password .pull-right:not(:last-child),.formio-component-textarea .pull-right:not(:last-child),.formio-component-textfield .pull-right:not(:last-child){padding-left:12px}.formio-form>div>nav>ul.pagination{flex-flow:wrap row}.formio-form>div>nav>ul.pagination .page-link{cursor:pointer;color:#1c74d9}.formio-form>div>nav>ul.pagination .page-item.active .page-link{color:#fff;background-color:#1c74d9;border-color:#1c74d9}.classic-pagination{border-bottom:solid 1px #e0e0e0;padding:0 15px 10px;line-height:1em}.classic-pagination-page{padding:0;position:relative}.classic-pagination-title{color:#595959;font-size:16px;margin-bottom:5px}.classic-pagination-dot{position:absolute;width:30px;height:30px;display:block;background:#fbe8aa;top:40px;left:50%;margin-top:-15px;margin-left:-15px;border-radius:50%}.classic-pagination-dot:after{content:\" \";width:14px;height:14px;background:#fbbd19;border-radius:50px;position:absolute;top:8px;left:8px}.classic-pagination .progress,.classic-pagination-progress{position:relative;border-radius:0;height:8px;box-shadow:none;margin:20px 0;border:none;padding:0;background-color:#f6f6f6}.classic-pagination .progress-bar,.classic-pagination-progress-bar{width:0;height:10px;box-shadow:none;background:#fbe8aa}.classic-pagination-page.complete .classic-pagination-progress-bar,.classic-pagination-page.complete .progress-bar{width:100%}.classic-pagination-page.active .classic-pagination-progress-bar,.classic-pagination-page.active .progress-bar{width:50%}.classic-pagination-page.disabled .classic-pagination-dot{background-color:#f5f5f5}.classic-pagination-page.disabled .classic-pagination-dot:after{opacity:0}.classic-pagination-page:first-child .classic-pagination-progress,.classic-pagination-page:first-child .progress{left:50%;width:50%}.classic-pagination-page:first-child.active .classic-pagination-progress-bar,.classic-pagination-page:first-child.active .progress-bar{width:0%}.classic-pagination-page:last-child .classic-pagination-progress,.classic-pagination-page:last-child .progress{width:50%}.classic-pagination-page:last-child.active .classic-pagination-progress-bar,.classic-pagination-page:last-child.active .progress-bar{width:100%}.pac-container{z-index:11000}[ref=buttonMessageContainer].has-error{cursor:pointer}[ref=passwordStrengthIndicator]{display:inline}.formio-security-indicator{display:flex;height:5px}.formio-security-indicator [class^=security-]{width:100%;height:100%}.formio-security-indicator .security-low{background-color:#c51e00}.formio-security-indicator .security-medium{background-color:#ebb400}.formio-security-indicator .security-high{background-color:#bddf00}.formio-security-indicator .security-very-high{background-color:#009118}.formio-component-textarea .formio-editor-read-only-content .text-big{font-size:1.4em}.formio-component-textarea .formio-editor-read-only-content .text-huge{font-size:1.8em}.formio-component-textarea .formio-editor-read-only-content .text-small{font-size:.85em}.formio-component-textarea .formio-editor-read-only-content .text-tiny{font-size:.7em}.formio-component [ref=valueMaskInput]{display:none}.formio-wizard-nav-container{display:flex}.formio-wizard-nav-container li{margin-right:.5rem}@media not all and (min-width:30em){.formio-wizard-nav-container{flex-direction:column}.formio-wizard-nav-container li{margin-right:0}.formio-wizard-nav-container li .btn{width:100%;margin-bottom:.25rem}}.formio-tooltip__trigger{cursor:pointer}.formio-tooltip__body{background-color:#1b1b1b;border-radius:.25rem;bottom:0;color:#f0f0f0;display:none;font-size:1rem;padding:.5rem;position:absolute;left:0;transform:translate(-50%);width:auto;white-space:pre;z-index:1000}.formio-tooltip__body.formio-tooltip--is-set{display:block}.formio-tooltip__body--whitespace{white-space:normal;width:250px}.formio-tooltip__body--right{top:auto;transform:translate(0)}.formio-tooltip__body--left{top:auto;left:0;right:auto;transform:translate(0)}.formio-tooltip__body--bottom{bottom:auto;top:0}.formio-tooltip__wrapper{position:relative}.formio-tooltip__wrapper>span{font-weight:400}span[role=link]{text-decoration:underline;cursor:pointer}.formbuilder{position:relative}.drag-container{padding:10px;border:dotted 2px #e8e8e8}.drag-container:hover{cursor:move;border:dotted 2px #ccc}.drag-container.formio-builder-form,.drag-container.formio-builder-form:hover,.panel-body>.drag-container.formio-builder-components,.panel-body>.drag-container.formio-builder-components:hover,.tab-pane>.drag-container.formio-builder-components,.tab-pane>.drag-container.formio-builder-components:hover{padding:0 0 1rem;border:none}.component-btn-group{display:flex;flex-direction:row-reverse;position:absolute;right:0;z-index:1000;margin-top:-2px}.builder-component{position:relative;min-height:15px;margin-bottom:15px}.builder-component .formio-component-htmlelement{border:dotted 2px #e8e8e8}.builder-component .formio-component-htmlelement [ref=html]:empty:before{content:\"HTML Content\";color:#aaa}.builder-component:not(:hover) .component-btn-group{display:none}.builder-group-button{background-color:transparent;white-space:normal;text-align:left}.form-builder-group-header{padding:0}.component-btn-group .component-settings-button{float:right;margin:4px 4px 0 0;z-index:1001;box-shadow:0 0 10px 1px #3071a999}.formbuilder .formio-component-content,.formbuilder .formio-component-datasource,.formbuilder .formio-component-form,.formbuilder .formio-component-hidden{border:2px dashed #ddd}.formbuilder .formio-component-datasource,.formbuilder .formio-component-form,.formbuilder .formio-component-hidden{min-height:3em;text-align:center;color:#aaa;padding-top:.5em}.btn-group-xxs>.btn,.btn-xxs,.component-btn-group .component-settings-button{padding:2px;font-size:10px;line-height:1.2em;border-radius:0;width:18px;height:18px}.formcomponents .formcomponent{text-align:left;padding:5px 5px 5px 8px;margin-top:.2rem;font-size:.8em;line-height:1.2;border-radius:.3em}.form-builder-panel .panel-body{padding:5px}.formio-component-tabs .ui.tabular.menu .item{padding:.8em}.formio-pdf-builder{position:relative}.formio-drop-zone{display:none;position:absolute;z-index:10;background-color:#0d87e9;opacity:.1}.formio-drop-zone.enabled{display:inherit}.component-settings .formio-dialog-content{max-height:100%}.component-btn-group .btn.component-settings-button-paste{display:none}.builder-paste-mode .component-settings-button-paste{display:inherit!important}.wizard-page-label{cursor:pointer;border-radius:0}.panel-body .drag-and-drop-alert{margin-bottom:0}.builder-sidebar_scroll{position:sticky;top:15px}.builder-sidebar_search{margin-bottom:10px;-webkit-appearance:auto;appearance:auto}.formio-wizard-builder-component-title{color:#6c757d;text-align:center;padding:.5rem}.formio-wizard-position{position:relative}.formio-settings-help{color:#8a6d3b;background-color:#fcf8e3;border-color:#faebcc;margin-top:10px}.help-block{margin:0}.builder-sidebar .btn{white-space:normal}.component-settings{padding-top:20px!important;padding-bottom:20px!important}.component-edit-container{height:auto;overflow:hidden}.component-edit-content{height:calc(100% - 4em)}.component-edit-tabs.col-sm-6{height:100%;overflow-y:auto}.component-edit-tabs.col-sm-12,.component-edit-tabs.col-sm-12 .editForm{height:calc(100% - 4em);overflow-y:auto}.progress.pdf-progress{height:2rem}.progress.pdf-progress .progress-bar{font-size:1rem;line-height:2rem}.builder-sidebar.disabled .formcomponent{cursor:not-allowed;opacity:.65;box-shadow:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: FormioAppConfig, decorators: [{
                    type: Optional
                }] }, { type: CustomTagsService, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { form: [{
                type: Input
            }], options: [{
                type: Input
            }], formbuilder: [{
                type: Input
            }], noeval: [{
                type: Input
            }], refresh: [{
                type: Input
            }], rebuild: [{
                type: Input
            }], change: [{
                type: Output
            }], builderElement: [{
                type: ViewChild,
                args: ['builder', { static: true }]
            }] } });

class FormioModule {
}
FormioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, declarations: [FormioComponent,
        FormioBaseComponent,
        FormBuilderComponent,
        FormioLoaderComponent,
        FormioAlertsComponent,
        ParseHtmlContentPipe], imports: [CommonModule], exports: [FormioComponent,
        FormBuilderComponent,
        FormioLoaderComponent,
        FormioAlertsComponent] });
FormioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, providers: [
        FormioAlerts,
        CustomTagsService
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormioComponent,
                        FormioBaseComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent,
                        ParseHtmlContentPipe
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        FormioComponent,
                        FormBuilderComponent,
                        FormioLoaderComponent,
                        FormioAlertsComponent
                    ],
                    providers: [
                        FormioAlerts,
                        CustomTagsService
                    ]
                }]
        }] });

// @ts-nocheck
const BaseInputComponent = Components.components.input;
const TextfieldComponent = Components.components.textfield;
function createCustomFormioComponent(customComponentOptions) {
    var _a;
    return _a = class CustomComponent extends BaseInputComponent {
            constructor(component, options, data) {
                super(component, {
                    ...options,
                    sanitizeConfig: {
                        addTags: [customComponentOptions.selector],
                    },
                }, data);
                this.component = component;
                this.id = Utils.getRandomComponentId();
                this.type = customComponentOptions.type;
                if (customComponentOptions.extraValidators) {
                    this.validators = this.validators.concat(customComponentOptions.extraValidators);
                }
            }
            static schema() {
                return BaseInputComponent.schema({
                    ...customComponentOptions.schema,
                    type: customComponentOptions.type,
                });
            }
            get defaultSchema() {
                return CustomComponent.schema();
            }
            get emptyValue() {
                return customComponentOptions.emptyValue || null;
            }
            static get builderInfo() {
                return {
                    title: customComponentOptions.title,
                    group: customComponentOptions.group,
                    icon: customComponentOptions.icon,
                    weight: customComponentOptions.weight,
                    documentation: customComponentOptions.documentation,
                    schema: CustomComponent.schema(),
                };
            }
            elementInfo() {
                const info = super.elementInfo();
                info.type = customComponentOptions.selector;
                info.changeEvent = customComponentOptions.changeEvent || 'valueChange';
                info.attr = {
                    ...info.attr,
                    class: info.attr.class.replace('form-control', 'form-control-custom-field') // remove the form-control class as the custom angular component may look different
                };
                return info;
            }
            get inputInfo() {
                const info = {
                    id: this.key,
                    ...this.elementInfo()
                };
                return info;
            }
            renderElement(value, index) {
                const info = this.inputInfo;
                return this.renderTemplate(customComponentOptions.template || 'input', {
                    input: info,
                    value,
                    index
                });
            }
            attach(element) {
                let superAttach = super.attach(element);
                this._customAngularElement = element.querySelector(customComponentOptions.selector);
                // Bind the custom options and the validations to the Angular component's inputs (flattened)
                if (this._customAngularElement) {
                    // To make sure we have working input in IE...
                    // IE doesn't render it properly if it's not visible on the screen
                    // due to the whole structure applied via innerHTML to the parent
                    // so we need to use appendChild
                    if (!this._customAngularElement.getAttribute('ng-version')) {
                        this._customAngularElement.removeAttribute('ref');
                        const newCustomElement = document.createElement(customComponentOptions.selector);
                        newCustomElement.setAttribute('ref', 'input');
                        Object.keys(this.inputInfo.attr).forEach((attr) => {
                            newCustomElement.setAttribute(attr, this.inputInfo.attr[attr]);
                        });
                        this._customAngularElement.appendChild(newCustomElement);
                        this._customAngularElement = newCustomElement;
                        superAttach = super.attach(element);
                    }
                    // Bind customOptions
                    for (const key in this.component.customOptions) {
                        if (this.component.customOptions.hasOwnProperty(key)) {
                            this._customAngularElement[key] = this.component.customOptions[key];
                        }
                    }
                    // Bind validate options
                    for (const key in this.component.validate) {
                        if (this.component.validate.hasOwnProperty(key)) {
                            this._customAngularElement[key] = this.component.validate[key];
                        }
                    }
                    // Bind options explicitly set
                    const fieldOptions = customComponentOptions.fieldOptions;
                    if (isArray(fieldOptions) && fieldOptions.length > 0) {
                        for (const key in fieldOptions) {
                            if (fieldOptions.hasOwnProperty(key)) {
                                this._customAngularElement[fieldOptions[key]] = this.component[fieldOptions[key]];
                            }
                        }
                    }
                    // Attach event listener for emit event
                    this._customAngularElement.addEventListener('formioEvent', (event) => {
                        this.emit(event.detail.eventName, {
                            ...event.detail.data,
                            component: this.component
                        });
                    });
                    // Ensure we bind the value (if it isn't a multiple-value component with no wrapper)
                    if (!this._customAngularElement.value && !this.component.disableMultiValueWrapper) {
                        this.restoreValue();
                    }
                }
                return superAttach;
            }
            // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
            useWrapper() {
                return this.component.hasOwnProperty('multiple') && this.component.multiple && !this.component.disableMultiValueWrapper;
            }
            get defaultValue() {
                let defaultValue = this.emptyValue;
                // handle falsy default value
                if (!isNil(this.component.defaultValue)) {
                    defaultValue = this.component.defaultValue;
                }
                if (this.component.customDefaultValue && !this.options.preview) {
                    defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
                }
                return clone(defaultValue);
            }
        },
        _a.editForm = customComponentOptions.editForm || TextfieldComponent.editForm,
        _a;
}

function registerCustomTag(tag, injector) {
    injector.get(CustomTagsService).addCustomTag(tag);
}
function registerCustomTags(tags, injector) {
    tags.forEach(tag => registerCustomTag(tag, injector));
}
function registerCustomFormioComponent(options, angularComponent, injector) {
    registerCustomTag(options.selector, injector);
    const complexCustomComponent = createCustomElement(angularComponent, { injector });
    customElements.define(options.selector, complexCustomComponent);
    Components.setComponent(options.type, createCustomFormioComponent(options));
}
function registerCustomFormioComponentWithClass(options, angularComponent, formioClass, injector) {
    registerCustomTag(options.selector, injector);
    const complexCustomComponent = createCustomElement(angularComponent, { injector });
    customElements.define(options.selector, complexCustomComponent);
    Components.setComponent(options.type, formioClass);
}

/**
 * Generated bundle index. Do not edit.
 */

export { CustomTagsService, FormBuilderComponent, FormioAlerts, FormioAlertsComponent, FormioAppConfig, FormioBaseComponent, FormioComponent, FormioError, FormioLoaderComponent, FormioModule, FormioPromiseService, FormioService, createCustomFormioComponent, extendRouter, registerCustomFormioComponent, registerCustomFormioComponentWithClass, registerCustomTag, registerCustomTags };
//# sourceMappingURL=formio-angular.mjs.map
