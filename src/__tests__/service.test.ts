import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiClient, { sendQuote, sendEmail, QuotePayload, EmailPayload } from '../utils/service';

describe('API Service Layer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch quote request with correct endpoint and payload', async () => {
    const postSpy = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      status: 200,
      data: { success: true, message: 'Quote received' },
    } as any);

    const payload: QuotePayload = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@enterprise.com',
      phone: '+14081234567',
      companyName: 'Tech Corp',
      region: 'North America',
      services: ['AI Agents & Automation'],
      message: 'Looking for autonomous AI agent implementation.',
    };

    const response = await sendQuote(payload);

    expect(postSpy).toHaveBeenCalledWith('/api/sendQuote', payload);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  });

  it('should dispatch email request with correct endpoint and payload', async () => {
    const postSpy = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      status: 200,
      data: { success: true },
    } as any);

    const emailData: EmailPayload = {
      email: 'lead@startup.io',
      name: 'Alex Smith',
      message: 'Inquiring about POS restaurant software.',
    };

    const response = await sendEmail(emailData);

    expect(postSpy).toHaveBeenCalledWith('/api/sendEmail', emailData);
    expect(response.status).toBe(200);
  });

  it('should propagate API errors for callers to handle', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce(new Error('Network Error'));

    const payload: QuotePayload = {
      firstName: 'Test',
      email: 'test@domain.com',
      services: ['DevOps & Cloud Solutions'],
      message: 'Testing error propagation',
    };

    await expect(sendQuote(payload)).rejects.toThrow('Network Error');
  });
});
