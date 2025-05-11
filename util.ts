namespace PlayTogether.Util {
    export function findIndex<T>(
        array: T[],
        predicate: (value: T, index: number, array: T[]) => boolean
    ): number {
        for (let i = 0; i < array.length; i++) {
            if (predicate(array[i], i, array)) {
                return i;
            }
        }
        return -1;
    }
}
