import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class ParseHtmlContentPipe {
    /*
      Some messages that are come from formiojs have hex codes. So the main aim of this pipe is transform this messages to html.
      And then render in template.
    */
    transform(content) {
        const parsedContent = new DOMParser().parseFromString(content, 'text/html').body.childNodes[0];
        return parsedContent?.textContent;
    }
}
ParseHtmlContentPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: ParseHtmlContentPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ParseHtmlContentPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.0", ngImport: i0, type: ParseHtmlContentPipe, name: "parseHtmlContent", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.0", ngImport: i0, type: ParseHtmlContentPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'parseHtmlContent', pure: false }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtaHRtbC1jb250ZW50LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY29tcG9uZW50cy9hbGVydHMvcGFyc2UtaHRtbC1jb250ZW50LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBR3BELE1BQU0sT0FBTyxvQkFBb0I7SUFFL0I7OztNQUdFO0lBQ0YsU0FBUyxDQUFDLE9BQU87UUFDZixNQUFNLGFBQWEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRixPQUFPLGFBQWEsRUFBRSxXQUFXLENBQUM7SUFDcEMsQ0FBQzs7aUhBVlUsb0JBQW9COytHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFEaEMsSUFBSTttQkFBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAncGFyc2VIdG1sQ29udGVudCcsIHB1cmU6IGZhbHNlIH0pXHJcbmV4cG9ydCBjbGFzcyBQYXJzZUh0bWxDb250ZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICAvKlxyXG4gICAgU29tZSBtZXNzYWdlcyB0aGF0IGFyZSBjb21lIGZyb20gZm9ybWlvanMgaGF2ZSBoZXggY29kZXMuIFNvIHRoZSBtYWluIGFpbSBvZiB0aGlzIHBpcGUgaXMgdHJhbnNmb3JtIHRoaXMgbWVzc2FnZXMgdG8gaHRtbC5cclxuICAgIEFuZCB0aGVuIHJlbmRlciBpbiB0ZW1wbGF0ZS5cclxuICAqL1xyXG4gIHRyYW5zZm9ybShjb250ZW50KSB7XHJcbiAgICBjb25zdCBwYXJzZWRDb250ZW50ID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhjb250ZW50LCAndGV4dC9odG1sJykuYm9keS5jaGlsZE5vZGVzWzBdO1xyXG5cclxuICAgIHJldHVybiBwYXJzZWRDb250ZW50Py50ZXh0Q29udGVudDtcclxuICB9XHJcbn1cclxuIl19