<script>
    import {Layer} from "svelte-canvas";
    import {rowCount, columnCount} from "../stores/vectorfield";

    const render = ({context, width, height}) => {
        
        context.fillStyle ="#eeeeee";
        context.fillRect(0, 0, width, height);

        const cellWidth = width / $columnCount;
        const cellHeight = height / $rowCount;

        for(var i = 0; i < $rowCount; i++) {
            const y = i*cellHeight;                 
            for(var j = 0; j < $columnCount; j++) {
                const x = j*cellWidth;

                context.fillStyle = "white";
                context.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
            }
        }
    }
</script>

<Layer {render}/>


