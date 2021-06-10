
# startin_wasm

## To compile and run locally:

1. install [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
2. `wasm-pack build -t web --out-dir ./www/pkg/`
3. `cd ./www/`
4. `python -m http.server 8080` (or any local webserver will do)
5. with your browser go to http://localhost:8080/

## Online demo

[==> demo](https://hugoledoux.github.io/startin_wasm/)