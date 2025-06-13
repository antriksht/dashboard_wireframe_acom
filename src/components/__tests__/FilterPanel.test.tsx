import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterPanel } from '../FilterPanel';
import { FilterState } from '../../types/analytics';

const baseFilters: FilterState = {
  region: [],
  country: [],
  productType: [],
  entitlementType: [],
  segment: [],
  surface: [],
  subsurface: [],
  weekQuarterYear: [],
  quarterYear: [],
  dateRange: { start: '', end: '' },
  entrypage: [],
  purchasetype: [],
  loggedInStatus: [],
  devices: [],
  marketingchannel: [],
  compareMode: false,
};

describe('FilterPanel', () => {
  it('calls onFiltersChange when surface changes', () => {
    const handleChange = vi.fn();
    render(<FilterPanel filters={baseFilters} onFiltersChange={handleChange} />);
    const surfaceButton = screen.getByRole('button', { name: 'Surface', exact: true });
    fireEvent.click(surfaceButton);
    fireEvent.click(screen.getByText('a.com'));
    expect(handleChange).toHaveBeenCalledWith({
      ...baseFilters,
      surface: ['a.com'],
    });
  });
});
