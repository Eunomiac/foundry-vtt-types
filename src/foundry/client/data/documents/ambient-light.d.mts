import type { ConfiguredDocumentClassForName } from "../../../../types/helperTypes.d.mts";
import type { DocumentModificationOptions } from "../../../common/abstract/document.d.mts";

export {};

declare global {
  /**
   * The client-side AmbientLight document which extends the common BaseAmbientLight model.
   *
   * @see {@link Scene}                     The Scene document type which contains AmbientLight documents
   * @see {@link AmbientLightConfig}        The AmbientLight configuration application
   */
  class AmbientLightDocument extends CanvasDocumentMixin(foundry.documents.BaseAmbientLight) {
    protected override _onUpdate(
      changed: foundry.documents.BaseAmbientLight.UpdateData,
      options: DocumentModificationOptions,
      userId: string,
    ): void;

    /**
     * Is this ambient light source global in nature?
     */
    get isGlobal(): boolean;
  }

  namespace AmbientLightDocument {
    type ConfiguredInstance = InstanceType<ConfiguredDocumentClassForName<"AmbientLight">>;
  }
}
