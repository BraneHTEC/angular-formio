import { BuilderInfo, ExtendedComponentSchema } from 'formiojs';
import { FormioCustomComponentInfo, FormioCustomElement } from '../elements.common';
export declare function createCustomFormioComponent(customComponentOptions: FormioCustomComponentInfo): {
    new (component: ExtendedComponentSchema, options: any, data: any): {
        id: string;
        type: string;
        _customAngularElement: FormioCustomElement;
        readonly defaultSchema: ExtendedComponentSchema<any>;
        readonly emptyValue: any;
        component: ExtendedComponentSchema;
        elementInfo(): import("formiojs").ElementInfo;
        readonly inputInfo: {
            type: string;
            component: ExtendedComponentSchema<any>;
            changeEvent: string;
            attr: any;
            content: string;
            id: any;
        };
        renderElement(value: any, index: number): any;
        attach(element: HTMLElement): any;
        useWrapper(): boolean;
        readonly defaultValue: any;
        readonly maskOptions: {
            label: any;
            value: any;
        }[];
        readonly isMultipleMasksField: boolean;
        getMaskByName(maskName: string): any;
        setInputMask(input: any, inputMask: any): any;
        getMaskOptions(): {
            label: any;
            value: any;
        }[];
        readonly remainingWords: number;
        setCounter(type: string, element: any, count: number, max: number): void;
        updateValueAt(value: any, flags: any, index: string | number): void;
        getValueAt(index: string | number): any;
        updateValue(value: any, flags: any, index: string | number): any;
        attachElement(element: any, index: string | number): void;
        readonly widget: any;
        createWidget(index: string | number): any;
        addFocusBlurEvents(element: any): void;
        dataValue: any;
        readonly addAnother: any;
        renderRow(value: any, index: any): any;
        onSelectMaskHandler(event: any): void;
        tryAttachMultipleMasksInput(): boolean;
        updateMask(input: any, mask: any): void;
        addNewValue(value: any): void;
        addValue(): void;
        render(element: any): any;
        originalComponent: any;
        refs: Object;
        attached: boolean;
        rendered: boolean;
        data: Object;
        error: string;
        tooltip: string;
        row: any;
        pristine: boolean;
        parent: any;
        root: any;
        lastChanged: any;
        triggerRedraw: Function;
        tooltips: any[];
        invalid: boolean;
        isBuilt: boolean;
        readonly ready: any;
        readonly labelInfo: any;
        init(): void;
        destroy(): void;
        readonly shouldDisabled: any;
        readonly isInputComponent: boolean;
        readonly hasInput: boolean;
        readonly key: any;
        parentVisible: any;
        parentDisabled: any;
        visible: any;
        currentForm: any;
        readonly fullMode: boolean;
        readonly builderMode: boolean;
        getModifiedSchema(schema: ExtendedComponentSchema<any>, defaultSchema: import("formiojs").ComponentSchema<any>, recursion: boolean): ExtendedComponentSchema<any>;
        readonly schema: ExtendedComponentSchema<any>;
        t(text: string, params?: Object): any;
        labelIsHidden(): boolean;
        readonly transform: any;
        getTemplate(names: any, modes: any): any;
        checkTemplate(templates: any, names: any, modes: any): any;
        checkTemplateMode(templatesByName: any, modes: any): any;
        renderTemplate(name: any, data: any, modeOption?: any[]): any;
        sanitize(dirty: string): any;
        renderString(template: any, data: any): HTMLElement;
        performInputMapping(input: any): any;
        getBrowserLanguage(): string;
        beforeNext(): any;
        beforePage(): any;
        beforeSubmit(): any;
        readonly submissionTimezone: any;
        readonly canDisable: boolean;
        loadRefs(element: any, refs: any): any;
        build(element: any): any;
        addShortcut(element: any, shortcut: any): void;
        removeShortcut(element: any, shortcut: any): void;
        detach(): void;
        attachRefreshEvent(refreshData: any): void;
        attachRefreshOn(): void;
        refresh(value: any): void;
        inContext(component: any): boolean;
        readonly viewOnly: any;
        createViewOnlyElement(): HTMLElement;
        readonly defaultViewOnlyValue: "-";
        getValueAsString(value: any): string;
        getView(value: any): string;
        updateItems(...args: any[]): void;
        createModal(): HTMLElement;
        readonly className: string;
        readonly customStyle: string;
        getElement(): HTMLElement;
        evalContext(additional: any): any;
        setPristine(pristine: boolean): void;
        removeValue(index: number): void;
        iconClass(name: any, spinning: any): any;
        readonly name: string;
        readonly errorLabel: string;
        errorMessage(type: any): any;
        setContent(element: any, content: any): boolean;
        redraw(): any;
        rebuild(): any;
        removeEventListeners(): void;
        hasClass(element: any, className: string): any;
        addClass(element: any, className: string): any;
        removeClass(element: any, className: string): any;
        hasCondition(): boolean;
        conditionallyVisible(data: any): boolean;
        checkCondition(row: any, data: Object): boolean;
        checkConditions(data: any): any;
        readonly logic: any[];
        fieldLogic(data: any): any;
        applyActions(actions: any[], result: any, data: any, newComponent: any): boolean;
        addInputError(message: any, dirty: boolean): void;
        clearOnHide(show: boolean): void;
        onChange(flags: Object, fromRoot: boolean): void;
        readonly wysiwygDefault: {
            theme: string;
            placeholder: any;
            modules: {
                clipboard: {
                    matchVisual: boolean;
                };
                toolbar: any[];
            };
        };
        addCKE(element: any, settings: Object, onChange: (input: any) => any): any;
        addQuill(element: any, settings: Object, onChange: (input: any) => any): any;
        addAce(element: any, settings: Object, onChange: (input: any) => any): any;
        hasValue(data: Object): boolean;
        readonly rootValue: any;
        readonly rootPristine: any;
        splice(index: string | number): void;
        deleteValue(): void;
        getValue(): any;
        setValue(value: any, flags: any): boolean;
        setValueAt(index: number, value: any, flags: any): void;
        readonly hasSetValue: boolean;
        restoreValue(): void;
        normalizeValue(value: any): any;
        getIcon(name: any, content: any, styles: any, ref?: string): any;
        resetValue(): void;
        hasChanged(before: any, after: any): boolean;
        updateOnChange(flags: any, changed: any): boolean;
        calculateValue(data: Object, flags: any): boolean;
        label: any;
        getRoot(): import("formiojs/types/components/_classes/component/component").Component;
        invalidMessage(data: any, dirty: boolean, ignoreCondition?: boolean): any;
        isValid(data: any, dirty: boolean): boolean;
        checkValidity(data: any, dirty: any, rowData: any): boolean;
        readonly validationValue: any;
        isEmpty(value: any): boolean;
        validateMultiple(): boolean;
        readonly errors: any[];
        setCustomValidity(message: any, dirty: any): void;
        shouldSkipValidation(data: any, dirty: any, rowData: any): boolean;
        whenReady(): any;
        readonly dataReady: any;
        asString(value: any): string;
        disabled: boolean;
        setDisabled(element: any, disabled: any): void;
        setLoading(element: any, loading: any): void;
        selectOptions(select: any, tag: any, options: any, defaultValue: any): void;
        setSelectValue(select: any, value: any): void;
        clear(): any;
        append(element: HTMLElement): void;
        prepend(element: HTMLElement): void;
        removeChild(element: HTMLElement): void;
        attachLogic(): void;
        autofocus(): void;
        focus(): void;
        readonly shouldDisable: boolean;
        readonly info: import("formiojs").ElementInfo;
        element: any;
        validators: (keyof import("formiojs").ValidateOptions)[];
        calculatedValue: any;
        options: any;
        labelElement: any;
        eventHandlers: any[];
        i18next: any;
        events: import("formiojs/types/eventEmitter").EventEmitter;
        defaultMask: any;
        inputMasks: any[];
        on(event: string, cb: Function, internal: boolean, once?: boolean): any;
        once(event: string, cb: Function, internal: boolean): any;
        onAny(cb: Function): any;
        off(event: string): void;
        emit(event: string, data: Object): void;
        addEventListener(obj: HTMLElement, type: string, func: Function, persistent?: boolean): any;
        removeEventListener(obj: Object, type: any): any;
        removeAllEvents(includeExternal: boolean): void;
        appendTo(element: HTMLElement, container: HTMLElement): any;
        prependTo(element: HTMLElement, container: HTMLElement): any;
        removeChildFrom(element: HTMLElement, container: HTMLElement): any;
        ce(type: string, attr?: Object, children?: string | HTMLElement | (string | HTMLElement)[]): HTMLElement;
        appendChild(element: any, child: any): any;
        maskPlaceholder(mask: HTMLElement): string;
        text(text: string): Text;
        attr(element: HTMLElement, attr: Object): void;
        empty(element: HTMLElement): void;
        interpolate(string: any, data: any): any;
        evaluate(func: any, args: any, ret: any, tokenize?: any): any;
        hook(...args: any[]): any;
    };
    editForm: () => {
        components: ExtendedComponentSchema<any>[];
    };
    schema(): ExtendedComponentSchema<any>;
    readonly builderInfo: BuilderInfo;
    tableView(value: any, options: any): void;
};
//# sourceMappingURL=create-custom-component.d.ts.map