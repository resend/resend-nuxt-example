import { vi } from "vitest";

process.env.RESEND_API_KEY = "test-api-key";

vi.mock("resend", () => {
  const mockResend = {
    emails: {
      send: vi.fn(),
    },
  };

  return {
    Resend: vi.fn(() => mockResend),
  };
});
