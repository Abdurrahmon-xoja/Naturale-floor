declare module 'pannellum' {
  interface PannellumConfig {
    type?: string;
    panorama?: string;
    autoLoad?: boolean;
    autoRotate?: number;
    showControls?: boolean;
    compass?: boolean;
    mouseZoom?: boolean;
    hfov?: number;
    [key: string]: unknown;
  }

  interface PannellumViewer {
    destroy(): void;
  }

  function viewer(container: HTMLElement | null, config: PannellumConfig): PannellumViewer;

  export default { viewer };
}
