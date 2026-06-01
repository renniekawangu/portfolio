/**
 * Read Time Calculator for Blog Posts
 * Estimates reading time based on word count (~200 words per minute)
 */

const WORDS_PER_MINUTE = 200

/**
 * Counts words in text, excluding code blocks
 */
export function countWords(text: string): number {
  // Remove code blocks (triple backticks)
  let cleaned = text.replace(/```[\s\S]*?```/g, '')

  // Remove inline code
  cleaned = cleaned.replace(/`[^`]*`/g, '')

  // Remove markdown formatting
  cleaned = cleaned.replace(/[#\*_\[\]\(\)\!\-\+\=]/g, ' ')

  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '')

  // Split by whitespace and count non-empty words
  const words = cleaned.trim().split(/\s+/).filter(word => word.length > 0)

  return words.length
}

/**
 * Calculates estimated read time from text
 * Returns formatted string like "5 min read"
 */
export function calculateReadTime(text: string): string {
  const wordCount = countWords(text)
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return `${minutes} min read`
}

/**
 * Calculates read time but allows manual override
 */
export function getReadTime(text: string, override?: string): string {
  if (override && override.trim()) {
    return override
  }
  return calculateReadTime(text)
}

/**
 * Provides detailed read time statistics
 */
export function getReadTimeStats(text: string) {
  const wordCount = countWords(text)
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  const seconds = Math.round((wordCount / WORDS_PER_MINUTE) * 60)

  return {
    wordCount,
    estimatedMinutes: minutes,
    estimatedSeconds: seconds,
    readTimeString: `${minutes} min read`,
    // For detailed display
    readTimeVerbose: minutes === 1 ? '1 minute read' : `${minutes} minutes read`
  }
}

const readTimeUtils = {
  countWords,
  calculateReadTime,
  getReadTime,
  getReadTimeStats
}

export default readTimeUtils
