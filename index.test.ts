import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { getAvailableArticleIndex, packArticles } from "./index.ts";

Deno.test("getAvailableArticleIndex", () => {
  assertEquals(getAvailableArticleIndex(5, [7]), undefined);
  assertEquals(getAvailableArticleIndex(5, [2, 3]), 1);
  assertEquals(getAvailableArticleIndex(5, [2]), 0);
});

Deno.test("packArticles", () => {
  assertThrows(() => packArticles([7], 2));
  assertEquals(packArticles([], 5), []);
  assertEquals(packArticles([3, 2], 5), [[3, 2]]);
  assertEquals(packArticles([2], 5), [[2]]);
  assertEquals(
    packArticles([9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 3, 3, 2, 1, 1], 10).length,
    8
  );
});
