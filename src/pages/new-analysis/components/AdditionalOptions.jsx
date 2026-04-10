import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AdditionalOptions = ({ 
  metroAccess, 
  onMetroAccessChange, 
  timeline, 
  onTimelineChange 
}) => {
  const timelineOptions = [
    { value: '3-months', label: '3 Months', description: 'Quick launch' },
    { value: '6-months', label: '6 Months', description: 'Standard timeline' },
    { value: '9-months', label: '9 Months', description: 'Detailed planning' },
    { value: '12-months', label: '12+ Months', description: 'Long-term preparation' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon name="Train" size={20} className="text-primary" />
          <label className="text-sm font-medium text-foreground">
            Location Preferences
          </label>
        </div>
        
        <Checkbox
          label="Near Metro Station"
          description="Prioritize locations within 500m of metro connectivity"
          checked={metroAccess}
          onChange={(e) => onMetroAccessChange(e?.target?.checked)}
          className="mt-2"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <label className="text-sm font-medium text-foreground">
            Target Opening Timeline
          </label>
        </div>
        <Select
          options={timelineOptions}
          value={timeline}
          onChange={onTimelineChange}
          placeholder="Select your launch timeline"
          description="When do you plan to open your restaurant?"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AdditionalOptions;