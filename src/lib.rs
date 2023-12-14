extern crate startin;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub struct DT {
    t: startin::Triangulation,
}

#[wasm_bindgen]
impl DT {
    pub fn new() -> DT {
        let dt = startin::Triangulation::new();
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
        self.t.all_finite_edges()
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

    pub fn all_voronoi_edges(&self) -> Vec<f64> {
        let mut edges: Vec<f64> = Vec::new();
        let pts = self.t.all_vertices();
        let trs = self.t.all_finite_triangles();
        for each in trs.iter() {
            let cc =
                startin::geom::circle_centre(&pts[each.v[0]], &pts[each.v[1]], &pts[each.v[2]]);
            let adjs = self.t.adjacent_triangles_to_triangle(&each).unwrap();
            for adj in &adjs {
                if self.t.is_finite(adj) == true {
                    edges.push(cc[0]);
                    edges.push(cc[1]);
                    let cc2 = startin::geom::circle_centre(
                        &pts[adj.v[0]],
                        &pts[adj.v[1]],
                        &pts[adj.v[2]],
                    );
                    edges.push(cc2[0]);
                    edges.push(cc2[1]);
                } else {
                    let a: usize;
                    let b: usize;
                    if adj.v[0] == 0 {
                        a = adj.v[1];
                        b = adj.v[2];
                    } else if adj.v[1] == 0 {
                        a = adj.v[2];
                        b = adj.v[0];
                    } else {
                        a = adj.v[0];
                        b = adj.v[1];
                    }
                    let mut mid: Vec<f64> = Vec::new();
                    mid.push((pts[a][0] + pts[b][0]) / 2.0);
                    mid.push((pts[a][1] + pts[b][1]) / 2.0);
                    // if outside triangle reverse
                    let mut v: Vec<f64> = Vec::new();
                    if startin::geom::orient2d_fast(&pts[b], &pts[a], &cc) >= 0 {
                        v.push(100. * (mid[0] - cc[0]));
                        v.push(100. * (mid[1] - cc[1]));
                    } else {
                        v.push(100. * (cc[0] - mid[0]));
                        v.push(100. * (cc[1] - mid[1]));
                    }
                    edges.push(cc[0]);
                    edges.push(cc[1]);
                    edges.push(cc[0] + v[0]);
                    edges.push(cc[1] + v[1]);
                }
            }
        }
        edges
    }

    pub fn closest_point(&self, px: f64, py: f64) -> usize {
        let re = self.t.closest_point(px, py);
        if re.is_err() {
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
