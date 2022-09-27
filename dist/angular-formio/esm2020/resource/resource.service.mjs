import { EventEmitter, Injectable, Optional } from '@angular/core';
import { FormioPromiseService } from '@formio/angular';
import { FormioAlerts } from '@formio/angular';
import Promise from 'native-promise-only';
import { Formio, Utils } from 'formiojs';
import _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "./resource.config";
import * as i3 from "./resources.service";
export class FormioResourceService {
    constructor(appConfig, config, resourcesService, appRef) {
        this.appConfig = appConfig;
        this.config = config;
        this.resourcesService = resourcesService;
        this.appRef = appRef;
        this.initialized = false;
        this.isLoading = true;
        this.alerts = new FormioAlerts();
        this.refresh = new EventEmitter();
        this.formLoaded = new Promise((resolve, reject) => {
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
            return Promise.resolve([]);
        }
        if (!this.resourcesService) {
            console.warn('You must provide the FormioResources within your application to use nested resources.');
            return Promise.resolve([]);
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
            return Promise.all(_parentsLoaded).then((parents) => {
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
FormioResourceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceService, deps: [{ token: i1.FormioAppConfig }, { token: i2.FormioResourceConfig }, { token: i3.FormioResources, optional: true }, { token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
FormioResourceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResourceService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAppConfig }, { type: i2.FormioResourceConfig }, { type: i3.FormioResources, decorators: [{
                    type: Optional
                }] }, { type: i0.ApplicationRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXItZm9ybWlvL3Jlc291cmNlL3NyYy9yZXNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBa0IsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9DLE9BQU8sT0FBTyxNQUFNLHFCQUFxQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFHdkIsTUFBTSxPQUFPLHFCQUFxQjtJQXNCaEMsWUFDUyxTQUEwQixFQUMxQixNQUE0QixFQUNoQixnQkFBaUMsRUFDN0MsTUFBc0I7UUFIdEIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUM3QyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQXpCeEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUEyQnpCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxNQUFXLEVBQUUsRUFBRTtZQUMxRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUMzQixJQUFJLENB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RyxDQUFDLENBQ2hDO2FBQ0EsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7a0hBek5VLHFCQUFxQjtzSEFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVU7OzBCQTBCTixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNvdXJjZUNvbmZpZyB9IGZyb20gJy4vcmVzb3VyY2UuY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvUmVzb3VyY2VzIH0gZnJvbSAnLi9yZXNvdXJjZXMuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1pb1Byb21pc2VTZXJ2aWNlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvQWxlcnRzIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvQXBwQ29uZmlnIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybWlvUmVmcmVzaFZhbHVlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IFByb21pc2UgZnJvbSAnbmF0aXZlLXByb21pc2Utb25seSc7XHJcbmltcG9ydCB7IEZvcm1pbywgVXRpbHMgfSBmcm9tICdmb3JtaW9qcyc7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9SZXNvdXJjZVNlcnZpY2Uge1xyXG4gIHB1YmxpYyBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBmb3JtOiBhbnk7XHJcbiAgcHVibGljIGFsZXJ0czogRm9ybWlvQWxlcnRzO1xyXG4gIHB1YmxpYyByZXNvdXJjZTogYW55O1xyXG4gIHB1YmxpYyByZXNvdXJjZVVybD86IHN0cmluZztcclxuICBwdWJsaWMgZm9ybVVybDogc3RyaW5nO1xyXG4gIHB1YmxpYyBmb3JtRm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZTtcclxuICBwdWJsaWMgZm9ybWlvOiBGb3JtaW9Qcm9taXNlU2VydmljZTtcclxuICBwdWJsaWMgcmVmcmVzaDogRXZlbnRFbWl0dGVyPEZvcm1pb1JlZnJlc2hWYWx1ZT47XHJcblxyXG4gIHB1YmxpYyByZXNvdXJjZUxvYWRpbmc/OiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIHJlc291cmNlTG9hZGVkPzogUHJvbWlzZTxhbnk+O1xyXG4gIHB1YmxpYyByZXNvdXJjZUlkPzogc3RyaW5nO1xyXG4gIHB1YmxpYyByZXNvdXJjZXM6IGFueTtcclxuXHJcbiAgcHVibGljIGZvcm1Mb2FkaW5nPzogUHJvbWlzZTxhbnk+O1xyXG4gIHB1YmxpYyBmb3JtTG9hZGVkOiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIGZvcm1SZXNvbHZlOiBhbnk7XHJcbiAgcHVibGljIGZvcm1SZWplY3Q6IGFueTtcclxuICBwdWJsaWMgaXNMb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBhcHBDb25maWc6IEZvcm1pb0FwcENvbmZpZyxcclxuICAgIHB1YmxpYyBjb25maWc6IEZvcm1pb1Jlc291cmNlQ29uZmlnLFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIHJlc291cmNlc1NlcnZpY2U6IEZvcm1pb1Jlc291cmNlcyxcclxuICAgIHB1YmxpYyBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICkge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5hbGVydHMgPSBuZXcgRm9ybWlvQWxlcnRzKCk7XHJcbiAgICB0aGlzLnJlZnJlc2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmZvcm1Mb2FkZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZTogYW55LCByZWplY3Q6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLmZvcm1SZXNvbHZlID0gcmVzb2x2ZTtcclxuICAgICAgdGhpcy5mb3JtUmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemUoKSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ0Zvcm1pb1Jlc291cmNlU2VydmljZS5pbml0aWFsaXplKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4nKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmFwcENvbmZpZyAmJiB0aGlzLmFwcENvbmZpZy5hcHBVcmwpIHtcclxuICAgICAgRm9ybWlvLnNldEJhc2VVcmwodGhpcy5hcHBDb25maWcuYXBpVXJsKTtcclxuICAgICAgRm9ybWlvLnNldFByb2plY3RVcmwodGhpcy5hcHBDb25maWcuYXBwVXJsKTtcclxuICAgICAgRm9ybWlvLmZvcm1Pbmx5ID0gdGhpcy5hcHBDb25maWcuZm9ybU9ubHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdZb3UgbXVzdCBwcm92aWRlIGFuIEFwcENvbmZpZyB3aXRoaW4geW91ciBhcHBsaWNhdGlvbiEnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgdGhlIGZvcm0gdXJsIGFuZCBsb2FkIHRoZSByZXNvdXJjZXMuXHJcbiAgICB0aGlzLmZvcm1VcmwgPSB0aGlzLmFwcENvbmZpZy5hcHBVcmwgKyAnLycgKyB0aGlzLmNvbmZpZy5mb3JtO1xyXG4gICAgdGhpcy5yZXNvdXJjZSA9IHsgZGF0YToge30gfTtcclxuXHJcbiAgICAvLyBBZGQgdGhpcyByZXNvdXJjZSBzZXJ2aWNlIHRvIHRoZSBsaXN0IG9mIGFsbCByZXNvdXJjZXMgaW4gY29udGV4dC5cclxuICAgIGlmICh0aGlzLnJlc291cmNlc1NlcnZpY2UpIHtcclxuICAgICAgdGhpcy5yZXNvdXJjZXMgPSB0aGlzLnJlc291cmNlc1NlcnZpY2UucmVzb3VyY2VzO1xyXG4gICAgICB0aGlzLnJlc291cmNlc1t0aGlzLmNvbmZpZy5uYW1lXSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubG9hZEZvcm0oKTtcclxuICB9XHJcblxyXG4gIG9uRXJyb3IoZXJyb3I6IGFueSkge1xyXG4gICAgdGhpcy5hbGVydHMuc2V0QWxlcnQoe1xyXG4gICAgICB0eXBlOiAnZGFuZ2VyJyxcclxuICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB8fCBlcnJvclxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5yZXNvdXJjZXNTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMucmVzb3VyY2VzU2VydmljZS5lcnJvci5lbWl0KGVycm9yKTtcclxuICAgIH1cclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxuXHJcbiAgb25Gb3JtRXJyb3IoZXJyOiBhbnkpIHtcclxuICAgIHRoaXMuZm9ybVJlamVjdChlcnIpO1xyXG4gICAgdGhpcy5vbkVycm9yKGVycik7XHJcbiAgfVxyXG5cclxuICBzZXRDb250ZXh0KHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgdGhpcy5yZXNvdXJjZUlkID0gcm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5yZXNvdXJjZSA9IHsgZGF0YToge30gfTtcclxuICAgIHRoaXMucmVzb3VyY2VVcmwgPSB0aGlzLmFwcENvbmZpZy5hcHBVcmwgKyAnLycgKyB0aGlzLmNvbmZpZy5mb3JtO1xyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VJZCkge1xyXG4gICAgICB0aGlzLnJlc291cmNlVXJsICs9ICcvc3VibWlzc2lvbi8nICsgdGhpcy5yZXNvdXJjZUlkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5mb3JtaW8gPSBuZXcgRm9ybWlvUHJvbWlzZVNlcnZpY2UodGhpcy5yZXNvdXJjZVVybCk7XHJcbiAgICBpZiAodGhpcy5yZXNvdXJjZXNTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMucmVzb3VyY2VzW3RoaXMuY29uZmlnLm5hbWVdID0gdGhpcztcclxuICAgIH1cclxuICAgIHRoaXMubG9hZFBhcmVudHMoKTtcclxuICB9XHJcblxyXG4gIGxvYWRGb3JtKCkge1xyXG4gICAgdGhpcy5mb3JtRm9ybWlvID0gbmV3IEZvcm1pb1Byb21pc2VTZXJ2aWNlKHRoaXMuZm9ybVVybCk7XHJcbiAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmZvcm1Mb2FkaW5nID0gdGhpcy5mb3JtRm9ybWlvXHJcbiAgICAgIC5sb2FkRm9ybSgpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChmb3JtOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XHJcbiAgICAgICAgICB0aGlzLmZvcm1SZXNvbHZlKGZvcm0pO1xyXG4gICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMubG9hZFBhcmVudHMoKTtcclxuICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycjogYW55KSA9PiB0aGlzLm9uRm9ybUVycm9yKGVycilcclxuICAgICAgKVxyXG4gICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB0aGlzLm9uRm9ybUVycm9yKGVycikpO1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybUxvYWRpbmc7XHJcbiAgfVxyXG5cclxuICBsb2FkUGFyZW50cygpIHtcclxuICAgIGlmICghdGhpcy5jb25maWcucGFyZW50cyB8fCAhdGhpcy5jb25maWcucGFyZW50cy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVzb3VyY2VzU2VydmljZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgJ1lvdSBtdXN0IHByb3ZpZGUgdGhlIEZvcm1pb1Jlc291cmNlcyB3aXRoaW4geW91ciBhcHBsaWNhdGlvbiB0byB1c2UgbmVzdGVkIHJlc291cmNlcy4nXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZm9ybUxvYWRpbmcudGhlbigoZm9ybSkgPT4ge1xyXG4gICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIGxpc3Qgb2YgcGFyZW50cy5cclxuICAgICAgY29uc3QgX3BhcmVudHNMb2FkZWQ6IEFycmF5PFByb21pc2U8YW55Pj4gPSBbXTtcclxuICAgICAgdGhpcy5jb25maWcucGFyZW50cy5mb3JFYWNoKChwYXJlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc291cmNlTmFtZSA9IHBhcmVudC5yZXNvdXJjZSB8fCBwYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgcmVzb3VyY2VGaWVsZCA9IHBhcmVudC5maWVsZCB8fCBwYXJlbnQ7XHJcbiAgICAgICAgY29uc3QgZmlsdGVyUmVzb3VyY2UgPSBwYXJlbnQuaGFzT3duUHJvcGVydHkoJ2ZpbHRlcicpID8gcGFyZW50LmZpbHRlciA6IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHJlc291cmNlTmFtZSkgJiYgdGhpcy5yZXNvdXJjZXNbcmVzb3VyY2VOYW1lXS5yZXNvdXJjZUxvYWRlZCkge1xyXG4gICAgICAgICAgX3BhcmVudHNMb2FkZWQucHVzaChcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXNbcmVzb3VyY2VOYW1lXS5yZXNvdXJjZUxvYWRlZC50aGVuKChyZXNvdXJjZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHBhcmVudFBhdGggPSAnJztcclxuICAgICAgICAgICAgICBVdGlscy5lYWNoQ29tcG9uZW50KGZvcm0uY29tcG9uZW50cywgKGNvbXBvbmVudCwgcGF0aCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5rZXkgPT09IHJlc291cmNlRmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jbGVhck9uSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICBfLnNldCh0aGlzLnJlc291cmNlLmRhdGEsIHBhdGgsIHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgcGFyZW50UGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBwYXJlbnRQYXRoLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXJSZXNvdXJjZSxcclxuICAgICAgICAgICAgICAgIHJlc291cmNlXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFdoZW4gYWxsIHRoZSBwYXJlbnRzIGhhdmUgbG9hZGVkLCBlbWl0IHRoYXQgdG8gdGhlIG9uUGFyZW50cyBlbWl0dGVyLlxyXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoX3BhcmVudHNMb2FkZWQpLnRoZW4oKHBhcmVudHM6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaC5lbWl0KHtcclxuICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICBzdWJtaXNzaW9uOiB0aGlzLnJlc291cmNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudHM7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pc3Npb25FcnJvcihlcnI6IGFueSkge1xyXG4gICAgdGhpcy5vbkVycm9yKGVycik7XHJcbiAgfVxyXG5cclxuICBsb2FkUmVzb3VyY2Uocm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICB0aGlzLnNldENvbnRleHQocm91dGUpO1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5yZXNvdXJjZUxvYWRpbmcgPSB0aGlzLnJlc291cmNlTG9hZGVkID0gdGhpcy5mb3JtaW9cclxuICAgICAgLmxvYWRTdWJtaXNzaW9uKG51bGwsIHtpZ25vcmVDYWNoZTogdHJ1ZX0pXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChyZXNvdXJjZTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlc291cmNlID0gcmVzb3VyY2U7XHJcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoLmVtaXQoe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eTogJ3N1Ym1pc3Npb24nLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5yZXNvdXJjZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyOiBhbnkpID0+IHRoaXMub25TdWJtaXNzaW9uRXJyb3IoZXJyKVxyXG4gICAgICApXHJcbiAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHRoaXMub25TdWJtaXNzaW9uRXJyb3IoZXJyKSk7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUxvYWRpbmc7XHJcbiAgfVxyXG5cclxuICBzYXZlKHJlc291cmNlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZvcm1pbyA9IHJlc291cmNlLl9pZCA/IHRoaXMuZm9ybWlvIDogdGhpcy5mb3JtRm9ybWlvO1xyXG4gICAgcmV0dXJuIGZvcm1pb1xyXG4gICAgICAuc2F2ZVN1Ym1pc3Npb24ocmVzb3VyY2UpXHJcbiAgICAgIC50aGVuKFxyXG4gICAgICAgIChzYXZlZDogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlc291cmNlID0gc2F2ZWQ7XHJcbiAgICAgICAgICByZXR1cm4gc2F2ZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyOiBhbnkpID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gdGhpcy5vbkVycm9yKGVycikpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvXHJcbiAgICAgIC5kZWxldGVTdWJtaXNzaW9uKClcclxuICAgICAgLnRoZW4oXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyOiBhbnkpID0+IHRoaXMub25FcnJvcihlcnIpXHJcbiAgICAgIClcclxuICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4gdGhpcy5vbkVycm9yKGVycikpO1xyXG4gIH1cclxufVxyXG4iXX0=