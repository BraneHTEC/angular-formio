import { OnInit } from '@angular/core';
import { FormManagerService } from '../../form-manager.service';
import { ActivatedRoute } from '@angular/router';
import * as i0 from "@angular/core";
export declare class SubmissionComponent implements OnInit {
    service: FormManagerService;
    route: ActivatedRoute;
    downloadUrl: string;
    constructor(service: FormManagerService, route: ActivatedRoute);
    setDownloadUrl(url: any): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubmissionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubmissionComponent, "ng-component", never, {}, {}, never, never, false>;
}
//# sourceMappingURL=submission.component.d.ts.map