declare module "onnxruntime-web" {
  export class Tensor {
    constructor(type: "float32" | "int32" | "bool", data: Float32Array | Int32Array | Uint8Array, dims: number[]);
    // TypeScript doesn't know about 'data', so we add it
    data: Float32Array | Int32Array | Uint8Array;
    dims: number[];
    type: "float32" | "int32" | "bool";
  }

  export class InferenceSession {
    constructor();
    static create(modelUrl: string): Promise<InferenceSession>;
    run(feeds: Record<string, Tensor>): Promise<Record<string, Tensor>>;
  }
}
