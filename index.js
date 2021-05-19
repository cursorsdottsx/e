(function() {
    Object.defineProperty(Object, "equals", {
        configurable: false,
        enumerable: false,
        value: function equals(a, b) {
            if (Number.isNaN(a)) return Number.isNaN(b);

            if (a === undefined) return b === undefined;

            if (a === null) return b === null;

            if (["string", "number", "boolean", "bigint", "symbol"].includes(typeof a)) return a === b;

            if (typeof a === "function") {
                if (typeof b !== "function") return false;

                return a.toString() === b.toString();
            }

            const aKeys = Reflect.ownKeys(a);
            const bKeys = Reflect.ownKeys(b);

            if (aKeys.some((k) => !bKeys.includes(k))) return false;
            if (bKeys.some((k) => !aKeys.includes(k))) return false;

            for (const k of aKeys) {
                if (!equals(a[k], b[k])) return false;
            }

            return true;
        },
    });
})();
