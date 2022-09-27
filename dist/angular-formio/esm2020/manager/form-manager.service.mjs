import { Injectable } from '@angular/core';
import { Formio } from 'formiojs';
import _intersection from 'lodash/intersection';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "./form-manager.config";
import * as i3 from "@formio/angular/auth";
export class FormManagerService {
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
FormManagerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerService, deps: [{ token: i1.FormioAppConfig }, { token: i2.FormManagerConfig }, { token: i3.FormioAuthService }], target: i0.ɵɵFactoryTarget.Injectable });
FormManagerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAppConfig }, { type: i2.FormManagerConfig }, { type: i3.FormioAuthService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tYW5hZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9tYW5hZ2VyL3NyYy9mb3JtLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJbEMsT0FBTyxhQUFhLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBR2hELE1BQU0sT0FBTyxrQkFBa0I7SUFZN0IsWUFDUyxTQUEwQixFQUMxQixNQUF5QixFQUN6QixJQUF1QjtRQUZ2QixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVB6QixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFVBQUssR0FBRyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO1FBTzFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUMzQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7U0FDekU7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2xCLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2xC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TSxDQUFDLENBQUM7Z0NBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3RFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQzdFOzRCQUNELElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxNQUFNLEVBQUU7Z0NBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQ3hFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzlFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzNFLElBQUksQ0FBQyxNQUFNLENB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Q0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUU7Z0JBQ3BDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7YUFDdEIsRUFBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDOzsrR0F2TFUsa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybWlvQXBwQ29uZmlnIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybU1hbmFnZXJDb25maWcgfSBmcm9tICcuL2Zvcm0tbWFuYWdlci5jb25maWcnO1xyXG5pbXBvcnQgeyBGb3JtaW8gfSBmcm9tICdmb3JtaW9qcyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFNlcnZpY2UgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXIvYXV0aCc7XHJcbmltcG9ydCBfZWFjaCBmcm9tICdsb2Rhc2gvZWFjaCc7XHJcbmltcG9ydCBfaW50ZXJzZWN0aW9uIGZyb20gJ2xvZGFzaC9pbnRlcnNlY3Rpb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybU1hbmFnZXJTZXJ2aWNlIHtcclxuICBwdWJsaWMgZm9ybWlvOiBGb3JtaW87XHJcbiAgcHVibGljIGFjY2VzczogYW55O1xyXG4gIHB1YmxpYyBhbGxBY2Nlc3NNYXA6IGFueTtcclxuICBwdWJsaWMgb3duQWNjZXNzTWFwOiBhbnk7XHJcbiAgcHVibGljIHJlYWR5OiBQcm9taXNlPGFueT47XHJcbiAgcHVibGljIGZvcm1SZWFkeTogUHJvbWlzZTxhbnk+O1xyXG4gIHB1YmxpYyBhY3Rpb25BbGxvd2VkOiBhbnk7XHJcbiAgcHVibGljIGZvcm0gPSBudWxsO1xyXG4gIHB1YmxpYyBmb3JtU3JjID0gJyc7XHJcbiAgcHVibGljIHBlcm1zID0ge2RlbGV0ZTogZmFsc2UsIGVkaXQ6IGZhbHNlfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgYXBwQ29uZmlnOiBGb3JtaW9BcHBDb25maWcsXHJcbiAgICBwdWJsaWMgY29uZmlnOiBGb3JtTWFuYWdlckNvbmZpZyxcclxuICAgIHB1YmxpYyBhdXRoOiBGb3JtaW9BdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgaWYgKHRoaXMuYXBwQ29uZmlnICYmIHRoaXMuYXBwQ29uZmlnLmFwcFVybCkge1xyXG4gICAgICBGb3JtaW8uc2V0QmFzZVVybCh0aGlzLmFwcENvbmZpZy5hcGlVcmwpO1xyXG4gICAgICBGb3JtaW8uc2V0UHJvamVjdFVybCh0aGlzLmFwcENvbmZpZy5hcHBVcmwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcignWW91IG11c3QgcHJvdmlkZSBhbiBBcHBDb25maWcgd2l0aGluIHlvdXIgYXBwbGljYXRpb24hJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbGxBY2Nlc3NNYXAgPSB7XHJcbiAgICAgICd1cGRhdGVfYWxsJzogJ2Zvcm1FZGl0JyxcclxuICAgICAgJ2RlbGV0ZV9hbGwnOiAnZm9ybURlbGV0ZSdcclxuICAgIH07XHJcbiAgICB0aGlzLm93bkFjY2Vzc01hcCA9IHtcclxuICAgICAgJ3VwZGF0ZV9vd24nOiAnZm9ybUVkaXQnLFxyXG4gICAgICAnZGVsZXRlX293bic6ICdmb3JtRGVsZXRlJ1xyXG4gICAgfTtcclxuICAgIHRoaXMuYWN0aW9uQWxsb3dlZCA9IChhY3Rpb24pID0+IHRoaXMuaXNBY3Rpb25BbGxvd2VkKGFjdGlvbik7XHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBpc0FjdGlvbkFsbG93ZWQoYWN0aW9uOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmFjY2Vzc1thY3Rpb25dO1xyXG4gIH1cclxuXHJcbiAgc2V0QWNjZXNzKCkge1xyXG4gICAgdGhpcy5hY2Nlc3MgPSB7XHJcbiAgICAgIGZvcm1DcmVhdGU6IHRydWUsXHJcbiAgICAgIGZvcm1WaWV3OiB0cnVlLFxyXG4gICAgICBmb3JtU3VibWlzc2lvbjogdHJ1ZSxcclxuICAgICAgZm9ybUVkaXQ6IHRydWUsXHJcbiAgICAgIGZvcm1QZXJtaXNzaW9uOiB0cnVlLFxyXG4gICAgICBmb3JtRGVsZXRlOiB0cnVlLFxyXG4gICAgICBwcm9qZWN0U2V0dGluZ3M6IHRydWUsXHJcbiAgICAgIHVzZXJNYW5hZ2VtZW50OiB0cnVlXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMuYXV0aCkge1xyXG4gICAgICB0aGlzLmFjY2VzcyA9IHtcclxuICAgICAgICBmb3JtQ3JlYXRlOiBmYWxzZSxcclxuICAgICAgICBmb3JtVmlldzogZmFsc2UsXHJcbiAgICAgICAgZm9ybVN1Ym1pc3Npb246IGZhbHNlLFxyXG4gICAgICAgIGZvcm1FZGl0OiBmYWxzZSxcclxuICAgICAgICBmb3JtUGVybWlzc2lvbjogZmFsc2UsXHJcbiAgICAgICAgZm9ybURlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgcHJvamVjdFNldHRpbmdzOiBmYWxzZSxcclxuICAgICAgICB1c2VyTWFuYWdlbWVudDogZmFsc2VcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5yZWFkeSA9IHRoaXMuYXV0aC5yZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgICBsZXQgYWRtaW5pc3RyYXRvciA9IHRoaXMuYXV0aC5yb2xlc1tcImFkbWluaXN0cmF0b3JcIl07XHJcbiAgICAgICAgbGV0IGZvcm1idWlsZGVyID0gdGhpcy5hdXRoLnJvbGVzW1wiZm9ybWJ1aWxkZXJcIl07XHJcbiAgICAgICAgbGV0IGZvcm1hZG1pbiA9IHRoaXMuYXV0aC5yb2xlc1tcImZvcm1hZG1pblwiXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0aC51c2VyICYmIHRoaXMuYXV0aC51c2VyLnJvbGVzKSB7XHJcbiAgICAgICAgICB0aGlzLmF1dGgudXNlci5yb2xlcy5mb3JFYWNoKChyb2xlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYWRtaW5pc3RyYXRvci5faWQgPT09IHJvbGVJZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1DcmVhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1WaWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGlzLmFjY2Vzcy5mb3JtU3VibWlzc2lvbj0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGlzLmFjY2Vzcy5mb3JtRWRpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5hY2Nlc3MuZm9ybVBlcm1pc3Npb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1EZWxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWNjZXNzLnByb2plY3RTZXR0aW5ncyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5hY2Nlc3MudXNlck1hbmFnZW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChmb3JtYWRtaW4uX2lkID09PSByb2xlSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1DcmVhdGUgPSB0aGlzLmF1dGguZm9ybUFjY2Vzcy5jcmVhdGVfYWxsLmluY2x1ZGVzKHJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2Vzcy5mb3JtRWRpdCA9IHRoaXMuYXV0aC5mb3JtQWNjZXNzLnVwZGF0ZV9hbGwuaW5jbHVkZXMocm9sZUlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1QZXJtaXNzaW9uID0gdGhpcy5hdXRoLmZvcm1BY2Nlc3MudXBkYXRlX2FsbC5pbmNsdWRlcyhyb2xlSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2Nlc3MuZm9ybURlbGV0ZSA9ICB0aGlzLmF1dGguZm9ybUFjY2Vzcy5kZWxldGVfYWxsLmluY2x1ZGVzKHJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2Vzcy5mb3JtVmlldyA9IHRoaXMuYXV0aC5mb3JtQWNjZXNzLnJlYWRfYWxsLmluY2x1ZGVzKHJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2Vzcy5mb3JtU3VibWlzc2lvbiA9IHRoaXMuYXV0aC5mb3JtQWNjZXNzLnJlYWRfYWxsLmluY2x1ZGVzKHJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChmb3JtYnVpbGRlci5faWQgPT09IHJvbGVJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2Nlc3MuZm9ybUNyZWF0ZSA9IHRoaXMuYXV0aC5mb3JtQWNjZXNzLmNyZWF0ZV9hbGwuaW5jbHVkZXMocm9sZUlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1FZGl0ID0gdGhpcy5hdXRoLmZvcm1BY2Nlc3MudXBkYXRlX2FsbC5pbmNsdWRlcyhyb2xlSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2Nlc3MuZm9ybVBlcm1pc3Npb24gPSB0aGlzLmF1dGguZm9ybUFjY2Vzcy51cGRhdGVfYWxsLmluY2x1ZGVzKHJvbGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY2Vzcy5mb3JtRGVsZXRlID0gIHRoaXMuYXV0aC5mb3JtQWNjZXNzLmRlbGV0ZV9hbGwuaW5jbHVkZXMocm9sZUlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzLmZvcm1WaWV3ID0gdGhpcy5hdXRoLmZvcm1BY2Nlc3MucmVhZF9hbGwuaW5jbHVkZXMocm9sZUlkKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlYWR5ID0gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0KHJvdXRlPzogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIGlmIChyb3V0ZSkge1xyXG4gICAgICByb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtaW8gPSBuZXcgRm9ybWlvKGAke3RoaXMuZm9ybWlvLmZvcm1zVXJsfS8ke3BhcmFtcy5pZH1gKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1pbyA9IG5ldyBGb3JtaW8odGhpcy5hcHBDb25maWcuYXBwVXJsKTtcclxuICAgICAgdGhpcy5zZXRBY2Nlc3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhhc0FjY2Vzcyhyb2xlcykge1xyXG4gICAgaWYgKCF0aGlzLmF1dGgudXNlcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gISFfaW50ZXJzZWN0aW9uKHJvbGVzLCB0aGlzLmF1dGgudXNlci5yb2xlcykubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgc2V0Rm9ybShmb3JtOiBhbnkpIHtcclxuICAgIHRoaXMuZm9ybSA9IGZvcm07XHJcbiAgICB0aGlzLmZvcm1TcmMgPSB0aGlzLmFwcENvbmZpZy5hcHBVcmwgKyAnLycgKyBmb3JtLnBhdGg7XHJcbiAgICBpZiAoZm9ybS5hY2Nlc3MpIHtcclxuICAgICAgLy8gQ2hlY2sgaWYgdGhleSBoYXZlIGFjY2VzcyBoZXJlLlxyXG4gICAgICBmb3JtLmFjY2Vzcy5mb3JFYWNoKGFjY2VzcyA9PiB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGFsbCBhY2Nlc3MuXHJcbiAgICAgICAgaWYgKHRoaXMuYWxsQWNjZXNzTWFwW2FjY2Vzcy50eXBlXSAmJiAhdGhpcy5hY2Nlc3NbdGhpcy5hbGxBY2Nlc3NNYXBbYWNjZXNzLnR5cGVdXSkge1xyXG4gICAgICAgICAgdGhpcy5hY2Nlc3NbdGhpcy5hbGxBY2Nlc3NNYXBbYWNjZXNzLnR5cGVdXSA9IHRoaXMuaGFzQWNjZXNzKGFjY2Vzcy5yb2xlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Igb3duIGFjY2Vzcy5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLmF1dGggJiYgdGhpcy5hdXRoLnVzZXIgJiZcclxuICAgICAgICAgIChmb3JtLl9pZCA9PT0gdGhpcy5hdXRoLnVzZXIuX2lkKSAmJlxyXG4gICAgICAgICAgdGhpcy5vd25BY2Nlc3NNYXBbYWNjZXNzLnR5cGVdICYmXHJcbiAgICAgICAgICAhdGhpcy5hY2Nlc3NbdGhpcy5vd25BY2Nlc3NNYXBbYWNjZXNzLnR5cGVdXVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5hY2Nlc3NbdGhpcy5vd25BY2Nlc3NNYXBbYWNjZXNzLnR5cGVdXSA9IHRoaXMuaGFzQWNjZXNzKGFjY2Vzcy5yb2xlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtO1xyXG4gIH1cclxuXHJcbiAgbG9hZEZvcm0oKSB7XHJcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xyXG4gICAgdGhpcy5mb3JtUmVhZHkgPSB0aGlzLmZvcm1pby5sb2FkRm9ybSgpLnRoZW4oZm9ybSA9PiB0aGlzLnNldEZvcm0oZm9ybSkpO1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybVJlYWR5O1xyXG4gIH1cclxuXHJcbiAgc2V0U3VibWlzc2lvbihyb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICByb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgdGhpcy5mb3JtaW8gPSBuZXcgRm9ybWlvKGAke3RoaXMuZm9ybWlvLnN1Ym1pc3Npb25zVXJsfS8ke3BhcmFtcy5pZH1gKTtcclxuICAgICAgICByZXNvbHZlKHRoaXMuZm9ybWlvKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN1Ym1pc3Npb25Mb2FkZWQoc3VibWlzc2lvbjogYW55KSB7XHJcbiAgICB0aGlzLmF1dGgucmVhZHkudGhlbigoKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9ybWlvLnVzZXJQZXJtaXNzaW9ucyh0aGlzLmF1dGgudXNlciwgdGhpcy5mb3JtLCBzdWJtaXNzaW9uKS50aGVuKChwZXJtcykgPT4ge1xyXG4gICAgICAgIHRoaXMucGVybXMuZGVsZXRlID0gcGVybXMuZGVsZXRlO1xyXG4gICAgICAgIHRoaXMucGVybXMuZWRpdCA9IHBlcm1zLmVkaXQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkRm9ybXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5mb3JtaW8ubG9hZEZvcm1zKHtwYXJhbXM6IHtcclxuICAgICAgdGFnczogdGhpcy5jb25maWcudGFnXHJcbiAgICB9fSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVGb3JtKGZvcm06IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybWlvLmNyZWF0ZWZvcm0oZm9ybSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==