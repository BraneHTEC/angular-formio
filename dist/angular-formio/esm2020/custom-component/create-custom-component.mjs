// @ts-nocheck
import { Components, Utils as FormioUtils } from 'formiojs';
import { clone, isNil, isArray } from 'lodash';
const BaseInputComponent = Components.components.input;
const TextfieldComponent = Components.components.textfield;
export function createCustomFormioComponent(customComponentOptions) {
    var _a;
    return _a = class CustomComponent extends BaseInputComponent {
            constructor(component, options, data) {
                super(component, {
                    ...options,
                    sanitizeConfig: {
                        addTags: [customComponentOptions.selector],
                    },
                }, data);
                this.component = component;
                this.id = FormioUtils.getRandomComponentId();
                this.type = customComponentOptions.type;
                if (customComponentOptions.extraValidators) {
                    this.validators = this.validators.concat(customComponentOptions.extraValidators);
                }
            }
            static schema() {
                return BaseInputComponent.schema({
                    ...customComponentOptions.schema,
                    type: customComponentOptions.type,
                });
            }
            get defaultSchema() {
                return CustomComponent.schema();
            }
            get emptyValue() {
                return customComponentOptions.emptyValue || null;
            }
            static get builderInfo() {
                return {
                    title: customComponentOptions.title,
                    group: customComponentOptions.group,
                    icon: customComponentOptions.icon,
                    weight: customComponentOptions.weight,
                    documentation: customComponentOptions.documentation,
                    schema: CustomComponent.schema(),
                };
            }
            elementInfo() {
                const info = super.elementInfo();
                info.type = customComponentOptions.selector;
                info.changeEvent = customComponentOptions.changeEvent || 'valueChange';
                info.attr = {
                    ...info.attr,
                    class: info.attr.class.replace('form-control', 'form-control-custom-field') // remove the form-control class as the custom angular component may look different
                };
                return info;
            }
            get inputInfo() {
                const info = {
                    id: this.key,
                    ...this.elementInfo()
                };
                return info;
            }
            renderElement(value, index) {
                const info = this.inputInfo;
                return this.renderTemplate(customComponentOptions.template || 'input', {
                    input: info,
                    value,
                    index
                });
            }
            attach(element) {
                let superAttach = super.attach(element);
                this._customAngularElement = element.querySelector(customComponentOptions.selector);
                // Bind the custom options and the validations to the Angular component's inputs (flattened)
                if (this._customAngularElement) {
                    // To make sure we have working input in IE...
                    // IE doesn't render it properly if it's not visible on the screen
                    // due to the whole structure applied via innerHTML to the parent
                    // so we need to use appendChild
                    if (!this._customAngularElement.getAttribute('ng-version')) {
                        this._customAngularElement.removeAttribute('ref');
                        const newCustomElement = document.createElement(customComponentOptions.selector);
                        newCustomElement.setAttribute('ref', 'input');
                        Object.keys(this.inputInfo.attr).forEach((attr) => {
                            newCustomElement.setAttribute(attr, this.inputInfo.attr[attr]);
                        });
                        this._customAngularElement.appendChild(newCustomElement);
                        this._customAngularElement = newCustomElement;
                        superAttach = super.attach(element);
                    }
                    // Bind customOptions
                    for (const key in this.component.customOptions) {
                        if (this.component.customOptions.hasOwnProperty(key)) {
                            this._customAngularElement[key] = this.component.customOptions[key];
                        }
                    }
                    // Bind validate options
                    for (const key in this.component.validate) {
                        if (this.component.validate.hasOwnProperty(key)) {
                            this._customAngularElement[key] = this.component.validate[key];
                        }
                    }
                    // Bind options explicitly set
                    const fieldOptions = customComponentOptions.fieldOptions;
                    if (isArray(fieldOptions) && fieldOptions.length > 0) {
                        for (const key in fieldOptions) {
                            if (fieldOptions.hasOwnProperty(key)) {
                                this._customAngularElement[fieldOptions[key]] = this.component[fieldOptions[key]];
                            }
                        }
                    }
                    // Attach event listener for emit event
                    this._customAngularElement.addEventListener('formioEvent', (event) => {
                        this.emit(event.detail.eventName, {
                            ...event.detail.data,
                            component: this.component
                        });
                    });
                    // Ensure we bind the value (if it isn't a multiple-value component with no wrapper)
                    if (!this._customAngularElement.value && !this.component.disableMultiValueWrapper) {
                        this.restoreValue();
                    }
                }
                return superAttach;
            }
            // Add extra option to support multiple value (e.g. datagrid) with single angular component (disableMultiValueWrapper)
            useWrapper() {
                return this.component.hasOwnProperty('multiple') && this.component.multiple && !this.component.disableMultiValueWrapper;
            }
            get defaultValue() {
                let defaultValue = this.emptyValue;
                // handle falsy default value
                if (!isNil(this.component.defaultValue)) {
                    defaultValue = this.component.defaultValue;
                }
                if (this.component.customDefaultValue && !this.options.preview) {
                    defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
                }
                return clone(defaultValue);
            }
        },
        _a.editForm = customComponentOptions.editForm || TextfieldComponent.editForm,
        _a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWN1c3RvbS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWZvcm1pby9zcmMvY3VzdG9tLWNvbXBvbmVudC9jcmVhdGUtY3VzdG9tLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxFQUFlLFVBQVUsRUFBMkIsS0FBSyxJQUFJLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFL0MsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUN2RCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0FBRTNELE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxzQkFBaUQ7O0lBQzNGLFlBQU8sTUFBTSxlQUFnQixTQUFRLGtCQUFrQjtZQWdDckQsWUFBbUIsU0FBa0MsRUFBRSxPQUFZLEVBQUUsSUFBUztnQkFDNUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtvQkFDZixHQUFHLE9BQU87b0JBQ1YsY0FBYyxFQUFFO3dCQUNkLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztxQkFDM0M7aUJBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFOUSxjQUFTLEdBQVQsU0FBUyxDQUF5QjtnQkE5QnJELE9BQUUsR0FBRyxXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDeEMsU0FBSSxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQztnQkFxQ2pDLElBQUksc0JBQXNCLENBQUMsZUFBZSxFQUFFO29CQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDO2lC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SUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRTtvQkFDdkMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2lCQUM1QztnQkFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDOUQsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUNiLE9BQU8sQ0FDUixDQUFDO2lCQUNIO2dCQUVELE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdCLENBQUM7U0FDRjtRQWpLUSxXQUFRLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxJQUFJLGtCQUFrQixDQUFDLFFBQVM7V0FpS2pGO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEB0cy1ub2NoZWNrXHJcbmltcG9ydCB7IEJ1aWxkZXJJbmZvLCBDb21wb25lbnRzLCBFeHRlbmRlZENvbXBvbmVudFNjaGVtYSwgVXRpbHMgYXMgRm9ybWlvVXRpbHMgfSBmcm9tICdmb3JtaW9qcyc7XHJcbmltcG9ydCB7IEZvcm1pb0N1c3RvbUNvbXBvbmVudEluZm8sIEZvcm1pb0N1c3RvbUVsZW1lbnQsIEZvcm1pb0V2ZW50IH0gZnJvbSAnLi4vZWxlbWVudHMuY29tbW9uJztcclxuaW1wb3J0IHsgY2xvbmUsIGlzTmlsLCBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbmNvbnN0IEJhc2VJbnB1dENvbXBvbmVudCA9IENvbXBvbmVudHMuY29tcG9uZW50cy5pbnB1dDtcclxuY29uc3QgVGV4dGZpZWxkQ29tcG9uZW50ID0gQ29tcG9uZW50cy5jb21wb25lbnRzLnRleHRmaWVsZDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDdXN0b21Gb3JtaW9Db21wb25lbnQoY3VzdG9tQ29tcG9uZW50T3B0aW9uczogRm9ybWlvQ3VzdG9tQ29tcG9uZW50SW5mbykge1xyXG4gIHJldHVybiBjbGFzcyBDdXN0b21Db21wb25lbnQgZXh0ZW5kcyBCYXNlSW5wdXRDb21wb25lbnQge1xyXG4gICAgc3RhdGljIGVkaXRGb3JtID0gY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5lZGl0Rm9ybSB8fCBUZXh0ZmllbGRDb21wb25lbnQuZWRpdEZvcm07XHJcbiAgICBpZCA9IEZvcm1pb1V0aWxzLmdldFJhbmRvbUNvbXBvbmVudElkKCk7XHJcbiAgICB0eXBlID0gY3VzdG9tQ29tcG9uZW50T3B0aW9ucy50eXBlO1xyXG4gICAgX2N1c3RvbUFuZ3VsYXJFbGVtZW50OiBGb3JtaW9DdXN0b21FbGVtZW50O1xyXG5cclxuICAgIHN0YXRpYyBzY2hlbWEoKSB7XHJcbiAgICAgIHJldHVybiBCYXNlSW5wdXRDb21wb25lbnQuc2NoZW1hKHtcclxuICAgICAgICAuLi5jdXN0b21Db21wb25lbnRPcHRpb25zLnNjaGVtYSxcclxuICAgICAgICB0eXBlOiBjdXN0b21Db21wb25lbnRPcHRpb25zLnR5cGUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkZWZhdWx0U2NoZW1hKCkge1xyXG4gICAgICByZXR1cm4gQ3VzdG9tQ29tcG9uZW50LnNjaGVtYSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBlbXB0eVZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5lbXB0eVZhbHVlIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBidWlsZGVySW5mbygpOiBCdWlsZGVySW5mbyB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMudGl0bGUsXHJcbiAgICAgICAgZ3JvdXA6IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZ3JvdXAsXHJcbiAgICAgICAgaWNvbjogY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5pY29uLFxyXG4gICAgICAgIHdlaWdodDogY3VzdG9tQ29tcG9uZW50T3B0aW9ucy53ZWlnaHQsXHJcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5kb2N1bWVudGF0aW9uLFxyXG4gICAgICAgIHNjaGVtYTogQ3VzdG9tQ29tcG9uZW50LnNjaGVtYSgpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnQ6IEV4dGVuZGVkQ29tcG9uZW50U2NoZW1hLCBvcHRpb25zOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICBzdXBlcihjb21wb25lbnQsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIHNhbml0aXplQ29uZmlnOiB7XHJcbiAgICAgICAgICBhZGRUYWdzOiBbY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5zZWxlY3Rvcl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwgZGF0YSk7XHJcblxyXG4gICAgICBpZiAoY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5leHRyYVZhbGlkYXRvcnMpIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvcnMgPSB0aGlzLnZhbGlkYXRvcnMuY29uY2F0KGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuZXh0cmFWYWxpZGF0b3JzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRJbmZvKCkge1xyXG4gICAgICBjb25zdCBpbmZvID0gc3VwZXIuZWxlbWVudEluZm8oKTtcclxuICAgICAgaW5mby50eXBlID0gY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5zZWxlY3RvcjtcclxuICAgICAgaW5mby5jaGFuZ2VFdmVudCA9IGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuY2hhbmdlRXZlbnQgfHwgJ3ZhbHVlQ2hhbmdlJztcclxuICAgICAgaW5mby5hdHRyID0ge1xyXG4gICAgICAgIC4uLmluZm8uYXR0cixcclxuICAgICAgICBjbGFzczogaW5mby5hdHRyLmNsYXNzLnJlcGxhY2UoJ2Zvcm0tY29udHJvbCcsICdmb3JtLWNvbnRyb2wtY3VzdG9tLWZpZWxkJykgLy8gcmVtb3ZlIHRoZSBmb3JtLWNvbnRyb2wgY2xhc3MgYXMgdGhlIGN1c3RvbSBhbmd1bGFyIGNvbXBvbmVudCBtYXkgbG9vayBkaWZmZXJlbnRcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlucHV0SW5mbygpIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHtcclxuICAgICAgICBpZDogdGhpcy5rZXksXHJcbiAgICAgICAgLi4udGhpcy5lbGVtZW50SW5mbygpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyRWxlbWVudCh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmlucHV0SW5mbztcclxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVGVtcGxhdGUoY3VzdG9tQ29tcG9uZW50T3B0aW9ucy50ZW1wbGF0ZSB8fCAnaW5wdXQnLCB7XHJcbiAgICAgICAgaW5wdXQ6IGluZm8sXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgaW5kZXhcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXR0YWNoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgIGxldCBzdXBlckF0dGFjaCA9IHN1cGVyLmF0dGFjaChlbGVtZW50KTtcclxuXHJcbiAgICAgIHRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuc2VsZWN0b3IpO1xyXG5cclxuICAgICAgLy8gQmluZCB0aGUgY3VzdG9tIG9wdGlvbnMgYW5kIHRoZSB2YWxpZGF0aW9ucyB0byB0aGUgQW5ndWxhciBjb21wb25lbnQncyBpbnB1dHMgKGZsYXR0ZW5lZClcclxuICAgICAgaWYgKHRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50KSB7XHJcbiAgICAgICAgLy8gVG8gbWFrZSBzdXJlIHdlIGhhdmUgd29ya2luZyBpbnB1dCBpbiBJRS4uLlxyXG4gICAgICAgIC8vIElFIGRvZXNuJ3QgcmVuZGVyIGl0IHByb3Blcmx5IGlmIGl0J3Mgbm90IHZpc2libGUgb24gdGhlIHNjcmVlblxyXG4gICAgICAgIC8vIGR1ZSB0byB0aGUgd2hvbGUgc3RydWN0dXJlIGFwcGxpZWQgdmlhIGlubmVySFRNTCB0byB0aGUgcGFyZW50XHJcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byB1c2UgYXBwZW5kQ2hpbGRcclxuICAgICAgICBpZiAoIXRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50LmdldEF0dHJpYnV0ZSgnbmctdmVyc2lvbicpKSB7XHJcbiAgICAgICAgICB0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3JlZicpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IG5ld0N1c3RvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGN1c3RvbUNvbXBvbmVudE9wdGlvbnMuc2VsZWN0b3IpIGFzIEZvcm1pb0N1c3RvbUVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgbmV3Q3VzdG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlZicsICdpbnB1dCcpO1xyXG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy5pbnB1dEluZm8uYXR0cikuZm9yRWFjaCgoYXR0cjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIG5ld0N1c3RvbUVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIHRoaXMuaW5wdXRJbmZvLmF0dHJbYXR0cl0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdGhpcy5fY3VzdG9tQW5ndWxhckVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3Q3VzdG9tRWxlbWVudCk7XHJcbiAgICAgICAgICB0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudCA9IG5ld0N1c3RvbUVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgc3VwZXJBdHRhY2ggPSBzdXBlci5hdHRhY2goZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBCaW5kIGN1c3RvbU9wdGlvbnNcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbXBvbmVudC5jdXN0b21PcHRpb25zKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnQuY3VzdG9tT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50W2tleV0gPSB0aGlzLmNvbXBvbmVudC5jdXN0b21PcHRpb25zW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEJpbmQgdmFsaWRhdGUgb3B0aW9uc1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuY29tcG9uZW50LnZhbGlkYXRlKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5jb21wb25lbnQudmFsaWRhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21Bbmd1bGFyRWxlbWVudFtrZXldID0gdGhpcy5jb21wb25lbnQudmFsaWRhdGVba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQmluZCBvcHRpb25zIGV4cGxpY2l0bHkgc2V0XHJcbiAgICAgICAgY29uc3QgZmllbGRPcHRpb25zID0gY3VzdG9tQ29tcG9uZW50T3B0aW9ucy5maWVsZE9wdGlvbnM7XHJcbiAgICAgICAgaWYgKGlzQXJyYXkoZmllbGRPcHRpb25zKSAmJiBmaWVsZE9wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmllbGRPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZE9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50W2ZpZWxkT3B0aW9uc1trZXldXSA9IHRoaXMuY29tcG9uZW50W2ZpZWxkT3B0aW9uc1trZXldXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXR0YWNoIGV2ZW50IGxpc3RlbmVyIGZvciBlbWl0IGV2ZW50XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tQW5ndWxhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9ybWlvRXZlbnQnLCAoZXZlbnQ6IEN1c3RvbUV2ZW50PEZvcm1pb0V2ZW50PikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5lbWl0KGV2ZW50LmRldGFpbC5ldmVudE5hbWUsIHtcclxuICAgICAgICAgICAgLi4uZXZlbnQuZGV0YWlsLmRhdGEsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogdGhpcy5jb21wb25lbnRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFbnN1cmUgd2UgYmluZCB0aGUgdmFsdWUgKGlmIGl0IGlzbid0IGEgbXVsdGlwbGUtdmFsdWUgY29tcG9uZW50IHdpdGggbm8gd3JhcHBlcilcclxuICAgICAgICBpZiAoIXRoaXMuX2N1c3RvbUFuZ3VsYXJFbGVtZW50LnZhbHVlICYmICF0aGlzLmNvbXBvbmVudC5kaXNhYmxlTXVsdGlWYWx1ZVdyYXBwZXIpIHtcclxuICAgICAgICAgIHRoaXMucmVzdG9yZVZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VwZXJBdHRhY2g7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGV4dHJhIG9wdGlvbiB0byBzdXBwb3J0IG11bHRpcGxlIHZhbHVlIChlLmcuIGRhdGFncmlkKSB3aXRoIHNpbmdsZSBhbmd1bGFyIGNvbXBvbmVudCAoZGlzYWJsZU11bHRpVmFsdWVXcmFwcGVyKVxyXG4gICAgdXNlV3JhcHBlcigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lmhhc093blByb3BlcnR5KCdtdWx0aXBsZScpICYmIHRoaXMuY29tcG9uZW50Lm11bHRpcGxlICYmICF0aGlzLmNvbXBvbmVudC5kaXNhYmxlTXVsdGlWYWx1ZVdyYXBwZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRWYWx1ZSgpIHtcclxuICAgICAgbGV0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZW1wdHlWYWx1ZTtcclxuXHJcbiAgICAgIC8vIGhhbmRsZSBmYWxzeSBkZWZhdWx0IHZhbHVlXHJcbiAgICAgIGlmICghaXNOaWwodGhpcy5jb21wb25lbnQuZGVmYXVsdFZhbHVlKSkge1xyXG4gICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuY29tcG9uZW50LmRlZmF1bHRWYWx1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuY29tcG9uZW50LmN1c3RvbURlZmF1bHRWYWx1ZSAmJiAhdGhpcy5vcHRpb25zLnByZXZpZXcpIHtcclxuICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmV2YWx1YXRlKFxyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuY3VzdG9tRGVmYXVsdFZhbHVlLFxyXG4gICAgICAgICAgeyB2YWx1ZTogJycgfSxcclxuICAgICAgICAgICd2YWx1ZSdcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gY2xvbmUoZGVmYXVsdFZhbHVlKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==