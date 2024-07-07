import type { DeepPartial, Mixin } from "../../../../types/utils.d.mts";
import type { ApplicationFormConfiguration, ApplicationRenderContext, ApplicationRenderOptions } from "../_types.d.mts";
import type ApplicationV2 from "./application.d.mts";

// TODO: How does this merge with DocumentSheetRenderOptions?
interface HandlebarsRenderOptions extends ApplicationRenderOptions {
  parts: string[];
}

type HandlebarsTemplatePart = {
  /**
   * The template entry-point for the part
   */
  template: string;
  /**
   * A CSS id to assign to the top-level element of the rendered part.
   * This id string is automatically prefixed by the application id.
   */
  id?: string;
  /**
   * An array of CSS classes to apply to the top-level element of the
   * rendered part.
   */
  classes?: string[];
  /**
   * An array of templates that are required to render the part.
   * If omitted, only the entry-point is inferred as required.
   */
  templates?: string[];
  /**
   * An array of selectors within this part whose scroll positions should
   * be persisted during a re-render operation. A blank string is used
   * to denote that the root level of the part is scrollable.
   */
  scrollabe?: string[];
  /**
   * A registry of forms selectors and submission handlers.
   */
  forms?: Record<string, ApplicationFormConfiguration>;
};

/**
 * The mixed application class augmented with [Handlebars](https://handlebarsjs.com) template rendering behavior.
 */
declare class HandlebarsApplication {
  /** @privateRemarks All mixin classses should accept anything for its constructor. */
  constructor(...args: any[]);

  /**
   * Configure a registry of template parts which are supported for this application for partial rendering.
   * @defaultValue `{}`
   */
  static PARTS: Record<string, HandlebarsTemplatePart>;

  /**
   * A record of all rendered template parts.
   * @defaultValue `{}`
   */
  get parts(): Record<string, HTMLElement>;

  protected _configureRenderOptions(options: DeepPartial<HandlebarsRenderOptions>): void;

  protected _preFirstRender(
    context: DeepPartial<ApplicationRenderContext>,
    options: DeepPartial<ApplicationRenderOptions>,
  ): Promise<void>;

  /**
   * Render each configured application part using Handlebars templates.
   * @param context - Context data for the render operation
   * @param options - Options which configure application rendering behavior
   * @returns A single rendered HTMLElement for each requested part
   */
  protected _renderHTML(
    context: ApplicationRenderContext,
    options: DeepPartial<ApplicationRenderOptions>,
  ): Promise<Record<string, HTMLElement>>;

  /**
   * Prepare context that is specific to only a single rendered part.
   *
   * It is recommended to augment or mutate the shared context so that downstream methods like _onRender have
   * visibility into the data that was used for rendering. It is acceptable to return a different context object
   * rather than mutating the shared context at the expense of this transparency.
   *
   * @param partId  - The part being rendered
   * @param context - Shared context provided by _prepareContext
   * @param options - Options which configure application rendering behavior
   * @returns Context data for a specific part
   */
  protected _preparePartContext(
    partId: string,
    context: ApplicationRenderContext,
    options: DeepPartial<HandlebarsRenderOptions>,
  ): Promise<ApplicationRenderContext>;

  /**
   * Replace the HTML of the application with the result provided by Handlebars rendering.
   * @param result  - The result from Handlebars template rendering
   * @param content - The content element into which the rendered result must be inserted
   * @param options - Options which configure application rendering behavior
   */
  protected _replaceHTML(
    result: Record<string, HTMLElement>,
    content: HTMLElement,
    options: DeepPartial<ApplicationRenderOptions>,
  ): void;

  /**
   * Prepare data used to synchronize the state of a template part.
   * @param partId       - The id of the part being rendered
   * @param newElement   - The new rendered HTML element for the part
   * @param priorElement - The prior rendered HTML element for the part
   * @param state        - A state object which is used to synchronize after replacement
   */
  protected _preSyncPartState(
    partId: string,
    newElement: HTMLElement,
    priorElement: HTMLElement,
    state: HandlebarsApplicationMixin.partState,
  ): void;

  /**
   * Synchronize the state of a template part after it has been rendered and replaced in the DOM.
   * @param partId       - The id of the part being rendered
   * @param newElement   - The new rendered HTML element for the part
   * @param priorElement - The prior rendered HTML element for the part
   * @param state        - A state object which is used to synchronize after replacement
   */
  protected _syncPartState(
    partId: string,
    newElement: HTMLElement,
    priorElement: HTMLElement,
    state: HandlebarsApplicationMixin.partState,
  ): void;

  /**
   * Attach event listeners to rendered template parts.
   * @param partId      - The id of the part being rendered
   * @param htmlElement - The rendered HTML element for the part
   * @param options     - Rendering options passed to the render method
   */
  protected _attachPartListeners(
    partId: string,
    htmlElement: HTMLElement,
    options: DeepPartial<HandlebarsRenderOptions>,
  ): void;
}

/**
 * Augment an Application class with [Handlebars](https://handlebarsjs.com) template rendering behavior.
 */
export default function HandlebarsApplicationMixin<BaseClass extends typeof ApplicationV2>(
  BaseApplication: BaseClass,
): Mixin<typeof HandlebarsApplication, BaseClass>;

declare namespace HandlebarsApplicationMixin {
  interface partState {
    scrollPositions: Array<[el1: HTMLElement, scrollTop: number, scrollLeft: number]>;
    focus?: string | undefined;
  }
}