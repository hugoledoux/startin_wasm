/* tslint:disable */
/* eslint-disable */
/**
*/
export class DT {
  free(): void;
/**
* @returns {DT}
*/
  static new(): DT;
/**
* @param {number} px
* @param {number} py
* @param {number} pz
* @returns {boolean}
*/
  insert_one_pt(px: number, py: number, pz: number): boolean;
/**
* @returns {number}
*/
  number_of_vertices(): number;
/**
* @returns {number}
*/
  number_of_triangles(): number;
/**
* @returns {Float64Array}
*/
  all_vertices(): Float64Array;
/**
* @returns {Uint32Array}
*/
  all_edges(): Uint32Array;
/**
* @returns {Uint32Array}
*/
  all_triangles(): Uint32Array;
/**
* @param {number} px
* @param {number} py
* @returns {number}
*/
  closest_point(px: number, py: number): number;
/**
* @param {number} v
* @returns {boolean}
*/
  remove(v: number): boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_dt_free: (a: number) => void;
  readonly dt_new: () => number;
  readonly dt_insert_one_pt: (a: number, b: number, c: number, d: number) => number;
  readonly dt_number_of_vertices: (a: number) => number;
  readonly dt_number_of_triangles: (a: number) => number;
  readonly dt_all_vertices: (a: number, b: number) => void;
  readonly dt_all_edges: (a: number, b: number) => void;
  readonly dt_all_triangles: (a: number, b: number) => void;
  readonly dt_closest_point: (a: number, b: number, c: number) => number;
  readonly dt_remove: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
