<script>
    import {Canvas, Layer} from "svelte-canvas";
    import {onMount} from "svelte";
    import Grid from "./grid.svelte";
    import Vectors from "./vectors.svelte";
    import Shades from "./shades.svelte";
    import {rowCount, columnCount, field} from '../stores/vectorfield';
    
    let isLoading = true;
    let canvasHeight = 1000;
    let canvasWidth = 1000;
    
    onMount(() => {
        $rowCount = 50;
        $columnCount = 50;

        // setInterval(() => {
        
        // }, 200);
        
        isLoading = false;        
    })

    

</script>
    
{#if isLoading}
    Vent a...
{:else} 

    <Canvas autoplay width={canvasWidth} height={canvasHeight}>
        <!-- <Grid/>            -->
        
        <Shades/>
        <!-- <Vectors/> -->
        <!-- {#each cells as cell} 
            <CellView {cell}/>        
        {/each} -->
    </Canvas>
{/if}

