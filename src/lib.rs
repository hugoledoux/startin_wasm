mod utils;

use startin::Triangulation;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct DT {
    t: Triangulation,
}

#[wasm_bindgen]
impl DT {
    pub fn new() -> DT {
        let dt = Triangulation::new();
        DT { t: dt }
    }

    pub fn insert_one_pt(&mut self, px: f64, py: f64, pz: f64) -> bool {
        let _re = self.t.insert_one_pt(px, py, pz);
        true
    }

    pub fn number_of_vertices(&self) -> usize {
        self.t.number_of_vertices()
    }

    pub fn number_of_triangles(&self) -> usize {
        self.t.number_of_triangles()
    }

    pub fn all_vertices(&self) -> Vec<f64> {
        let mut pts: Vec<f64> = Vec::new();
        let opts = self.t.all_vertices();
        for each in opts.iter() {
            pts.push(each[0]);
            pts.push(each[1]);
        }
        pts
    }

    pub fn all_triangles(&self) -> Vec<usize> {
        let mut trs: Vec<usize> = Vec::new();
        let otrs = self.t.all_triangles();
        for each in otrs.iter() {
            trs.push(each.tr0);
            trs.push(each.tr1);
            trs.push(each.tr2);
        }
        trs
    }
}
