<script lang="ts">
    import {Layer} from "svelte-canvas";
    import Vector2 from "../lib/vector2";
    import {rowCount, columnCount, field} from "../stores/vectorfield";
    import {fade, lerp} from "../lib/shading";

    function render({context, width, height}) {
        
        const dpr = window.devicePixelRatio;
        const deviceWidth = width*dpr;
        const deviceHeight = width*dpr;

        const imageData = context.getImageData(0, 0, deviceWidth, deviceHeight);
        const data = imageData.data;

        const cellWidth = deviceWidth / ($columnCount - 1);
        const cellHeight = deviceHeight / ($rowCount - 1);

        for(var y = 1; y < deviceHeight; y++) {
            for (var x = 1; x < deviceWidth; x++) {
                const gridCellX = Math.floor(x / cellWidth);
                const gridCellY = Math.floor(y / cellHeight);

                const usedGradientVectors = {
                    topLeft: $field[gridCellY][gridCellX],
                    topRight: $field[gridCellY][gridCellX + 1],
                    bottomLeft: $field[gridCellY + 1][gridCellX],
                    bottomRight: $field[gridCellY + 1][gridCellX + 1]
                }

                const unitCornerVectors = {
                    topLeft: new Vector2(0, 0),
                    topRight: new Vector2(1, 0),
                    bottomLeft: new Vector2(0, 1),
                    bottomRight: new Vector2(1, 1)
                }

                const relativePos = new Vector2(
                    (x % cellWidth) / cellWidth,
                    (y % cellHeight) / cellHeight,
                )

                const distanceVectors = {
                    topLeft: relativePos.minus(unitCornerVectors.topLeft),
                    topRight: relativePos.minus(unitCornerVectors.topRight),
                    bottomLeft: relativePos.minus(unitCornerVectors.bottomLeft),
                    bottomRight: relativePos.minus(unitCornerVectors.bottomRight)
                }

                const influenceValues = {
                    topLeft: usedGradientVectors.topLeft.scalarProduct(distanceVectors.topLeft),
                    topRight: usedGradientVectors.topRight.scalarProduct(distanceVectors.topRight),
                    bottomLeft: usedGradientVectors.bottomLeft.scalarProduct(distanceVectors.bottomLeft),
                    bottomRight: usedGradientVectors.bottomRight.scalarProduct(distanceVectors.bottomRight),
                }
               
                const fadedX = fade(relativePos.x);
                const fadedY = fade(relativePos.y);

                const lerpedValue = lerp(
                    lerp(influenceValues.topLeft, influenceValues.topRight, fadedX),
                    lerp(influenceValues.bottomLeft, influenceValues.bottomRight, fadedX),
                    fadedY
                )

                const shade = (1 + lerpedValue) / 2;
               
                var index = (y + x * deviceWidth) * 4;
                data[index + 0] = shade*255;
                data[index + 1] = shade*255;
                data[index + 2] = shade*255;
                data[index + 3] = 255;
                
                
            }
        }

        context.putImageData(imageData, 0, 0);
    }

</script>

<Layer {render}/>