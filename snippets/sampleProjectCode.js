/**
 * sampleProjectCode.js
 * ─────────────────────────────────────────────────────────────────
 * Sample code snippet used in the VS Code project card demonstration.
 * This file shows a JavaScript implementation of the Merge Sort
 * algorithm with a Generator function for step-by-step visualisation.
 *
 * INTERVIEW EXPLAINABILITY NOTES:
 *
 * Q: What is a generator function?
 * A: A function* that can pause its execution using `yield`.
 *    Each call to .next() runs the function until the next `yield`.
 *    This lets us animate the sort ONE STEP AT A TIME.
 *
 * Q: What is the time complexity of Merge Sort?
 * A: O(n log n) in all cases. We split the array log(n) times,
 *    and each level of merging does O(n) work.
 *
 * Q: What is the space complexity?
 * A: O(n) extra space for the temporary left/right sub-arrays.
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * Merge Sort implemented as a JavaScript Generator.
 *
 * Using a generator means we can PAUSE after each comparison
 * or swap, which allows the visualiser to animate each step.
 *
 * @param {number[]} arr  - Array to sort (sorted IN PLACE)
 * @param {number}   l    - Left index (inclusive)
 * @param {number}   r    - Right index (inclusive)
 * @yields {{ comparing: number[] } | { arr: number[] }}
 */
function* mergeSort(arr, l = 0, r = arr.length - 1) {
    // BASE CASE: a sub-array of 0 or 1 element is already sorted
    if (l >= r) return;

    // DIVIDE: find the midpoint
    const mid = Math.floor((l + r) / 2);

    // CONQUER: recursively sort both halves
    // The `yield*` delegates to a sub-generator, forwarding its yields upward
    yield* mergeSort(arr, l, mid);        // sort left half
    yield* mergeSort(arr, mid + 1, r);    // sort right half

    // COMBINE: merge the two sorted halves
    yield* merge(arr, l, mid, r);
}

/**
 * Merges two sorted sub-arrays [l..mid] and [mid+1..r] back into arr.
 * Yields each comparison and write so the visualiser can animate it.
 *
 * @param {number[]} arr
 * @param {number}   l
 * @param {number}   mid
 * @param {number}   r
 */
function* merge(arr, l, mid, r) {
    // Copy each half into a temporary array
    const left = arr.slice(l, mid + 1);   // elements from l to mid
    const right = arr.slice(mid + 1, r + 1); // elements from mid+1 to r

    let i = 0;      // pointer into `left`
    let j = 0;      // pointer into `right`
    let k = l;      // pointer into original arr

    // Compare front elements of left and right, write the smaller one
    while (i < left.length && j < right.length) {
        // Yield the two indices being compared → visualiser highlights them
        yield { comparing: [l + i, mid + 1 + j] };

        if (left[i] <= right[j]) {
            arr[k++] = left[i++];   // left element is smaller, take it
        } else {
            arr[k++] = right[j++];  // right element is smaller, take it
        }

        // Yield the updated array state → visualiser redraws bars
        yield { arr: [...arr] };
    }

    // Copy any remaining elements from the left sub-array
    while (i < left.length) {
        arr[k++] = left[i++];
        yield { arr: [...arr] };
    }

    // Copy any remaining elements from the right sub-array
    while (j < right.length) {
        arr[k++] = right[j++];
        yield { arr: [...arr] };
    }
}

// ─────────────────────────────────────────────────────────────────
// USAGE EXAMPLE
// This is how a visualiser would consume the generator
// ─────────────────────────────────────────────────────────────────

const data = [38, 27, 43, 3, 9, 82, 10];
const gen = mergeSort(data);

// Step through the algorithm manually
function step() {
    const { value, done } = gen.next();

    if (done) {
        console.log("✅ Sorted:", data);
        return;
    }

    if (value.comparing) {
        console.log("🔍 Comparing indices:", value.comparing);
    } else if (value.arr) {
        console.log("📊 Array state:", value.arr);
    }
}

// In a real visualiser you'd call step() on each animation frame:
// requestAnimationFrame(step)
