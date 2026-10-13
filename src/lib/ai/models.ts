/**
 * Single source of truth for the Claude models this app calls.
 *
 * Each ID can be overridden per environment (e.g. to pin or roll back a model
 * without a code change). Overrides must be Claude 4.6+ models for Opus/Sonnet
 * and a Claude 5.x model for Haiku: requests send `output_config.effort`, which
 * older models (e.g. Haiku 4.5) reject.
 */
export const CLAUDE_OPUS_MODEL = process.env.CLAUDE_OPUS_MODEL || "claude-opus-5-5";
export const CLAUDE_SONNET_MODEL = process.env.CLAUDE_SONNET_MODEL || "claude-sonnet-5-5";
export const CLAUDE_HAIKU_MODEL = process.env.CLAUDE_HAIKU_MODEL || "claude-haiku-5-5";

/** Draft model choice exposed in the Content Writer UI. */
export type DraftModel = "opus" | "sonnet";

export const DRAFT_MODEL_IDS: Record<DraftModel, string> = {
  opus: CLAUDE_OPUS_MODEL,
  sonnet: CLAUDE_SONNET_MODEL,
};

/** Human-readable name for a model ID, e.g. "claude-opus-5-5" -> "Claude Opus 5.5". */
export function modelDisplayName(modelId: string): string {
  const m = /^claude-([a-z]+)-(\d+)(?:-(\d{1,2}))?(?:-|$)/.exec(modelId);
  if (!m) return modelId;
  const family = m[1].charAt(0).toUpperCase() + m[1].slice(1);
  return `Claude ${family} ${m[3] ? `${m[2]}.${m[3]}` : m[2]}`;
}

/**
 * Normalizes a stored or submitted draft model. Accepts the legacy
 * "opus-4.6" / "sonnet-4.6" values still present in saved jobs and history.
 */
export function normalizeDraftModel(value: unknown): DraftModel | undefined {
  if (value === "opus" || value === "opus-4.6") return "opus";
  if (value === "sonnet" || value === "sonnet-4.6") return "sonnet";
  return undefined;
}

export type Effort = "low" | "medium" | "high" | "xhigh" | "max";

/**
 * Claude 5 models think adaptively and thinking tokens count toward max_tokens.
 * Streaming calls add this headroom so the visible answer is not truncated.
 */
export const THINKING_HEADROOM_TOKENS = 16_000;

/** Models that accept the server-side refusal fallback (`fallbacks: "default"`). */
function supportsServerFallback(model: string): boolean {
  return /^claude-(opus-5|sonnet-5-5|fable-5)/.test(model);
}

/**
 * Per-request options for the beta Messages API: an explicit effort level, plus
 * the server-side refusal fallback on models that support it, so a safety
 * classifier decline is retried on a fallback model instead of failing the job.
 */
export function claudeRequestOptions(model: string, effort: Effort) {
  return {
    output_config: { effort },
    ...(supportsServerFallback(model)
      ? { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const }
      : {}),
  };
}

/** Raised when Claude declines a request (`stop_reason: "refusal"`). */
export class ClaudeRefusalError extends Error {
  constructor(public readonly category: string | null) {
    super(
      `Claude declined this request${category ? ` (${category})` : ""}. Try rephrasing the input.`
    );
    this.name = "ClaudeRefusalError";
  }
}

type ResponseLike = {
  content?: ReadonlyArray<{ type: string }> | null;
  stop_reason?: string | null;
  stop_details?: { category?: string | null } | null;
};

/**
 * Returns the response's text. Claude 5 responses can begin with thinking (and
 * fallback) blocks, so the text is found by type rather than read from
 * content[0]. Throws ClaudeRefusalError when the model declined.
 */
export function getResponseText(message: ResponseLike): string | null {
  if (message.stop_reason === "refusal") {
    throw new ClaudeRefusalError(message.stop_details?.category ?? null);
  }
  const texts = (message.content ?? [])
    .filter((block): block is { type: "text"; text: string } => block.type === "text")
    .map((block) => block.text);
  return texts.length > 0 ? texts.join("") : null;
}
