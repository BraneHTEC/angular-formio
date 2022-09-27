import { EventEmitter, Injectable } from '@angular/core';
import { get, each } from 'lodash';
import { Formio } from 'formiojs';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular";
import * as i2 from "./auth.config";
export class FormioAuthService {
    constructor(appConfig, config) {
        this.appConfig = appConfig;
        this.config = config;
        this.authenticated = false;
        this.formAccess = {};
        this.submissionAccess = {};
        this.is = {};
        this.user = null;
        if (this.appConfig && this.appConfig.appUrl) {
            Formio.setBaseUrl(this.appConfig.apiUrl);
            Formio.setProjectUrl(this.appConfig.appUrl);
            Formio.formOnly = !!this.appConfig.formOnly;
        }
        else {
            console.error('You must provide an AppConfig within your application!');
        }
        this.loginForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'login.form', 'user/login');
        this.registerForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'register.form', 'user/register');
        this.resetPassForm =
            this.appConfig.appUrl +
                '/' +
                get(this.config, 'register.form', 'resetpass');
        this.onLogin = new EventEmitter();
        this.onLogout = new EventEmitter();
        this.onRegister = new EventEmitter();
        this.onUser = new EventEmitter();
        this.onError = new EventEmitter();
        this.ready = new Promise((resolve, reject) => {
            this.readyResolve = resolve;
            this.readyReject = reject;
        });
        // Register for the core events.
        Formio.events.on('formio.badToken', () => this.logoutError());
        Formio.events.on('formio.sessionExpired', () => this.logoutError());
        if (!this.config.delayAuth) {
            this.init();
        }
    }
    onLoginSubmit(submission) {
        this.setUser(submission);
        this.onLogin.emit(submission);
    }
    onRegisterSubmit(submission) {
        this.setUser(submission);
        this.onRegister.emit(submission);
    }
    onResetPassSubmit(submission) {
        this.onResetPass.emit(submission);
    }
    init() {
        this.projectReady = Formio.makeStaticRequest(this.appConfig.appUrl).then((project) => {
            each(project.access, (access) => {
                this.formAccess[access.type] = access.roles;
            });
        }, () => {
            this.formAccess = {};
            return null;
        });
        // Get the access for this project.
        this.accessReady = Formio.makeStaticRequest(this.appConfig.appUrl + '/access').then((access) => {
            each(access.forms, (form) => {
                this.submissionAccess[form.name] = {};
                form.submissionAccess.forEach((subAccess) => {
                    this.submissionAccess[form.name][subAccess.type] = subAccess.roles;
                });
            });
            this.roles = access.roles;
            return access;
        }, () => {
            this.roles = {};
            return null;
        });
        let currentUserPromise;
        if (this.config.oauth) {
            // Make a fix to the hash to remove starting "/" that angular might put there.
            if (window.location.hash && window.location.hash.match(/^#\/access_token/)) {
                history.pushState(null, null, window.location.hash.replace(/^#\/access_token/, '#access_token'));
            }
            // Initiate the SSO if they provide oauth settings.
            currentUserPromise = Formio.ssoInit(this.config.oauth.type, this.config.oauth.options);
        }
        else {
            currentUserPromise = Formio.currentUser();
        }
        this.userReady = currentUserPromise.then((user) => {
            this.setUser(user);
            return user;
        });
        // Trigger we are redy when all promises have resolved.
        if (this.accessReady) {
            this.accessReady
                .then(() => this.projectReady)
                .then(() => this.userReady)
                .then(() => this.readyResolve(true))
                .catch((err) => this.readyReject(err));
        }
    }
    setUser(user) {
        const namespace = Formio.namespace || 'formio';
        if (user) {
            this.user = user;
            localStorage.setItem(`${namespace}AppUser`, JSON.stringify(user));
            this.setUserRoles();
        }
        else {
            this.user = null;
            this.is = {};
            localStorage.removeItem(`${namespace}AppUser`);
            Formio.clearCache();
            Formio.setUser(null);
        }
        this.authenticated = !!Formio.getToken();
        this.onUser.emit(this.user);
    }
    setUserRoles() {
        if (this.accessReady) {
            this.accessReady.then(() => {
                each(this.roles, (role, roleName) => {
                    if (this.user.roles.indexOf(role._id) !== -1) {
                        this.is[roleName] = true;
                    }
                });
            });
        }
    }
    logoutError() {
        this.setUser(null);
        const namespace = Formio.namespace || 'formio';
        localStorage.removeItem(`${namespace}Token`);
        this.onError.emit();
    }
    logout() {
        this.setUser(null);
        const namespace = Formio.namespace || 'formio';
        localStorage.removeItem(`${namespace}Token`);
        Formio.logout()
            .then(() => this.onLogout.emit())
            .catch(() => this.logoutError());
    }
}
FormioAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthService, deps: [{ token: i1.FormioAppConfig }, { token: i2.FormioAuthConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FormioAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.FormioAppConfig }, { type: i2.FormioAuthConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1mb3JtaW8vYXV0aC9zcmMvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFHbEMsTUFBTSxPQUFPLGlCQUFpQjtJQTRCNUIsWUFDUyxTQUEwQixFQUMxQixNQUF3QjtRQUR4QixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQTVCMUIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFxQnRCLGVBQVUsR0FBUSxFQUFFLENBQUM7UUFDckIscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBRTNCLE9BQUUsR0FBUSxFQUFFLENBQUM7UUFNbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUN6RTtRQUVELElBQUksQ0FBQyxTQUFTO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FB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QUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUM7UUFDL0MsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsT0FBTyxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLE1BQU0sRUFBRTthQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs4R0FoTVUsaUJBQWlCO2tIQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhDb25maWcgfSBmcm9tICcuL2F1dGguY29uZmlnJztcclxuaW1wb3J0IHsgRm9ybWlvQXBwQ29uZmlnIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuaW1wb3J0IHsgZ2V0LCBlYWNoIH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgRm9ybWlvIH0gZnJvbSAnZm9ybWlvanMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvQXV0aFNlcnZpY2Uge1xyXG4gIHB1YmxpYyB1c2VyOiBhbnk7XHJcbiAgcHVibGljIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIGxvZ2luRm9ybTogc3RyaW5nO1xyXG4gIHB1YmxpYyBvbkxvZ2luOiBFdmVudEVtaXR0ZXI8b2JqZWN0PjtcclxuICBwdWJsaWMgb25Mb2dvdXQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+O1xyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJGb3JtOiBzdHJpbmc7XHJcbiAgcHVibGljIG9uUmVnaXN0ZXI6IEV2ZW50RW1pdHRlcjxvYmplY3Q+O1xyXG4gIHB1YmxpYyBvblVzZXI6IEV2ZW50RW1pdHRlcjxvYmplY3Q+O1xyXG4gIHB1YmxpYyBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PjtcclxuXHJcbiAgcHVibGljIHJlc2V0UGFzc0Zvcm06IHN0cmluZztcclxuICBwdWJsaWMgb25SZXNldFBhc3M6IEV2ZW50RW1pdHRlcjxvYmplY3Q+O1xyXG5cclxuICBwdWJsaWMgcmVhZHk6IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgcHVibGljIHJlYWR5UmVzb2x2ZTogYW55O1xyXG4gIHB1YmxpYyByZWFkeVJlamVjdDogYW55O1xyXG5cclxuICBwdWJsaWMgcHJvamVjdFJlYWR5PzogUHJvbWlzZTxhbnk+O1xyXG4gIHB1YmxpYyBhY2Nlc3NSZWFkeT86IFByb21pc2U8YW55PjtcclxuICBwdWJsaWMgdXNlclJlYWR5PzogUHJvbWlzZTxhbnk+O1xyXG4gIHB1YmxpYyBmb3JtQWNjZXNzOiBhbnkgPSB7fTtcclxuICBwdWJsaWMgc3VibWlzc2lvbkFjY2VzczogYW55ID0ge307XHJcbiAgcHVibGljIHJvbGVzOiBhbnk7XHJcbiAgcHVibGljIGlzOiBhbnkgPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgYXBwQ29uZmlnOiBGb3JtaW9BcHBDb25maWcsXHJcbiAgICBwdWJsaWMgY29uZmlnOiBGb3JtaW9BdXRoQ29uZmlnXHJcbiAgKSB7XHJcbiAgICB0aGlzLnVzZXIgPSBudWxsO1xyXG5cclxuICAgIGlmICh0aGlzLmFwcENvbmZpZyAmJiB0aGlzLmFwcENvbmZpZy5hcHBVcmwpIHtcclxuICAgICAgRm9ybWlvLnNldEJhc2VVcmwodGhpcy5hcHBDb25maWcuYXBpVXJsKTtcclxuICAgICAgRm9ybWlvLnNldFByb2plY3RVcmwodGhpcy5hcHBDb25maWcuYXBwVXJsKTtcclxuICAgICAgRm9ybWlvLmZvcm1Pbmx5ID0gISF0aGlzLmFwcENvbmZpZy5mb3JtT25seTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgYW4gQXBwQ29uZmlnIHdpdGhpbiB5b3VyIGFwcGxpY2F0aW9uIScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9naW5Gb3JtID1cclxuICAgICAgdGhpcy5hcHBDb25maWcuYXBwVXJsICtcclxuICAgICAgJy8nICtcclxuICAgICAgZ2V0KHRoaXMuY29uZmlnLCAnbG9naW4uZm9ybScsICd1c2VyL2xvZ2luJyk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyRm9ybSA9XHJcbiAgICAgIHRoaXMuYXBwQ29uZmlnLmFwcFVybCArXHJcbiAgICAgICcvJyArXHJcbiAgICAgIGdldCh0aGlzLmNvbmZpZywgJ3JlZ2lzdGVyLmZvcm0nLCAndXNlci9yZWdpc3RlcicpO1xyXG4gICAgdGhpcy5yZXNldFBhc3NGb3JtID1cclxuICAgICAgdGhpcy5hcHBDb25maWcuYXBwVXJsICtcclxuICAgICAgJy8nICtcclxuICAgICAgZ2V0KHRoaXMuY29uZmlnLCAncmVnaXN0ZXIuZm9ybScsICdyZXNldHBhc3MnKTtcclxuICAgIHRoaXMub25Mb2dpbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMub25Mb2dvdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9uUmVnaXN0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9uVXNlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMub25FcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICB0aGlzLnJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmU6IGFueSwgcmVqZWN0OiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5yZWFkeVJlc29sdmUgPSByZXNvbHZlO1xyXG4gICAgICB0aGlzLnJlYWR5UmVqZWN0ID0gcmVqZWN0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVnaXN0ZXIgZm9yIHRoZSBjb3JlIGV2ZW50cy5cclxuICAgIEZvcm1pby5ldmVudHMub24oJ2Zvcm1pby5iYWRUb2tlbicsICgpID0+IHRoaXMubG9nb3V0RXJyb3IoKSk7XHJcbiAgICBGb3JtaW8uZXZlbnRzLm9uKCdmb3JtaW8uc2Vzc2lvbkV4cGlyZWQnLCAoKSA9PiB0aGlzLmxvZ291dEVycm9yKCkpO1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5kZWxheUF1dGgpIHtcclxuICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkxvZ2luU3VibWl0KHN1Ym1pc3Npb246IG9iamVjdCkge1xyXG4gICAgdGhpcy5zZXRVc2VyKHN1Ym1pc3Npb24pO1xyXG4gICAgdGhpcy5vbkxvZ2luLmVtaXQoc3VibWlzc2lvbik7XHJcbiAgfVxyXG5cclxuICBvblJlZ2lzdGVyU3VibWl0KHN1Ym1pc3Npb246IG9iamVjdCkge1xyXG4gICAgdGhpcy5zZXRVc2VyKHN1Ym1pc3Npb24pO1xyXG4gICAgdGhpcy5vblJlZ2lzdGVyLmVtaXQoc3VibWlzc2lvbik7XHJcbiAgfVxyXG5cclxuICBvblJlc2V0UGFzc1N1Ym1pdChzdWJtaXNzaW9uOiBvYmplY3QpIHtcclxuICAgIHRoaXMub25SZXNldFBhc3MuZW1pdChzdWJtaXNzaW9uKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLnByb2plY3RSZWFkeSA9IEZvcm1pby5tYWtlU3RhdGljUmVxdWVzdCh0aGlzLmFwcENvbmZpZy5hcHBVcmwpLnRoZW4oXHJcbiAgICAgIChwcm9qZWN0OiBhbnkpID0+IHtcclxuICAgICAgICBlYWNoKHByb2plY3QuYWNjZXNzLCAoYWNjZXNzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuZm9ybUFjY2Vzc1thY2Nlc3MudHlwZV0gPSBhY2Nlc3Mucm9sZXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgICgpOiBhbnkgPT4ge1xyXG4gICAgICAgIHRoaXMuZm9ybUFjY2VzcyA9IHt9O1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIEdldCB0aGUgYWNjZXNzIGZvciB0aGlzIHByb2plY3QuXHJcbiAgICB0aGlzLmFjY2Vzc1JlYWR5ID0gRm9ybWlvLm1ha2VTdGF0aWNSZXF1ZXN0KFxyXG4gICAgICB0aGlzLmFwcENvbmZpZy5hcHBVcmwgKyAnL2FjY2VzcydcclxuICAgICkudGhlbihcclxuICAgICAgKGFjY2VzczogYW55KSA9PiB7XHJcbiAgICAgICAgZWFjaChhY2Nlc3MuZm9ybXMsIChmb3JtOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuc3VibWlzc2lvbkFjY2Vzc1tmb3JtLm5hbWVdID0ge307XHJcbiAgICAgICAgICBmb3JtLnN1Ym1pc3Npb25BY2Nlc3MuZm9yRWFjaCgoc3ViQWNjZXNzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXNzaW9uQWNjZXNzW2Zvcm0ubmFtZV1bc3ViQWNjZXNzLnR5cGVdID0gc3ViQWNjZXNzLnJvbGVzO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yb2xlcyA9IGFjY2Vzcy5yb2xlcztcclxuICAgICAgICByZXR1cm4gYWNjZXNzO1xyXG4gICAgICB9LFxyXG4gICAgICAoKTogYW55ID0+IHtcclxuICAgICAgICB0aGlzLnJvbGVzID0ge307XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRVc2VyUHJvbWlzZTogUHJvbWlzZTxhbnk+O1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLm9hdXRoKSB7XHJcbiAgICAgIC8vIE1ha2UgYSBmaXggdG8gdGhlIGhhc2ggdG8gcmVtb3ZlIHN0YXJ0aW5nIFwiL1wiIHRoYXQgYW5ndWxhciBtaWdodCBwdXQgdGhlcmUuXHJcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCgvXiNcXC9hY2Nlc3NfdG9rZW4vKSkge1xyXG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoL14jXFwvYWNjZXNzX3Rva2VuLywgJyNhY2Nlc3NfdG9rZW4nKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEluaXRpYXRlIHRoZSBTU08gaWYgdGhleSBwcm92aWRlIG9hdXRoIHNldHRpbmdzLlxyXG4gICAgICBjdXJyZW50VXNlclByb21pc2UgPSBGb3JtaW8uc3NvSW5pdCh0aGlzLmNvbmZpZy5vYXV0aC50eXBlLCB0aGlzLmNvbmZpZy5vYXV0aC5vcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRVc2VyUHJvbWlzZSA9IEZvcm1pby5jdXJyZW50VXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXNlclJlYWR5ID0gY3VycmVudFVzZXJQcm9taXNlLnRoZW4oKHVzZXI6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFVzZXIodXNlcik7XHJcbiAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVHJpZ2dlciB3ZSBhcmUgcmVkeSB3aGVuIGFsbCBwcm9taXNlcyBoYXZlIHJlc29sdmVkLlxyXG4gICAgaWYgKHRoaXMuYWNjZXNzUmVhZHkpIHtcclxuICAgICAgdGhpcy5hY2Nlc3NSZWFkeVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMucHJvamVjdFJlYWR5KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMudXNlclJlYWR5KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMucmVhZHlSZXNvbHZlKHRydWUpKVxyXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHRoaXMucmVhZHlSZWplY3QoZXJyKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyKHVzZXI6IGFueSkge1xyXG4gICAgY29uc3QgbmFtZXNwYWNlID0gRm9ybWlvLm5hbWVzcGFjZSB8fCAnZm9ybWlvJztcclxuICAgIGlmICh1c2VyKSB7XHJcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke25hbWVzcGFjZX1BcHBVc2VyYCwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG4gICAgICB0aGlzLnNldFVzZXJSb2xlcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51c2VyID0gbnVsbDtcclxuICAgICAgdGhpcy5pcyA9IHt9O1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lc3BhY2V9QXBwVXNlcmApO1xyXG4gICAgICBGb3JtaW8uY2xlYXJDYWNoZSgpO1xyXG4gICAgICBGb3JtaW8uc2V0VXNlcihudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSAhIUZvcm1pby5nZXRUb2tlbigpO1xyXG4gICAgdGhpcy5vblVzZXIuZW1pdCh0aGlzLnVzZXIpO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlclJvbGVzKCkge1xyXG4gICAgaWYgKHRoaXMuYWNjZXNzUmVhZHkpIHtcclxuICAgICAgdGhpcy5hY2Nlc3NSZWFkeS50aGVuKCgpID0+IHtcclxuICAgICAgICBlYWNoKHRoaXMucm9sZXMsIChyb2xlOiBhbnksIHJvbGVOYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnVzZXIucm9sZXMuaW5kZXhPZihyb2xlLl9pZCkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNbcm9sZU5hbWVdID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2dvdXRFcnJvcigpIHtcclxuICAgIHRoaXMuc2V0VXNlcihudWxsKTtcclxuICAgIGNvbnN0IG5hbWVzcGFjZSA9IEZvcm1pby5uYW1lc3BhY2UgfHwgJ2Zvcm1pbyc7XHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgJHtuYW1lc3BhY2V9VG9rZW5gKTtcclxuICAgIHRoaXMub25FcnJvci5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB0aGlzLnNldFVzZXIobnVsbCk7XHJcbiAgICBjb25zdCBuYW1lc3BhY2UgPSBGb3JtaW8ubmFtZXNwYWNlIHx8ICdmb3JtaW8nO1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYCR7bmFtZXNwYWNlfVRva2VuYCk7XHJcbiAgICBGb3JtaW8ubG9nb3V0KClcclxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5vbkxvZ291dC5lbWl0KCkpXHJcbiAgICAgIC5jYXRjaCgoKSA9PiB0aGlzLmxvZ291dEVycm9yKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=