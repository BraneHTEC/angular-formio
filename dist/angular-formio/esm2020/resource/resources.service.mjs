import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@formio/angular/auth";
export class FormioResources {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9yZXNvdXJjZS9zcmMvcmVzb3VyY2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVF6RCxNQUFNLE9BQU8sZUFBZTtJQUkxQixZQUNTLElBQXdCO1FBQXhCLFNBQUksR0FBSixJQUFJLENBQW9CO1FBSmpDLGNBQVMsR0FBc0IsRUFBRSxDQUFDO1FBTWhDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLFdBQVcsRUFBRTtnQkFDWCxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2FBQ3BDO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzRHQWRVLGVBQWU7Z0hBQWYsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1pb0F1dGhTZXJ2aWNlIH0gZnJvbSAnQGZvcm1pby9hbmd1bGFyL2F1dGgnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtaW9SZXNvdXJjZU1hcCB7XHJcbiAgW25hbWU6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybWlvUmVzb3VyY2VzIHtcclxuICByZXNvdXJjZXM6IEZvcm1pb1Jlc291cmNlTWFwID0ge307XHJcbiAgZXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIG9uRXJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGF1dGg/OiBGb3JtaW9BdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5lcnJvciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIHRoaXMub25FcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICB0aGlzLnJlc291cmNlcyA9IHtcclxuICAgICAgY3VycmVudFVzZXI6IHtcclxuICAgICAgICByZXNvdXJjZUxvYWRlZDogdGhpcy5hdXRoLnVzZXJSZWFkeVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=