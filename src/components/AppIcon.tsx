import React from 'react';

export type AppIconName =
  | 'strategy_knight'
  | 'target_goal'
  | 'checklist_clipboard'
  | 'presentation_chart'
  | 'idea_bulb'
  | 'growth_chart'
  | 'calendar_clock'
  | 'time_clock'
  | 'operations_gear'
  | 'team_people'
  | 'org_chart'
  | 'workflow_process'
  | 'dashboard_laptop'
  | 'report_document'
  | 'data_analytics'
  | 'global_network'
  | 'raci_network'
  | 'database_shield'
  | 'partnership_handshake'
  | 'training_presenter'
  | 'folder_archive'
  | 'cloud_upload'
  | 'compliance_shield'
  | 'award_trophy'
  | 'audit_search'
  | 'edit_document'
  | 'binder_archive'
  | 'deadline_hourglass'
  | 'pdca_cycle'
  | 'task_schedule';

interface AppIconProps {
  name: AppIconName;
  className?: string;
  alt?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  className = 'w-5 h-5',
  alt = ''
}) => {
  return (
    <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Light version (visible on light, hidden on dark) */}
      <img
        src={`./icons/light/${name}.png`}
        alt={alt || name}
        className="w-full h-full object-contain dark:hidden transition-transform duration-200"
        loading="eager"
      />
      {/* Dark version (hidden on light, visible on dark) */}
      <img
        src={`./icons/dark/${name}.png`}
        alt={alt || name}
        className="w-full h-full object-contain hidden dark:block transition-transform duration-200"
        loading="eager"
      />
    </span>
  );
};
