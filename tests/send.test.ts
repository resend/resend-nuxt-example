import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Resend } from "resend";

vi.mock("resend");

global.defineEventHandler = vi.fn((handler) => handler);

describe("/api/send", () => {
  let mockResend: any;
  let mockSend: any;
  let handler: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    mockSend = vi.fn();
    mockResend = {
      emails: {
        send: mockSend,
      },
    };

    vi.mocked(Resend).mockImplementation(() => mockResend);

    process.env.RESEND_API_KEY = "test-api-key";

    const module = await import("../server/api/send");
    handler = module.default;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  const createMockEvent = () => ({
    node: {
      req: {},
      res: {},
    },
    context: {},
    headers: {},
    method: "GET",
    path: "/api/send",
    query: {},
    body: undefined,
  });

  it("sends email successfully", async () => {
    const expectedResponse = {
      id: "d36ce1fb-1d1a-4ef9-973a-6d158c254fb1",
    };
    mockSend.mockResolvedValue(expectedResponse);

    const mockEvent = createMockEvent();

    const result = await handler(mockEvent);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      html: "<strong>It works!</strong>",
    });
    expect(result).toEqual(expectedResponse);
  });

  it("handles email sending error", async () => {
    const error = new Error("Failed to send email");
    mockSend.mockRejectedValue(error);

    const mockEvent = createMockEvent();

    const result = await handler(mockEvent);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ error });
  });
});
