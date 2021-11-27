

export type CollectionCb<V> = (value: V, key: string) => boolean|undefined;

/**
 * A `Map` but with more methods.
 */
export class Collection<V> extends Map<string, V> {

    find(cb: CollectionCb<V>) : V|undefined {
        for (const [key, val] of this) {
            if (cb(val, key)) return val;
        }
        return undefined;
    }
    
    filter(cb: CollectionCb<V>) : Collection<V> {
        const res = new Collection<V>();
        for (const [key, val] of this) {
            if (cb(val, key)) res.set(key, val);
        }
        return res;
    }

    filterArray(cb: CollectionCb<V>) : Array<V> {
        const res = [];
        for (const [key, val] of this) {
            if (cb(val, key)) res.push(val);
        }
        return res;
    }

    map<T>(cb: (value: V, key: string) => T) : Array<T> {
        const res = [];
        for (const [key, val] of this) {
            res.push(cb(val, key));
        }
        return res;
    }

    some(cb: CollectionCb<V>) : boolean {
        for (const [key, val] of this) {
            if (cb(val, key)) return true;
        }
        return false;
    }

    every(cb: CollectionCb<V>) : boolean {
        for (const [key, val] of this) {
            if (!cb(val, key)) return false;
        }
        return true;
    }

    partition(cb: CollectionCb<V>) : [Collection<V>, Collection<V>] {
        const approved = new Collection<V>();
        const denied = new Collection<V>();
        for (const [key, val] of this) {
            if (cb(val, key)) approved.set(key, val);
            else denied.set(key, val);
        }
        return [approved, denied];
    }

    randomVal(): V;
    randomVal(amount = 1, filter?: CollectionCb<V>) : V|Array<V> {
        const arr = filter ? this.filterArray(filter):this.valArray();
        if (amount <= 1) return arr[Math.floor(Math.random() * arr.length)];
        return Array.from({length: amount}, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    valArray() : Array<V> {
        return [...this.values()];
    }
} 