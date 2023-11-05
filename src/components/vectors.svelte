<script lang="ts">
    import {Layer} from "svelte-canvas";
    import {rowCount, columnCount, field} from "../stores/vectorfield";

    function render({context, width, height}) {
        const cellWidth = width / $columnCount;
        const cellHeight = height / $rowCount;

        context.fillStyle = "black";

        for(var i = 0; i < $rowCount; i++) {
            const y = (i + 0.5)*cellHeight;                 
            
            for(var j = 0; j  < $columnCount; j++) {
                const x = (j + 0.5)*cellWidth;    
                
                context.beginPath();
                //context.arc(x, y, cellWidth*0.5, 2*Math.PI, false);
                context.moveTo(x, y);
                context.arc(x, y, 1, 2*Math.PI, false);
                var v = $field[i][j].normalize().multiply(cellWidth*0.5);
                context.moveTo(x, y);
                context.lineTo(x + v.x, y - v.y);
                context.stroke();
            }
        }
    }

</script>

<Layer {render}/>