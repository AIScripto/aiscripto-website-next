import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from '../pages/Events';
import DemoBookingModal from '../components/DemoBookingModal';
import { productsData } from '../data/products';

vi.mock('../utils/service', () => ({ sendQuote: vi.fn().mockResolvedValue({ status: 200 }) }));

// jsdom lacks IntersectionObserver, which motion's whileInView relies on.
class IO { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
(globalThis as unknown as { IntersectionObserver: typeof IO }).IntersectionObserver ??= IO;

describe('Events page', () => {
  it('moves events dated before today into "Past Sessions" and shows a notify state', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-11-05T12:00:00Z'));
    try {
      render(<MemoryRouter><Events /></MemoryRouter>);
      expect(screen.getByRole('heading', { name: 'Past Sessions' })).toBeDefined();
      expect(screen.getAllByText('Past session').length).toBe(4);
      expect(screen.getByText(/Our next sessions are being scheduled/i)).toBeDefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it('lists a future-dated event as upcoming', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-01-01T12:00:00Z'));
    try {
      render(<MemoryRouter><Events /></MemoryRouter>);
      expect(screen.queryByText(/being scheduled/i)).toBeNull();
      expect(screen.getAllByText(/Save my spot/i).length).toBe(4);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('DemoBookingModal', () => {
  it('lists only real catalog products (no retired Calibr option)', () => {
    render(<DemoBookingModal isOpen onClose={() => {}} />);
    const select = screen.getByLabelText(/Product of Interest/i) as HTMLSelectElement;
    expect(select.options.length).toBe(productsData.length);
    expect(Array.from(select.options).some((o) => /calibr/i.test(o.textContent ?? ''))).toBe(false);
  });

  it('falls back to a valid product when given an unknown default', () => {
    render(<DemoBookingModal isOpen onClose={() => {}} defaultProduct="does-not-exist" />);
    const select = screen.getByLabelText(/Product of Interest/i) as HTMLSelectElement;
    expect(select.value).toBe(productsData[0].id);
  });

  it('is an accessible dialog that closes on Escape', () => {
    const onClose = vi.fn();
    render(<DemoBookingModal isOpen onClose={onClose} />);
    expect(screen.getByRole('dialog')).toBeDefined();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('does not send honeypot (bot) submissions', async () => {
    const { sendQuote } = await import('../utils/service');
    render(<DemoBookingModal isOpen onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText('Website'), { target: { value: 'spam.example' } });
    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: 'Bot' } });
    fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'bot@example.com' } });
    fireEvent.submit(screen.getByLabelText(/Your Name/i).closest('form')!);
    expect(sendQuote).not.toHaveBeenCalled();
  });
});

describe('RoiCalculator', () => {
  it('estimates missed-call revenue from the inputs', async () => {
    const { estimateLostRevenue } = await import('../components/RoiCalculator');
    // 10 calls/week x 50% x $100 = $500/week -> $26,000/year, ~$2,167/month
    expect(estimateLostRevenue({ missedCallsPerWeek: 10, bookingRatePct: 50, averageJobValue: 100 })).toEqual({ perMonth: 2167, perYear: 26000 });
  });

  it('updates the estimate and the contact link as the visitor types', async () => {
    const { default: RoiCalculator } = await import('../components/RoiCalculator');
    render(
      <MemoryRouter>
        <RoiCalculator context="Test" defaults={{ missedCallsPerWeek: 10, bookingRatePct: 50, averageJobValue: 100 }} />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('roi-per-year').textContent).toContain('$26,000');
    fireEvent.change(screen.getByLabelText(/Average job/i), { target: { value: '200' } });
    expect(screen.getByTestId('roi-per-year').textContent).toContain('$52,000');
    const link = screen.getByRole('link', { name: /Book a demo/i });
    expect(decodeURIComponent(link.getAttribute('href') ?? '')).toContain('$52,000/year');
  });
});
