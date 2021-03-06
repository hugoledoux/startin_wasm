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

    pub fn all_edges(&self) -> Vec<usize> {
        self.t.all_edges()
    }

    pub fn all_triangles(&self) -> Vec<usize> {
        let mut trs: Vec<usize> = Vec::new();
        let otrs = self.t.all_triangles();
        for each in otrs.iter() {
            trs.push(each.v[0]);
            trs.push(each.v[1]);
            trs.push(each.v[2]);
        }
        trs
    }

    pub fn closest_point(&self, px: f64, py: f64) -> usize {
        let re = self.t.closest_point(px, py);
        if re.is_none() {
            return 0;
        } else {
            return re.unwrap();
        }
    }

    pub fn remove(&mut self, v: usize) -> bool {
        let re = self.t.remove(v);
        if re.is_err() == true {
            return false;
        } else {
            return true;
        }
    }
}
