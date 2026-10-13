/**
 * Tests for the Claude model helpers.
 * Run: npx tsx --test src/lib/ai/models.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert";
import {
  ClaudeRefusalError,
  claudeRequestOptions,
  getResponseText,
  modelDisplayName,
  normalizeDraftModel,
} from "./models";

describe("normalizeDraftModel", () => {
  it("accepts current and legacy values", () => {
    assert.strictEqual(normalizeDraftModel("opus"), "opus");
    assert.strictEqual(normalizeDraftModel("sonnet"), "sonnet");
    assert.strictEqual(normalizeDraftModel("opus-4.6"), "opus");
    assert.strictEqual(normalizeDraftModel("sonnet-4.6"), "sonnet");
  });

  it("rejects unknown values", () => {
    assert.strictEqual(normalizeDraftModel("gpt-4"), undefined);
    assert.strictEqual(normalizeDraftModel(undefined), undefined);
  });
});

describe("modelDisplayName", () => {
  it("formats versioned and dated IDs", () => {
    assert.strictEqual(modelDisplayName("claude-opus-5-5"), "Claude Opus 5.5");
    assert.strictEqual(modelDisplayName("claude-sonnet-5"), "Claude Sonnet 5");
    assert.strictEqual(modelDisplayName("claude-haiku-4-5-20251001"), "Claude Haiku 4.5");
  });
});

describe("getResponseText", () => {
  it("skips leading thinking blocks", () => {
    const text = getResponseText({
      content: [
        { type: "thinking", thinking: "", signature: "x" } as { type: string },
        { type: "text", text: "{\"ok\":true}" } as { type: string },
      ],
      stop_reason: "end_turn",
    });
    assert.strictEqual(text, "{\"ok\":true}");
  });

  it("returns null when there is no text", () => {
    assert.strictEqual(getResponseText({ content: [], stop_reason: "end_turn" }), null);
  });

  it("throws on refusal", () => {
    assert.throws(
      () => getResponseText({ content: [], stop_reason: "refusal", stop_details: { category: "cyber" } }),
      ClaudeRefusalError
    );
  });
});

describe("claudeRequestOptions", () => {
  it("adds the server-side fallback only where supported", () => {
    assert.deepStrictEqual(claudeRequestOptions("claude-opus-5-5", "medium"), {
      output_config: { effort: "medium" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    });
    assert.deepStrictEqual(claudeRequestOptions("claude-sonnet-4-6", "low"), {
      output_config: { effort: "low" },
    });
  });
});
