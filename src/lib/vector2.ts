export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    divide(scalar: number) {
        return new Vector2(this.x / scalar, this.y / scalar);
    };

    multiply(scalar: number) {
        return new Vector2(this.x * scalar, this.y * scalar);
    };

    scalarProduct(other: Vector2): number {
        return (this.x * other.x) + (this.y * other.y);
    }

    minus(other: Vector2 ): Vector2 {
        return new Vector2(
            this.x - other.x,
            this.y - other.y
        )
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        var result = this.divide(this.magnitude());
        return result;
    }
}