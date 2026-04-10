import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportActionsBar = ({ onExportPDF, onExportCSV, onUpgrade, onNewAnalysis }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (type) => {
    setIsExporting(true);
    try {
      if (type === 'pdf') {
        await onExportPDF();
      } else {
        await onExportCSV();
      }
    } finally {
      setTimeout(() => setIsExporting(false), 1500);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-warm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="CheckCircle2" size={20} className="text-success" />
          </div>
          <div>
            <h4 className="text-base md:text-lg font-semibold text-foreground">
              Analysis Complete
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground">
              Export your report or start a new analysis
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            iconName="FileText"
            iconPosition="left"
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            loading={isExporting}
            className="flex-1 sm:flex-none"
          >
            Export PDF
          </Button>

          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex-1 sm:flex-none"
          >
            Export CSV
          </Button>

          <Button
            variant="default"
            iconName="PlusCircle"
            iconPosition="left"
            onClick={onNewAnalysis}
            className="flex-1 sm:flex-none"
          >
            New Analysis
          </Button>

          <Button
            variant="secondary"
            iconName="Crown"
            iconPosition="left"
            onClick={onUpgrade}
            className="flex-1 sm:flex-none"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportActionsBar;