import type { InexactPartial, ValueOf } from "../../../../../types/utils.d.mts";

declare global {
  /**
   * The visibility Layer which implements dynamic vision, lighting, and fog of war
   * This layer uses an event-driven workflow to perform the minimal required calculation in response to changes.
   * @see {@link PointSource}
   */
  class CanvasVisibility extends CanvasLayer {

    /**
     * The currently revealed vision.
     */
    vision: CanvasVisionContainer;

    /**
     * The exploration container which tracks exploration progress.
     */
    explored: PIXI.Container;

    /**
     * The optional visibility overlay sprite that should be drawn instead of the unexplored color in the fog of war.
     */
    visibilityOverlay: PIXI.Sprite;

    /**
     * The active vision source data object
     * @defaultValue
     * ```js
     * {
     *    source: undefined,
     *    activeLightingOptions: {}
     * }
     * ```
     */
    visionModeData: { source: foundry.canvas.sources.PointVisionSource.Any | null; activeLightingOptions: Record<string, unknown> };

    /**
     * Define whether each lighting layer is enabled, required, or disabled by this vision mode.
     * The value for each lighting channel is a number in LIGHTING_VISIBILITY
     * ```js
     * {
     *   background: VisionMode.LIGHTING_VISIBILITY.ENABLED,
     *    illumination: VisionMode.LIGHTING_VISIBILITY.ENABLED,
     *    coloration: VisionMode.LIGHTING_VISIBILITY.ENABLED,
     *    darkness: VisionMode.LIGHTING_VISIBILITY.ENABLED,
     *    any: true
     * }
     * ```
     */
    lightingVisibility: {
      illumination: CanvasVisibility.LightingVisibility;
      background: CanvasVisibility.LightingVisibility;
      coloration: CanvasVisibility.LightingVisibility;
      darkness: CanvasVisibility.LightingVisibility;
      any: boolean;
    };

    /**
     * A status flag for whether the layer initialization workflow has succeeded.
     */
    get initialized(): boolean;

    /**
     * Indicates whether containment filtering is required when rendering vision into a texture
     */
    protected get needsContainment(): boolean;

    /**
     * Does the currently viewed Scene support Token field of vision?
     */
    get tokenVision(): boolean;

    /**
     * The configured options used for the saved fog-of-war texture.
     */
    get textureConfiguration(): FogTextureConfiguration;

    /**
     * Optional overrides for exploration sprite dimensions.
     */
    set explorationRect(rect: FogTextureConfiguration);

    /**
     * Initialize all Token vision sources which are present on this layer
     */
    initializeSources(): void;

    /**
     * Initialize the vision mode.
     */
    initializeVisionMode(): void;

    protected override _draw(options?: Record<string, unknown>): Promise<void>;

    protected override _tearDown(options?: Record<string, unknown>): Promise<void>;

    /**
     * Update the display of the sight layer.
     * Organize sources into rendering queues and draw lighting containers for each source
     */
    refresh(): void;

    /**
     * Update vision (and fog if necessary)
     */
    refreshVisibility(): void;

    /**
     * Reset the exploration container with the fog sprite
     */
    resetExploration(): void;

    /**
     * Restrict the visibility of certain canvas assets (like Tokens or DoorControls) based on the visibility polygon
     * These assets should only be displayed if they are visible given the current player's field of view
     */
    restrictVisibility(): void;

    /**
     * Test whether a target point on the Canvas is visible based on the current vision and LOS polygons.
     * @param point   - The point in space to test, an object with coordinates x and y.
     * @param options - Additional options which modify visibility testing.
     * @returns Whether the point is currently visible.
     */
    testVisibility(
      point: Point,
      options?: InexactPartial<{
        /**
         * A numeric radial offset which allows for a non-exact match.
         * For example, if tolerance is 2 then the test will pass if the point
         * is within 2px of a vision polygon.
         */
        tolerance: number;

        /**
         * An optional reference to the object whose visibility is being tested
         */
        object: PlaceableObject | null;
      }>,
    ): boolean;

    /**
     * Create the visibility test config.
     * @param point   - The point in space to test, an object with coordinates x and y.
     * @param options - Additional options which modify visibility testing.
     */
    _createVisibilityTestConfig(point: Point, options?: InexactPartial<{
      /**
       * A numeric radial offset which allows for a non-exact match.
       * For example, if tolerance is 2 then the test will pass if the point
       * is within 2px of a vision polygon
       * @defaultValue `2`
       */
      tolerance: number;

      /**
       * An optional reference to the object whose visibility is being tested
       */
      object: PlaceableObject | null;
    }>): CanvasVisibilityTestConfig;

    /**
     * @deprecated since v11, will be removed in v13
     * @remarks `"fogOverlay is deprecated in favor of visibilityOverlay"`
     */
    get fogOverlay(): this["visibilityOverlay"];
  }

  namespace CanvasVisibility {
    type LightingVisibility = ValueOf<typeof VisionMode.LIGHTING_VISIBILITY>;
  }

  interface FogTextureConfiguration {
    resolution: number;
    width: number;
    height: number;
    mipmap: PIXI.MIPMAP_MODES;
    multisample: PIXI.MSAA_QUALITY;
    scaleMode: PIXI.SCALE_MODES;
    alphaMode: PIXI.ALPHA_MODES;
    format: PIXI.FORMATS;
  }

  interface CanvasVisibilityTest {
    point: PIXI.Point;
    los: Map<foundry.canvas.sources.PointVisionSource.Any, boolean>;
  }

  interface CanvasVisibilityTestConfig {
    object: PlaceableObject | null;
    tests: CanvasVisibilityTest[];
  }
}
