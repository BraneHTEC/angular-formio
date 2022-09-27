import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, NgModule } from '@angular/core';
import { get, each } from 'lodash';
import { Formio } from 'formiojs';
import * as i2 from '@formio/angular';
import { extendRouter, FormioModule } from '@formio/angular';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

class FormioAuthConfig {
}
FormioAuthConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormioAuthConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthConfig });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthConfig, decorators: [{
            type: Injectable
        }] });
var FormioOauthType;
(function (FormioOauthType) {
    FormioOauthType["okta"] = "okta";
    FormioOauthType["saml"] = "saml";
})(FormioOauthType || (FormioOauthType = {}));

class FormioAuthService {
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
FormioAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthService, deps: [{ token: i2.FormioAppConfig }, { token: FormioAuthConfig }], target: i0.ɵɵFactoryTarget.Injectable });
FormioAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2.FormioAppConfig }, { type: FormioAuthConfig }]; } });

class FormioAuthComponent {
}
FormioAuthComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FormioAuthComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioAuthComponent, selector: "ng-component", ngImport: i0, template: "<div class=\"card card-primary panel panel-default\">\r\n  <div class=\"card-header panel-heading\">\r\n    <ul class=\"nav nav-tabs card-header-tabs\">\r\n      <li class=\"nav-item\" role=\"presentation\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"login\" routerLinkActive=\"active\">Login</a></li>\r\n      <li class=\"nav-item\" role=\"presentation\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"register\" routerLinkActive=\"active\">Register</a></li>\r\n      <li class=\"nav-item\" role=\"presentation\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"resetpass\" routerLinkActive=\"active\">Reset Password</a></li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"card-body panel-body\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i1.RouterOutlet, selector: "router-outlet", outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i1.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthComponent, decorators: [{
            type: Component,
            args: [{ template: "<div class=\"card card-primary panel panel-default\">\r\n  <div class=\"card-header panel-heading\">\r\n    <ul class=\"nav nav-tabs card-header-tabs\">\r\n      <li class=\"nav-item\" role=\"presentation\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"login\" routerLinkActive=\"active\">Login</a></li>\r\n      <li class=\"nav-item\" role=\"presentation\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"register\" routerLinkActive=\"active\">Register</a></li>\r\n      <li class=\"nav-item\" role=\"presentation\" routerLinkActive=\"active\"><a class=\"nav-link\" routerLink=\"resetpass\" routerLinkActive=\"active\">Reset Password</a></li>\r\n    </ul>\r\n  </div>\r\n  <div class=\"card-body panel-body\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n" }]
        }] });

class FormioAuthLoginComponent {
    constructor(service) {
        this.service = service;
    }
}
FormioAuthLoginComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthLoginComponent, deps: [{ token: FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormioAuthLoginComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioAuthLoginComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.loginForm\" (submit)=\"service.onLoginSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthLoginComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.loginForm\" (submit)=\"service.onLoginSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioAuthService }]; } });

class FormioAuthRegisterComponent {
    constructor(service) {
        this.service = service;
    }
}
FormioAuthRegisterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthRegisterComponent, deps: [{ token: FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormioAuthRegisterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioAuthRegisterComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.registerForm\" (submit)=\"service.onRegisterSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuthRegisterComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.registerForm\" (submit)=\"service.onRegisterSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioAuthService }]; } });

class FormioResetPassComponent {
    constructor(service) {
        this.service = service;
    }
}
FormioResetPassComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResetPassComponent, deps: [{ token: FormioAuthService }], target: i0.ɵɵFactoryTarget.Component });
FormioResetPassComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.0", type: FormioResetPassComponent, selector: "ng-component", ngImport: i0, template: "<formio [src]=\"service.resetPassForm\" (submit)=\"service.onResetPassSubmit($event)\"></formio>\r\n", dependencies: [{ kind: "component", type: i2.FormioComponent, selector: "formio" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioResetPassComponent, decorators: [{
            type: Component,
            args: [{ template: "<formio [src]=\"service.resetPassForm\" (submit)=\"service.onResetPassSubmit($event)\"></formio>\r\n" }]
        }], ctorParameters: function () { return [{ type: FormioAuthService }]; } });

function FormioAuthRoutes(config) {
    return [
        {
            path: '',
            component: config && config.auth ? config.auth : FormioAuthComponent,
            children: [
                {
                    path: '',
                    redirectTo: 'login',
                    pathMatch: 'full'
                },
                {
                    path: 'login',
                    component: config && config.login ? config.login : FormioAuthLoginComponent
                },
                {
                    path: 'register',
                    component: config && config.register ? config.register : FormioAuthRegisterComponent
                },
                {
                    path: 'resetpass',
                    component: config && config.resetpass ? config.resetpass : FormioResetPassComponent
                }
            ]
        }
    ];
}

class FormioAuth {
    static forRoot(config) {
        return extendRouter(FormioAuth, config, FormioAuthRoutes);
    }
    static forChild(config) {
        return extendRouter(FormioAuth, config, FormioAuthRoutes);
    }
}
FormioAuth.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuth, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormioAuth.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: FormioAuth, declarations: [FormioAuthComponent,
        FormioAuthLoginComponent,
        FormioAuthRegisterComponent,
        FormioResetPassComponent], imports: [CommonModule,
        FormioModule,
        RouterModule] });
FormioAuth.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuth, imports: [CommonModule,
        FormioModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: FormioAuth, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormioModule,
                        RouterModule
                    ],
                    declarations: [
                        FormioAuthComponent,
                        FormioAuthLoginComponent,
                        FormioAuthRegisterComponent,
                        FormioResetPassComponent
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormioAuth, FormioAuthComponent, FormioAuthConfig, FormioAuthLoginComponent, FormioAuthRegisterComponent, FormioAuthRoutes, FormioAuthService, FormioResetPassComponent };
//# sourceMappingURL=formio-angular-auth.mjs.map
