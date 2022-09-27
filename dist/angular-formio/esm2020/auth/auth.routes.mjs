import { FormioAuthComponent } from './auth.component';
import { FormioAuthLoginComponent } from './login/login.component';
import { FormioAuthRegisterComponent } from './register/register.component';
import { FormioResetPassComponent } from './resetpass/resetpass.component';
export function FormioAuthRoutes(config) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9hdXRoL3NyYy9hdXRoLnJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUzRSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsTUFBOEI7SUFDN0QsT0FBTztRQUNMO1lBQ0UsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtZQUNwRSxRQUFRLEVBQUU7Z0JBQ1I7b0JBQ0UsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsVUFBVSxFQUFFLE9BQU87b0JBQ25CLFNBQVMsRUFBRSxNQUFNO2lCQUNsQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsT0FBTztvQkFDYixTQUFTLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtpQkFDNUU7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO2lCQUNyRjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsV0FBVztvQkFDakIsU0FBUyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7aUJBQ3BGO2FBQ0Y7U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aFJvdXRlQ29uZmlnIH0gZnJvbSAnLi9hdXRoLmNvbmZpZyc7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhDb21wb25lbnQgfSBmcm9tICcuL2F1dGguY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybWlvQXV0aExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtaW9BdXRoUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tICcuL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1pb1Jlc2V0UGFzc0NvbXBvbmVudCB9IGZyb20gJy4vcmVzZXRwYXNzL3Jlc2V0cGFzcy5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZvcm1pb0F1dGhSb3V0ZXMoY29uZmlnPzogRm9ybWlvQXV0aFJvdXRlQ29uZmlnKTogUm91dGVzIHtcclxuICByZXR1cm4gW1xyXG4gICAge1xyXG4gICAgICBwYXRoOiAnJyxcclxuICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLmF1dGggPyBjb25maWcuYXV0aCA6IEZvcm1pb0F1dGhDb21wb25lbnQsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgICByZWRpcmVjdFRvOiAnbG9naW4nLFxyXG4gICAgICAgICAgcGF0aE1hdGNoOiAnZnVsbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhdGg6ICdsb2dpbicsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IGNvbmZpZyAmJiBjb25maWcubG9naW4gPyBjb25maWcubG9naW4gOiBGb3JtaW9BdXRoTG9naW5Db21wb25lbnRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhdGg6ICdyZWdpc3RlcicsXHJcbiAgICAgICAgICBjb21wb25lbnQ6IGNvbmZpZyAmJiBjb25maWcucmVnaXN0ZXIgPyBjb25maWcucmVnaXN0ZXIgOiBGb3JtaW9BdXRoUmVnaXN0ZXJDb21wb25lbnRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhdGg6ICdyZXNldHBhc3MnLFxyXG4gICAgICAgICAgY29tcG9uZW50OiBjb25maWcgJiYgY29uZmlnLnJlc2V0cGFzcyA/IGNvbmZpZy5yZXNldHBhc3MgOiBGb3JtaW9SZXNldFBhc3NDb21wb25lbnRcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdO1xyXG59XHJcbiJdfQ==