import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Select } from './ui/Select';
import { FilterState } from '../types/analytics';
import { filterOptions } from '../utils/mockData';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange
}) => {
  const updateFilter = (key: keyof FilterState, value: string | string[]) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Select
            value={filters.weekQuarterYear}
            onChange={(value) => updateFilter('weekQuarterYear', value)}
            options={filterOptions.weekQuarterYear}
            placeholder="Fiscal Week"
            multiple
          />
          
          <Select
            value={filters.quarterYear}
            onChange={(value) => updateFilter('quarterYear', value)}
            options={filterOptions.quarterYear}
            placeholder="Fiscal Quarter"
            multiple
          />

          <Select
            value={filters.surface}
            onChange={(value) => updateFilter('surface', value)}
            options={filterOptions.surface}
            placeholder="Surface"
            multiple
          />

          <Select
            value={filters.subsurface}
            onChange={(value) => updateFilter('subsurface', value)}
            options={filterOptions.subsurface}
            placeholder="Sub-Surface"
            multiple
          />

          <Select
            value={filters.region}
            onChange={(value) => updateFilter('region', value)}
            options={filterOptions.regions}
            placeholder="Geos"
            multiple
          />
          
          <Select
            value={filters.country}
            onChange={(value) => updateFilter('country', value)}
            options={filterOptions.countries}
            placeholder="Market Area"
            multiple
          />
          
          <Select
            value={filters.productType}
            onChange={(value) => updateFilter('productType', value)}
            options={filterOptions.productTypes}
            placeholder="Product"
            multiple
          />
          
          <Select
            value={filters.loggedInStatus}
            onChange={(value) => updateFilter('loggedInStatus', value)}
            options={filterOptions.loggedInStatus}
            placeholder="Logged in Status"
            multiple
          />

          <Select
            value={filters.entitlementType}
            onChange={(value) => updateFilter('entitlementType', value)}
            options={filterOptions.entitlementTypes}
            placeholder="Entitlement"
            multiple
          />
          
          <Select
            value={filters.segment}
            onChange={(value) => updateFilter('segment', value)}
            options={filterOptions.segments}
            placeholder="Segment"
            multiple
          />

          <Select
            value={filters.entrypage}
            onChange={(value) => updateFilter('entrypage', value)}
            options={filterOptions.entrypage}
            placeholder="Entry Page"
            multiple
          />

          <Select
            value={filters.purchasetype}
            onChange={(value) => updateFilter('purchasetype', value)}
            options={filterOptions.purchasetype}
            placeholder="Purchase Type"
            multiple
          />

          <Select
            value={filters.devices}
            onChange={(value) => updateFilter('devices', value)}
            options={filterOptions.devices}
            placeholder="Device"
            multiple
          />

          <Select
            value={filters.marketingchannel}
            onChange={(value) => updateFilter('marketingchannel', value)}
            options={filterOptions.marketingchannel}
            placeholder="LTC"
            multiple
          />
        </div>
      </CardContent>
    </Card>
  );
};