import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalysisHistoryTable = () => {
  const navigate = useNavigate();
  const [filterLocation, setFilterLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const analysisHistory = [
    {
      id: 1,
      date: "18/01/2026",
      location: "Bandra West",
      cuisine: "North Indian",
      successProbability: 78,
      status: "Completed",
      revenue: "₹45,00,000"
    },
    {
      id: 2,
      date: "15/01/2026",
      location: "Juhu",
      cuisine: "Fast Food",
      successProbability: 65,
      status: "Completed",
      revenue: "₹32,00,000"
    },
    {
      id: 3,
      date: "12/01/2026",
      location: "Colaba",
      cuisine: "Cafe",
      successProbability: 82,
      status: "Completed",
      revenue: "₹52,00,000"
    },
    {
      id: 4,
      date: "08/01/2026",
      location: "Powai",
      cuisine: "Maharashtrian",
      successProbability: 71,
      status: "Completed",
      revenue: "₹38,00,000"
    },
    {
      id: 5,
      date: "05/01/2026",
      location: "Dadar",
      cuisine: "North Indian",
      successProbability: 69,
      status: "Completed",
      revenue: "₹35,00,000"
    }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'bandra', label: 'Bandra West' },
    { value: 'juhu', label: 'Juhu' },
    { value: 'colaba', label: 'Colaba' },
    { value: 'powai', label: 'Powai' },
    { value: 'dadar', label: 'Dadar' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'probability', label: 'Sort by Success Rate' },
    { value: 'location', label: 'Sort by Location' }
  ];

  const getStatusColor = (probability) => {
    if (probability >= 75) return 'text-success bg-success bg-opacity-10';
    if (probability >= 60) return 'text-warning bg-warning bg-opacity-10';
    return 'text-error bg-error bg-opacity-10';
  };

  const handleViewDetails = (id) => {
    navigate('/analysis-results');
  };

  const handleRerun = (id) => {
    navigate('/new-analysis');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          Previous Analysis History
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={locationOptions}
            value={filterLocation}
            onChange={setFilterLocation}
            placeholder="Filter by location"
            className="w-full sm:w-48"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
            className="w-full sm:w-48"
          />
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Location</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Cuisine</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Success Rate</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Est. Revenue</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {analysisHistory?.map((analysis) => (
              <tr key={analysis?.id} className="border-b border-border hover:bg-muted transition-colors">
                <td className="py-4 px-4 text-sm text-foreground">{analysis?.date}</td>
                <td className="py-4 px-4 text-sm text-foreground">{analysis?.location}</td>
                <td className="py-4 px-4 text-sm text-foreground">{analysis?.cuisine}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(analysis?.successProbability)}`}>
                    {analysis?.successProbability}%
                  </span>
                </td>
                <td className="py-4 px-4 text-sm font-medium text-foreground">{analysis?.revenue}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-success bg-success bg-opacity-10">
                    <Icon name="CheckCircle" size={14} />
                    {analysis?.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewDetails(analysis?.id)}
                      iconName="Eye"
                    >
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRerun(analysis?.id)}
                      iconName="RefreshCw"
                    >
                      Rerun
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      iconName="Download"
                    >
                      Export
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {analysisHistory?.map((analysis) => (
          <div key={analysis?.id} className="bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {analysis?.location}
                </h3>
                <p className="text-sm text-muted-foreground">{analysis?.date}</p>
              </div>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(analysis?.successProbability)}`}>
                {analysis?.successProbability}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cuisine</p>
                <p className="text-sm font-medium text-foreground">{analysis?.cuisine}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Est. Revenue</p>
                <p className="text-sm font-medium text-foreground">{analysis?.revenue}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                onClick={() => handleViewDetails(analysis?.id)}
                iconName="Eye"
              >
                View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                onClick={() => handleRerun(analysis?.id)}
                iconName="RefreshCw"
              >
                Rerun
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistoryTable;