import { renderHook, act } from '@testing-library/react';
import {useDebounce} from '../../hooks/UseDebounce.tsx';

vi.useFakeTimers(); // Mock timers

describe('useDebounce Hook', () => {
    it('returns initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });

    it('delays updating the debounced value', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: 'initial' },
        });

        rerender({ value: 'updated' });
        expect(result.current).toBe('initial'); // Value should not update immediately

        act(() => {
            vi.advanceTimersByTime(500); // Fast-forward
        });

        expect(result.current).toBe('updated');
    });

    it('resets debounce timer on rapid value changes', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: 'first' },
        });

        rerender({ value: 'second' });
        vi.advanceTimersByTime(300); // Not enough to trigger update
        rerender({ value: 'third' });
        vi.advanceTimersByTime(300); // Still not enough

        expect(result.current).toBe('first'); // Debounce reset

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('third');
    });

    it('uses default delay of 300ms if not provided', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'start' },
        });

        rerender({ value: 'new value' });

        act(() => {
            vi.advanceTimersByTime(299); // Not enough time
        });
        expect(result.current).toBe('start'); // Still holds the old value

        act(() => {
            vi.advanceTimersByTime(1); // Now it should update
        });

        expect(result.current).toBe('new value');
    });

    it('cleans up timers on unmount', () => {
        const { unmount } = renderHook(() => useDebounce('test', 500));

        act(() => {
            unmount();
        });

        expect(vi.getTimerCount()).toBe(0); // No timers should be pending
    });
});
