import { FormioAuthRouteConfig } from './auth.config';
import * as i0 from "@angular/core";
import * as i1 from "./auth.component";
import * as i2 from "./login/login.component";
import * as i3 from "./register/register.component";
import * as i4 from "./resetpass/resetpass.component";
import * as i5 from "@angular/common";
import * as i6 from "@formio/angular";
import * as i7 from "@angular/router";
export declare class FormioAuth {
    static forRoot(config?: FormioAuthRouteConfig): any;
    static forChild(config?: FormioAuthRouteConfig): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormioAuth, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FormioAuth, [typeof i1.FormioAuthComponent, typeof i2.FormioAuthLoginComponent, typeof i3.FormioAuthRegisterComponent, typeof i4.FormioResetPassComponent], [typeof i5.CommonModule, typeof i6.FormioModule, typeof i7.RouterModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FormioAuth>;
}
//# sourceMappingURL=auth.module.d.ts.map