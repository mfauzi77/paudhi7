import React from 'react';
import InsightContainer from '../shared/InsightContainer';
import { LightBulbIcon } from '../icons/Icons';

const ExecutiveBriefing = ({ briefing, isLoading, error }) => {
    return (
        <InsightContainer
            title="AI Executive Briefing"
            icon={<LightBulbIcon className="w-6 h-6 mr-2 text-yellow-500" />}
            isLoading={isLoading}
            error={error}
            content={briefing}
            loadingText="AI sedang menganalisis data untuk Anda..."
        />
    );
};

export default ExecutiveBriefing;


