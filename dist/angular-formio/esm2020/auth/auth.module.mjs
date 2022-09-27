import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from '@formio/angular';
import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
import { FormioResetPassComponent } from './resetpass/resetpass.component';
import { FormioAuthRoutes } from './auth.routes';
import { extendRouter } from '@formio/angular';
import * as i0 from "@angular/core";
export class FormioAuth {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9hdXRoL3NyYy9hdXRoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25FLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBZS9DLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBOEI7UUFDM0MsT0FBTyxZQUFZLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQThCO1FBQzVDLE9BQU8sWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM1RCxDQUFDOzt1R0FOVSxVQUFVO3dHQUFWLFVBQVUsaUJBTm5CLG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsMkJBQTJCO1FBQzNCLHdCQUF3QixhQVJ4QixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7d0dBU0gsVUFBVSxZQVhuQixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7MkZBU0gsVUFBVTtrQkFidEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIsd0JBQXdCO3dCQUN4QiwyQkFBMkI7d0JBQzNCLHdCQUF3QjtxQkFDekI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBGb3JtaW9Nb2R1bGUgfSBmcm9tICdAZm9ybWlvL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3JtaW9BdXRoQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFJlZ2lzdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9SZXNldFBhc3NDb21wb25lbnQgfSBmcm9tICcuL3Jlc2V0cGFzcy9yZXNldHBhc3MuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFJvdXRlQ29uZmlnIH0gZnJvbSAnLi9hdXRoLmNvbmZpZyc7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhSb3V0ZXMgfSBmcm9tICcuL2F1dGgucm91dGVzJztcclxuaW1wb3J0IHsgZXh0ZW5kUm91dGVyIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybWlvTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1pb0F1dGhDb21wb25lbnQsXHJcbiAgICBGb3JtaW9BdXRoTG9naW5Db21wb25lbnQsXHJcbiAgICBGb3JtaW9BdXRoUmVnaXN0ZXJDb21wb25lbnQsXHJcbiAgICBGb3JtaW9SZXNldFBhc3NDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtaW9BdXRoIHtcclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBGb3JtaW9BdXRoUm91dGVDb25maWcpOiBhbnkge1xyXG4gICAgcmV0dXJuIGV4dGVuZFJvdXRlcihGb3JtaW9BdXRoLCBjb25maWcsIEZvcm1pb0F1dGhSb3V0ZXMpO1xyXG4gIH1cclxuICBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnPzogRm9ybWlvQXV0aFJvdXRlQ29uZmlnKTogYW55IHtcclxuICAgIHJldHVybiBleHRlbmRSb3V0ZXIoRm9ybWlvQXV0aCwgY29uZmlnLCBGb3JtaW9BdXRoUm91dGVzKTtcclxuICB9XHJcbn1cclxuIl19