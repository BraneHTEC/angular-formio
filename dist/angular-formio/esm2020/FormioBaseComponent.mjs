import { Component, EventEmitter, Input, Optional, Output, ViewChild } from '@angular/core';
import { FormioService } from './formio.service';
import { FormioAlerts } from './components/alerts/formio.alerts';
import { assign, get, isEmpty } from 'lodash';
import Evaluator from 'formiojs/utils/Evaluator';
import { fastCloneDeep } from 'formiojs/utils/utils';
import { AlertsPosition } from './types/alerts-position';
import * as i0 from "@angular/core";
import * as i1 from "./formio.config";
import * as i2 from "./custom-component/custom-tags.service";
export class FormioBaseComponent {
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
FormioBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioBaseComponent, deps: [{ token: i0.NgZone }, { token: i1.FormioAppConfig, optional: true }, { token: i2.CustomTagsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
FormioBaseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioBaseComponent, selector: "ng-component", inputs: { form: "form", submission: "submission", src: "src", url: "url", service: "service", options: "options", noeval: "noeval", formioOptions: "formioOptions", renderOptions: "renderOptions", readOnly: "readOnly", viewOnly: "viewOnly", hideLoading: "hideLoading", hideComponents: "hideComponents", refresh: "refresh", error: "error", success: "success", language: "language", hooks: "hooks", renderer: "renderer", watchSubmissionErrors: "watchSubmissionErrors", dataTableActions: "dataTableActions" }, outputs: { render: "render", customEvent: "customEvent", fileUploadingStatus: "fileUploadingStatus", submit: "submit", prevPage: "prevPage", nextPage: "nextPage", beforeSubmit: "beforeSubmit", rowAdd: "rowAdd", rowAdded: "rowAdded", rowEdit: "rowEdit", rowEdited: "rowEdited", rowDelete: "rowDelete", rowClick: "rowClick", rowSelectChange: "rowSelectChange", change: "change", invalid: "invalid", errorChange: "errorChange", formLoad: "formLoad", submissionLoad: "submissionLoad", ready: "ready" }, viewQueries: [{ propertyName: "formioElement", first: true, predicate: ["formio"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioBaseComponent, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i1.FormioAppConfig, decorators: [{
                    type: Optional
                }] }, { type: i2.CustomTagsService, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybWlvQmFzZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3NyYy9Gb3JtaW9CYXNlQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBd0MsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUksT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUdqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUMsT0FBTyxTQUFTLE1BQU0sMEJBQTBCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQUt6RCxNQUFNLE9BQU8sbUJBQW1CO0lBeUQ5QixZQUNTLE1BQWMsRUFDRixNQUF1QixFQUN2QixVQUE4QjtRQUYxQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ0YsV0FBTSxHQUFOLE1BQU0sQ0FBaUI7UUFDdkIsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7UUExRDFDLGVBQVUsR0FBUyxFQUFFLENBQUM7UUFLdEIsV0FBTSxHQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFHNUIsYUFBUSxHQUFLLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUssS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUssS0FBSyxDQUFDO1FBTXRCLFVBQUssR0FBUyxFQUFFLENBQUM7UUFFakIsMEJBQXFCLEdBQUssS0FBSyxDQUFDO1FBQ2hDLHFCQUFnQixHQUFVLEVBQUUsQ0FBQTtRQUMzQixXQUFNLEdBQUcs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QUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQWMsRUFBRSxFQUFFLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQVMsRUFBRSxTQUFjLEVBQUUsRUFBRSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFTLEVBQUUsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsU0FBYyxFQUFFLEVBQUUsQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFTLEVBQUUsUUFBZ0IsRUFBRSxTQUFjLEVBQUUsRUFBRSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEdBQUcs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TUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLFNBQVM7c0JBQWxCLE1BQU07Z0JBQ0csU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNO2dCQUNnQyxhQUFhO3NCQUFuRCxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1pb1NlcnZpY2UgfSBmcm9tICcuL2Zvcm1pby5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0cy9mb3JtaW8uYWxlcnRzJztcclxuaW1wb3J0IHsgRm9ybWlvQXBwQ29uZmlnIH0gZnJvbSAnLi9mb3JtaW8uY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvRXJyb3IsIEZvcm1pb0Zvcm0sIEZvcm1pb09wdGlvbnMsIEZvcm1pb1JlZnJlc2hWYWx1ZSB9IGZyb20gJy4vZm9ybWlvLmNvbW1vbic7XHJcbmltcG9ydCB7IGFzc2lnbiwgZ2V0LCBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgQ3VzdG9tVGFnc1NlcnZpY2UgfSBmcm9tICcuL2N1c3RvbS1jb21wb25lbnQvY3VzdG9tLXRhZ3Muc2VydmljZSc7XHJcbmltcG9ydCBFdmFsdWF0b3IgZnJvbSAnZm9ybWlvanMvdXRpbHMvRXZhbHVhdG9yJztcclxuaW1wb3J0IHsgZmFzdENsb25lRGVlcCB9IGZyb20gJ2Zvcm1pb2pzL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHsgQWxlcnRzUG9zaXRpb24gfSBmcm9tICcuL3R5cGVzL2FsZXJ0cy1wb3NpdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1pb0Jhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBmb3JtPzogRm9ybWlvRm9ybTtcclxuICBASW5wdXQoKSBzdWJtaXNzaW9uPzogYW55ID0ge307XHJcbiAgQElucHV0KCkgc3JjPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHVybD86IHN0cmluZztcclxuICBASW5wdXQoKSBzZXJ2aWNlPzogRm9ybWlvU2VydmljZTtcclxuICBASW5wdXQoKSBvcHRpb25zPzogRm9ybWlvT3B0aW9ucztcclxuICBASW5wdXQoKSBub2V2YWwgPyA9IEV2YWx1YXRvci5ub2V2YWw7XHJcbiAgQElucHV0KCkgZm9ybWlvT3B0aW9ucz86IGFueTtcclxuICBASW5wdXQoKSByZW5kZXJPcHRpb25zPzogYW55O1xyXG4gIEBJbnB1dCgpIHJlYWRPbmx5ID8gPSBmYWxzZTtcclxuICBASW5wdXQoKSB2aWV3T25seSA/ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGlkZUxvYWRpbmcgPyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhpZGVDb21wb25lbnRzPzogc3RyaW5nW107XHJcbiAgQElucHV0KCkgcmVmcmVzaD86IEV2ZW50RW1pdHRlcjxGb3JtaW9SZWZyZXNoVmFsdWU+O1xyXG4gIEBJbnB1dCgpIGVycm9yPzogRXZlbnRFbWl0dGVyPGFueT47XHJcbiAgQElucHV0KCkgc3VjY2Vzcz86IEV2ZW50RW1pdHRlcjxvYmplY3Q+O1xyXG4gIEBJbnB1dCgpIGxhbmd1YWdlPzogRXZlbnRFbWl0dGVyPHN0cmluZz47XHJcbiAgQElucHV0KCkgaG9va3M/OiBhbnkgPSB7fTtcclxuICBASW5wdXQoKSByZW5kZXJlcj86IGFueTtcclxuICBASW5wdXQoKSB3YXRjaFN1Ym1pc3Npb25FcnJvcnMgPyA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRhdGFUYWJsZUFjdGlvbnM/IDogYW55ID0gW11cclxuICBAT3V0cHV0KCkgcmVuZGVyID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIGN1c3RvbUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIGZpbGVVcGxvYWRpbmdTdGF0dXMgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIHByZXZQYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIG5leHRQYWdlID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XHJcbiAgQE91dHB1dCgpIGJlZm9yZVN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xyXG4gIEBPdXRwdXQoKSByb3dBZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcm93QWRkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcm93RWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSByb3dFZGl0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcm93RGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHJvd0NsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHJvd1NlbGVjdENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcclxuICBAT3V0cHV0KCkgaW52YWxpZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3JDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgZm9ybUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgc3VibWlzc2lvbkxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1pb0Jhc2VDb21wb25lbnQ+KCk7XHJcbiAgQFZpZXdDaGlsZCgnZm9ybWlvJywgeyBzdGF0aWM6IHRydWUgfSkgZm9ybWlvRWxlbWVudD86IEVsZW1lbnRSZWY8YW55PjtcclxuXHJcbiAgcHVibGljIEFsZXJ0c1Bvc2l0aW9uID0gQWxlcnRzUG9zaXRpb247XHJcbiAgcHVibGljIGZvcm1pbzogYW55O1xyXG4gIHB1YmxpYyBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBhbGVydHMgPSBuZXcgRm9ybWlvQWxlcnRzKCk7XHJcbiAgcHVibGljIGZvcm1pb1JlYWR5OiBQcm9taXNlPGFueT47XHJcblxyXG4gIHByaXZhdGUgZm9ybWlvUmVhZHlSZXNvbHZlOiBhbnk7XHJcbiAgcHJpdmF0ZSBzdWJtaXR0aW5nID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBzdWJtaXNzaW9uU3VjY2VzcyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIG5vQWxlcnRzOiBib29sZWFuO1xyXG4gIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBjb25maWc6IEZvcm1pb0FwcENvbmZpZyxcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBjdXN0b21UYWdzPzogQ3VzdG9tVGFnc1NlcnZpY2UsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmZvcm1pb1JlYWR5ID0gbmV3IFByb21pc2UoKHJlYWR5KSA9PiB7XHJcbiAgICAgIHRoaXMuZm9ybWlvUmVhZHlSZXNvbHZlID0gcmVhZHk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFJlbmRlcmVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZXI7XHJcbiAgfVxyXG5cclxuICBnZXRSZW5kZXJlck9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBleHRyYVRhZ3MgPSB0aGlzLmN1c3RvbVRhZ3MgPyB0aGlzLmN1c3RvbVRhZ3MudGFncyA6IFtdO1xyXG4gICAgcmV0dXJuIGFzc2lnbih7fSwge1xyXG4gICAgICBpY29uczogZ2V0KHRoaXMuY29uZmlnLCAnaWNvbnMnLCAnZm9udGF3ZXNvbWUnKSxcclxuICAgICAgbm9BbGVydHM6IGdldCh0aGlzLm9wdGlvbnMsICdub0FsZXJ0cycsIHRydWUpLFxyXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSxcclxuICAgICAgdmlld0FzSHRtbDogdGhpcy52aWV3T25seSxcclxuICAgICAgLi4uKHRoaXMudmlld09ubHkgJiYgeyByZW5kZXJNb2RlOiBcImh0bWxcIiB9KSxcclxuICAgICAgaTE4bjogZ2V0KHRoaXMub3B0aW9ucywgJ2kxOG4nLCBudWxsKSxcclxuICAgICAgZmlsZVNlcnZpY2U6IGdldCh0aGlzLm9wdGlvbnMsICdmaWxlU2VydmljZScsIG51bGwpLFxyXG4gICAgICBob29rczogdGhpcy5ob29rcyxcclxuICAgICAgc2FuaXRpemVDb25maWc6IHtcclxuICAgICAgICBhZGRUYWdzOiBleHRyYVRhZ3NcclxuICAgICAgfSxcclxuICAgICAgZGF0YVRhYmxlQWN0aW9uczogdGhpcy5kYXRhVGFibGVBY3Rpb25zXHJcbiAgICB9LCB0aGlzLnJlbmRlck9wdGlvbnMgfHwge30pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUmVuZGVyZXIoKSB7XHJcbiAgICBjb25zdCBSZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKTtcclxuICAgIGNvbnN0IGZvcm0gPSAobmV3IFJlbmRlcmVyKFxyXG4gICAgICB0aGlzLmZvcm1pb0VsZW1lbnQgPyB0aGlzLmZvcm1pb0VsZW1lbnQubmF0aXZlRWxlbWVudCA6IG51bGwsXHJcbiAgICAgIHRoaXMuZm9ybSxcclxuICAgICAgdGhpcy5nZXRSZW5kZXJlck9wdGlvbnMoKVxyXG4gICAgKSk7XHJcbiAgICByZXR1cm4gZm9ybS5pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHNldEZvcm0oZm9ybTogRm9ybWlvRm9ybSkge1xyXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcclxuICAgIGlmICh0aGlzLmZvcm1pbykge1xyXG4gICAgICB0aGlzLmZvcm1pby5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9ybS50aXRsZSkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5mb3JtLnRpdGxlO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZvcm0uY29tcG9uZW50cyAmJiB0aGlzLmZvcm0uY29tcG9uZW50c1swXSkge1xyXG4gICAgICB0aGlzLmxhYmVsID0gdGhpcy5mb3JtLmNvbXBvbmVudHNbMF0ubGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xlYXIgb3V0IHRoZSBlbGVtZW50IHRvIHJlbmRlciB0aGUgbmV3IGZvcm0uXHJcbiAgICBpZiAodGhpcy5mb3JtaW9FbGVtZW50ICYmIHRoaXMuZm9ybWlvRWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuZm9ybWlvRWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtaW8gPSB0aGlzLmNyZWF0ZVJlbmRlcmVyKCk7XHJcbiAgICB0aGlzLmZvcm1pby5zdWJtaXNzaW9uID0gdGhpcy5zdWJtaXNzaW9uO1xyXG4gICAgaWYgKHRoaXMucmVuZGVyT3B0aW9ucyAmJiB0aGlzLnJlbmRlck9wdGlvbnMudmFsaWRhdGVPbkluaXQpIHtcclxuICAgICAgdGhpcy5mb3JtaW8uc2V0VmFsdWUodGhpcy5zdWJtaXNzaW9uLCB7dmFsaWRhdGVPbkluaXQ6IHRydWV9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnVybCkge1xyXG4gICAgICB0aGlzLmZvcm1pby5zZXRVcmwodGhpcy51cmwsIHRoaXMuZm9ybWlvT3B0aW9ucyB8fCB7fSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zcmMpIHtcclxuICAgICAgdGhpcy5mb3JtaW8uc2V0VXJsKHRoaXMuc3JjLCB0aGlzLmZvcm1pb09wdGlvbnMgfHwge30pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtaW8ubm9zdWJtaXQgPSB0cnVlO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3ByZXZQYWdlJywgKGRhdGE6IGFueSkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMub25QcmV2UGFnZShkYXRhKSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ25leHRQYWdlJywgKGRhdGE6IGFueSkgPT4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMub25OZXh0UGFnZShkYXRhKSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ2NoYW5nZScsICh2YWx1ZTogYW55LCBmbGFnczogYW55LCBpc01vZGlmaWVkOiBib29sZWFuKSA9PiB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5vbkNoYW5nZSh2YWx1ZSwgZmxhZ3MsIGlzTW9kaWZpZWQpKSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncm93QWRkJywgKGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93QWRkLmVtaXQoY29tcG9uZW50KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3Jvd0FkZGVkJywgKGRhdGE6IGFueSwgY29tcG9uZW50OiBhbnkpID0+ICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5yb3dBZGRlZC5lbWl0KHtjb21wb25lbnQsIHJvdzogZGF0YX0pKSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncm93RWRpdCcsIChkYXRhOiBhbnksIHJvd0luZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93RWRpdC5lbWl0KHtjb21wb25lbnQsIHJvdzogZGF0YSwgcm93SW5kZXgsIGluZGV4fSkpKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdyb3dFZGl0ZWQnLCAoZGF0YTogYW55LCByb3dJbmRleDogbnVtYmVyLCBjb21wb25lbnQ6IGFueSkgPT4gIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnJvd0VkaXRlZC5lbWl0KHtjb21wb25lbnQsIHJvdzogZGF0YSwgcm93SW5kZXh9KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3Jvd0RlbGV0ZScsIChkYXRhOiBhbnksIHJvd0luZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93RGVsZXRlLmVtaXQoe2NvbXBvbmVudCwgcm93OiBkYXRhLCByb3dJbmRleCwgaW5kZXh9KSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3Jvd0NsaWNrJywgKHJvdzogYW55LCByb3dJbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyLGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93Q2xpY2suZW1pdCh7Y29tcG9uZW50LCByb3csIHJvd0luZGV4LCBpbmRleH0pKSk7XHJcbiAgICB0aGlzLmZvcm1pby5vbigncm93U2VsZWN0Q2hhbmdlJywgKHNlbGVjdGVkUm93czogYW55W10sIGNvbXBvbmVudDogYW55KSA9PiAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMucm93U2VsZWN0Q2hhbmdlLmVtaXQoe3NlbGVjdGVkUm93cywgY29tcG9uZW50fSkpKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdjdXN0b21FdmVudCcsIChldmVudDogYW55KSA9PlxyXG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5jdXN0b21FdmVudC5lbWl0KGV2ZW50KSlcclxuICAgICk7XHJcblxyXG4gICAgWydmaWxlVXBsb2FkaW5nU3RhcnQnLCAnZmlsZVVwbG9hZGluZ0VuZCddLmZvckVhY2goKGV2ZW50TmFtZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qgc3RhdHVzID0gISFpbmRleCA/ICdlbmQnIDogJ3N0YXJ0JztcclxuICAgICAgdGhpcy5mb3JtaW8ub24oZXZlbnROYW1lLCAoKSA9PlxyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmZpbGVVcGxvYWRpbmdTdGF0dXMuZW1pdChzdGF0dXMpKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3N1Ym1pdCcsIChzdWJtaXNzaW9uOiBhbnksIHNhdmVkOiBib29sZWFuKSA9PlxyXG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5zdWJtaXRGb3JtKHN1Ym1pc3Npb24sIHNhdmVkKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmZvcm1pby5vbignZXJyb3InLCAoZXJyOiBhbnkpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3VibWlzc2lvblN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMub25FcnJvcihlcnIpO1xyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5mb3JtaW8ub24oJ3JlbmRlcicsICgpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnJlbmRlci5lbWl0KCkpKTtcclxuICAgIHRoaXMuZm9ybWlvLm9uKCdmb3JtTG9hZCcsIChsb2FkZWRGb3JtOiBhbnkpID0+XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmZvcm1Mb2FkLmVtaXQobG9hZGVkRm9ybSkpXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmZvcm1pby5yZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVhZHkuZW1pdCh0aGlzKTtcclxuICAgICAgICB0aGlzLmZvcm1pb1JlYWR5UmVzb2x2ZSh0aGlzLmZvcm1pbyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybWlvLnN1Ym1pc3Npb25SZWFkeSkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtaW8uc3VibWlzc2lvblJlYWR5LnRoZW4oKHN1Ym1pc3Npb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXNzaW9uTG9hZC5lbWl0KHN1Ym1pc3Npb24pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuZm9ybWlvO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXplKCkge1xyXG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dHJhVGFncyA9IHRoaXMuY3VzdG9tVGFncyA/IHRoaXMuY3VzdG9tVGFncy50YWdzIDogW107XHJcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogRm9ybWlvT3B0aW9ucyA9IHtcclxuICAgICAgZXJyb3JzOiB7XHJcbiAgICAgICAgbWVzc2FnZTogJ1BsZWFzZSBmaXggdGhlIGZvbGxvd2luZyBlcnJvcnMgYmVmb3JlIHN1Ym1pdHRpbmcuJ1xyXG4gICAgICB9LFxyXG4gICAgICBhbGVydHM6IHtcclxuICAgICAgICBzdWJtaXRNZXNzYWdlOiAnU3VibWlzc2lvbiBDb21wbGV0ZS4nXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc2FibGVBbGVydHM6IGZhbHNlLFxyXG4gICAgICBob29rczoge1xyXG4gICAgICAgIGJlZm9yZVN1Ym1pdDogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBzYW5pdGl6ZUNvbmZpZzoge1xyXG4gICAgICAgIGFkZFRhZ3M6IGV4dHJhVGFnc1xyXG4gICAgICB9LFxyXG4gICAgICBhbGVydHNQb3NpdGlvbjogQWxlcnRzUG9zaXRpb24udG9wLFxyXG4gICAgfTtcclxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVBbGVydHMpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmFsZXJ0c1Bvc2l0aW9uID0gQWxlcnRzUG9zaXRpb24ubm9uZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBFdmFsdWF0b3Iubm9ldmFsID0gdGhpcy5ub2V2YWw7XHJcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5sYW5ndWFnZSkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMubGFuZ3VhZ2UgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8ubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2Uuc3Vic2NyaWJlKChsYW5nOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybWlvLmxhbmd1YWdlID0gbGFuZztcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcclxuICAgICAgdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgocmVmcmVzaDogRm9ybWlvUmVmcmVzaFZhbHVlKSA9PlxyXG4gICAgICAgIHRoaXMub25SZWZyZXNoKHJlZnJlc2gpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXJyb3IpIHtcclxuICAgICAgdGhpcy5lcnJvci5zdWJzY3JpYmUoKGVycjogYW55KSA9PiB0aGlzLm9uRXJyb3IoZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3VjY2Vzcykge1xyXG4gICAgICB0aGlzLnN1Y2Nlc3Muc3Vic2NyaWJlKChtZXNzYWdlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydCh7XHJcbiAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlIHx8IGdldCh0aGlzLm9wdGlvbnMsICdhbGVydHMuc3VibWl0TWVzc2FnZScpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNyYykge1xyXG4gICAgICBpZiAoIXRoaXMuc2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBGb3JtaW9TZXJ2aWNlKHRoaXMuc3JjKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuc2VydmljZS5sb2FkRm9ybSh7IHBhcmFtczogeyBsaXZlOiAxIH0gfSkuc3Vic2NyaWJlKFxyXG4gICAgICAgIChmb3JtOiBGb3JtaW9Gb3JtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZm9ybSAmJiBmb3JtLmNvbXBvbmVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0Rm9ybShmb3JtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gaWYgYSBzdWJtaXNzaW9uIGlzIGFsc28gcHJvdmlkZWQuXHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGlzRW1wdHkodGhpcy5zdWJtaXNzaW9uKSAmJlxyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmZvcm1pby5zdWJtaXNzaW9uSWRcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9hZFN1Ym1pc3Npb24oKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgKHN1Ym1pc3Npb246IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtaW8ub3B0aW9ucy5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pc3Npb24gPSB0aGlzLmZvcm1pby5zdWJtaXNzaW9uID0gc3VibWlzc2lvbjtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGVyciA9PiB0aGlzLm9uRXJyb3IoZXJyKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy51cmwgJiYgIXRoaXMuc2VydmljZSkge1xyXG4gICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgRm9ybWlvU2VydmljZSh0aGlzLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLmZvcm1pbykge1xyXG4gICAgICB0aGlzLmZvcm1pby5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvblJlZnJlc2gocmVmcmVzaDogRm9ybWlvUmVmcmVzaFZhbHVlKSB7XHJcbiAgICB0aGlzLmZvcm1pb1JlYWR5LnRoZW4oKCkgPT4ge1xyXG4gICAgICBpZiAocmVmcmVzaC5mb3JtKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8uc2V0Rm9ybShyZWZyZXNoLmZvcm0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlZnJlc2guc3VibWlzc2lvbikge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1pby5zZXRTdWJtaXNzaW9uKHJlZnJlc2guc3VibWlzc2lvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVmcmVzaC5zdWJtaXNzaW9uKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8uc2V0U3VibWlzc2lvbihyZWZyZXNoLnN1Ym1pc3Npb24pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAocmVmcmVzaC5wcm9wZXJ0eSkge1xyXG4gICAgICAgICAgY2FzZSAnc3VibWlzc2lvbic6XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybWlvLnN1Ym1pc3Npb24gPSByZWZyZXNoLnZhbHVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxyXG4gICAgICAgICAgICB0aGlzLmZvcm1pby5mb3JtID0gcmVmcmVzaC52YWx1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG4gICAgRXZhbHVhdG9yLm5vZXZhbCA9IHRoaXMubm9ldmFsO1xyXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZm9ybSAmJiBjaGFuZ2VzLmZvcm0uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldEZvcm0oY2hhbmdlcy5mb3JtLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZm9ybWlvUmVhZHkudGhlbigoKSA9PiB7XHJcbiAgICAgIGlmIChjaGFuZ2VzLnN1Ym1pc3Npb24gJiYgY2hhbmdlcy5zdWJtaXNzaW9uLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZm9ybWlvLnNldFN1Ym1pc3Npb24oY2hhbmdlcy5zdWJtaXNzaW9uLmN1cnJlbnRWYWx1ZSwge1xyXG4gICAgICAgICAgZnJvbVN1Ym1pc3Npb246ICFjaGFuZ2VzLnN1Ym1pc3Npb24uZmlyc3RDaGFuZ2VcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNoYW5nZXMuaGlkZUNvbXBvbmVudHMgJiYgY2hhbmdlcy5oaWRlQ29tcG9uZW50cy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICBjb25zdCBoaWRkZW5Db21wb25lbnRzID0gY2hhbmdlcy5oaWRlQ29tcG9uZW50cy5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8ub3B0aW9ucy5oaWRlID0gaGlkZGVuQ29tcG9uZW50cztcclxuICAgICAgICB0aGlzLmZvcm1pby5ldmVyeUNvbXBvbmVudCgoY29tcG9uZW50KSA9PiB7XHJcbiAgICAgICAgICBjb21wb25lbnQub3B0aW9ucy5oaWRlID0gaGlkZGVuQ29tcG9uZW50cztcclxuICAgICAgICAgIGlmIChoaWRkZW5Db21wb25lbnRzLmluY2x1ZGVzKGNvbXBvbmVudC5jb21wb25lbnQua2V5KSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uUHJldlBhZ2UoZGF0YTogYW55KSB7XHJcbiAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydHMoW10pO1xyXG4gICAgdGhpcy5wcmV2UGFnZS5lbWl0KGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgb25OZXh0UGFnZShkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMuYWxlcnRzLnNldEFsZXJ0cyhbXSk7XHJcbiAgICB0aGlzLm5leHRQYWdlLmVtaXQoZGF0YSk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChzdWJtaXNzaW9uOiBhbnksIHNhdmVkOiBib29sZWFuLCBub2VtaXQ/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnN1Ym1pdHRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VibWlzc2lvblN1Y2Nlc3MgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZm9ybWlvLnNldFZhbHVlKGZhc3RDbG9uZURlZXAoc3VibWlzc2lvbiksIHtcclxuICAgICAgbm9WYWxpZGF0ZTogdHJ1ZSxcclxuICAgICAgbm9DaGVjazogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHNhdmVkKSB7XHJcbiAgICAgIHRoaXMuZm9ybWlvLmVtaXQoJ3N1Ym1pdERvbmUnLCBzdWJtaXNzaW9uKTtcclxuICAgIH1cclxuICAgIGlmICghbm9lbWl0KSB7XHJcbiAgICAgIHRoaXMuc3VibWl0LmVtaXQoc3VibWlzc2lvbik7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuc3VjY2Vzcykge1xyXG4gICAgICB0aGlzLmFsZXJ0cy5zZXRBbGVydCh7XHJcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgIG1lc3NhZ2U6IGdldCh0aGlzLm9wdGlvbnMsICdhbGVydHMuc3VibWl0TWVzc2FnZScpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25FcnJvcihlcnI6IGFueSkge1xyXG4gICAgdGhpcy5hbGVydHMuc2V0QWxlcnRzKFtdKTtcclxuICAgIHRoaXMuc3VibWl0dGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoIWVycikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIGl0IGlzIGFuIGFycmF5LlxyXG4gICAgY29uc3QgZXJyb3JzID0gQXJyYXkuaXNBcnJheShlcnIpID8gZXJyIDogW2Vycl07XHJcblxyXG4gICAgLy8gRW1pdCB0aGVzZSBlcnJvcnMgYWdhaW4uXHJcbiAgICB0aGlzLmVycm9yQ2hhbmdlLmVtaXQoZXJyb3JzKTtcclxuXHJcbiAgICBpZiAoZXJyLnNpbGVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9ybWlvICYmIGVycm9ycy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5mb3JtaW8uZW1pdCgnc3VibWl0RXJyb3InLCBlcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIG9uZSBhbmQgc2V0IHRoZSBhbGVydHMgYXJyYXkuXHJcbiAgICBlcnJvcnMuZm9yRWFjaCgoZXJyb3I6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBwYXRocyxcclxuICAgICAgfSA9IGVycm9yXHJcbiAgICAgICAgPyBlcnJvci5kZXRhaWxzXHJcbiAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IuZGV0YWlscy5tYXAoKGRldGFpbCkgPT4gZGV0YWlsLm1lc3NhZ2UpLFxyXG4gICAgICAgICAgICBwYXRoczogZXJyb3IuZGV0YWlscy5tYXAoKGRldGFpbCkgPT4gZGV0YWlsLnBhdGgpLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgcGF0aHM6IGVycm9yLnBhdGggPyBbZXJyb3IucGF0aF0gOiBbXSxcclxuICAgICAgICAgIH1cclxuICAgICAgICA6IHtcclxuICAgICAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgICAgICAgcGF0aHM6IFtdLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICBsZXQgc2hvdWxkRXJyb3JEaXNwbGF5ID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmZvcm1pbykge1xyXG4gICAgICAgIHBhdGhzLmZvckVhY2goKHBhdGgsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmZvcm1pby5nZXRDb21wb25lbnQocGF0aCk7XHJcbiAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBBcnJheS5pc0FycmF5KGNvbXBvbmVudCkgPyBjb21wb25lbnQgOiBbY29tcG9uZW50XTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZVRleHQgPSBBcnJheS5pc0FycmF5KG1lc3NhZ2UpID8gbWVzc2FnZVtpbmRleF0gOiBtZXNzYWdlO1xyXG4gICAgICAgICAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXApID0+IGNvbXAuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZVRleHQsIHRydWUpKTtcclxuICAgICAgICAgICAgdGhpcy5hbGVydHMuYWRkQWxlcnQoe1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VbaW5kZXhdLFxyXG4gICAgICAgICAgICAgIGNvbXBvbmVudCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNob3VsZEVycm9yRGlzcGxheSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLlZQQVRfRU5BQkxFRCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciA9PT0nc3RyaW5nJyAmJiB0aGlzLmZvcm1pby5jb21wb25lbnRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybWlvLmNvbXBvbmVudHMuZm9yRWFjaCgoY29tcCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChjb21wICYmIGNvbXAudHlwZSAhPT0gJ2J1dHRvbicpIHtcclxuICAgICAgICAgICAgICAgIGNvbXAuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5ub0FsZXJ0cykge1xyXG4gICAgICAgICAgdGhpcy5mb3JtaW8uc2hvd0Vycm9ycygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNob3VsZEVycm9yRGlzcGxheSkge1xyXG4gICAgICAgIHRoaXMuYWxlcnRzLmFkZEFsZXJ0KHtcclxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxyXG4gICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgIGNvbXBvbmVudDogZXJyb3IuY29tcG9uZW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZvY3VzT25Db21wb25ldChrZXk6IGFueSkge1xyXG4gICAgaWYgKHRoaXMuZm9ybWlvKSB7XHJcbiAgICAgIHRoaXMuZm9ybWlvLmZvY3VzT25Db21wb25lbnQoa2V5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN1Ym1pdEV4ZWN1dGUoc3VibWlzc2lvbjogb2JqZWN0LCBzYXZlZCA9IGZhbHNlKSB7XHJcbiAgICBpZiAodGhpcy5zZXJ2aWNlICYmICF0aGlzLnVybCAmJiAhc2F2ZWQpIHtcclxuICAgICAgdGhpcy5zZXJ2aWNlXHJcbiAgICAgICAgLnNhdmVTdWJtaXNzaW9uKHN1Ym1pc3Npb24pXHJcbiAgICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAgIChzdWI6IHt9KSA9PiB0aGlzLm9uU3VibWl0KHN1YiwgdHJ1ZSksXHJcbiAgICAgICAgICBlcnIgPT4gdGhpcy5vbkVycm9yKGVycilcclxuICAgICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vblN1Ym1pdChzdWJtaXNzaW9uLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdWJtaXRGb3JtKHN1Ym1pc3Npb246IGFueSwgc2F2ZWQgPSBmYWxzZSkge1xyXG4gICAgLy8gS2VlcCBkb3VibGUgc3VibWl0cyBmcm9tIG9jY3VycmluZy4uLlxyXG4gICAgaWYgKHRoaXMuc3VibWl0dGluZykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmZvcm1pby5zZXRNZXRhZGF0YShzdWJtaXNzaW9uKTtcclxuICAgIHRoaXMuc3VibWlzc2lvblN1Y2Nlc3MgPSBmYWxzZTtcclxuICAgIHRoaXMuc3VibWl0dGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmJlZm9yZVN1Ym1pdC5lbWl0KHN1Ym1pc3Npb24pO1xyXG5cclxuICAgIC8vIGlmIHRoZXkgcHJvdmlkZSBhIGJlZm9yZVN1Ym1pdCBob29rLCB0aGVuIGFsbG93IHRoZW0gdG8gYWx0ZXIgdGhlIHN1Ym1pc3Npb24gYXN5bmNocm9ub3VzbHlcclxuICAgIC8vIG9yIGV2ZW4gcHJvdmlkZSBhIGN1c3RvbSBFcnJvciBtZXRob2QuXHJcbiAgICBjb25zdCBiZWZvcmVTdWJtaXQgPSBnZXQodGhpcy5vcHRpb25zLCAnaG9va3MuYmVmb3JlU3VibWl0Jyk7XHJcbiAgICBpZiAoYmVmb3JlU3VibWl0KSB7XHJcbiAgICAgIGJlZm9yZVN1Ym1pdChzdWJtaXNzaW9uLCAoZXJyOiBGb3JtaW9FcnJvciwgc3ViOiBvYmplY3QpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdWJtaXRFeGVjdXRlKHN1Yiwgc2F2ZWQpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3VibWl0RXhlY3V0ZShzdWJtaXNzaW9uLCBzYXZlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZSh2YWx1ZTogYW55LCBmbGFnczogYW55LCBpc01vZGlmaWVkOiBib29sZWFuKSB7XHJcbiAgICBpZiAodGhpcy53YXRjaFN1Ym1pc3Npb25FcnJvcnMgJiYgIXRoaXMuc3VibWlzc2lvblN1Y2Nlc3MpIHtcclxuICAgICAgY29uc3QgZXJyb3JzID0gZ2V0KHRoaXMsICdmb3JtaW8uZXJyb3JzJywgW10pO1xyXG4gICAgICBjb25zdCBhbGVydHMgPSBnZXQodGhpcywgJ2FsZXJ0cy5hbGVydHMnLCBbXSk7XHJcbiAgICAgIGNvbnN0IHN1Ym1pdHRlZCA9IGdldCh0aGlzLCAnZm9ybWlvLnN1Ym1pdHRlZCcsIGZhbHNlKTtcclxuICAgICAgaWYgKHN1Ym1pdHRlZCAmJiAoZXJyb3JzLmxlbmd0aCB8fCBhbGVydHMubGVuZ3RoKSkge1xyXG4gICAgICAgIHRoaXMub25FcnJvcihlcnJvcnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UuZW1pdCh7Li4udmFsdWUsIGZsYWdzLCBpc01vZGlmaWVkfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==