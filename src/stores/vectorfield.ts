import Vector2 from "$lib/vector2";
import {noiseSeed, noise} from '$lib/perlin-noise'
import { writable, derived, readable } from "svelte/store";
import type { Writable, Readable } from "svelte/store";

export const rowCount: Writable<number> = writable(0);
export const columnCount: Writable<number> = writable(0);

function createField(r: number, c: number): Array<Array<Vector2>> {
    if (r == 0 || c == 0)
    {
        return [[],[]];
    }

    var vectors: Array<Array<Vector2>> = [[],[]];    

    let xOff: number = 0;
    let yOff: number = 0;

    for(var y = 0; y < r; y++) {
        vectors[y] = [];
        xOff = 0;
        for(var x = 0; x < c; x++) {
                        
            var n = noise(yOff, xOff);
            //var n = Math.random();

            vectors[y][x] = 
                new Vector2(
                    Math.cos(n*2*Math.PI), 
                    Math.sin(n*2*Math.PI));
            
            xOff += 0.1;
        }
        
        yOff += 0.1;
    }
    
    return vectors;
}

export const field: Readable<Array<Array<Vector2>>> = derived([rowCount, columnCount], ([$rows, $cols], set) => {
    var vectors = createField($rows, $cols);
    set(vectors);
})