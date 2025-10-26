import React from 'react';
import { CommandLineIcon } from '../icons/Icons';

const ProcessingLogs = () => {
    // Mock processing logs
    const processingLogs = [
        { timestamp: '2024-01-15 10:30:15', level: 'INFO', message: 'Data pipeline started successfully' },
        { timestamp: '2024-01-15 10:30:16', level: 'INFO', message: 'Connecting to Kemenkes API...' },
        { timestamp: '2024-01-15 10:30:18', level: 'INFO', message: 'Successfully fetched 1,250 records from Kemenkes' },
        { timestamp: '2024-01-15 10:30:20', level: 'INFO', message: 'Processing Dapodik data...' },
        { timestamp: '2024-01-15 10:30:22', level: 'WARN', message: 'Dapodik API response delayed by 2 seconds' },
        { timestamp: '2024-01-15 10:30:25', level: 'INFO', message: 'Successfully fetched 3,420 records from Dapodik' },
        { timestamp: '2024-01-15 10:30:28', level: 'INFO', message: 'Validating data integrity...' },
        { timestamp: '2024-01-15 10:30:30', level: 'INFO', message: 'Data validation completed - 99.8% records valid' },
        { timestamp: '2024-01-15 10:30:32', level: 'INFO', message: 'Recalculating risk scores...' },
        { timestamp: '2024-01-15 10:30:35', level: 'INFO', message: 'Risk scores updated for 34 provinces' },
        { timestamp: '2024-01-15 10:30:37', level: 'INFO', message: 'Generating alerts...' },
        { timestamp: '2024-01-15 10:30:40', level: 'INFO', message: 'Pipeline completed successfully' },
        { timestamp: '2024-01-15 10:30:41', level: 'INFO', message: 'Total processing time: 26 seconds' }
    ];

    const getLevelColor = (level) => {
        switch (level) {
            case 'INFO': return 'text-sky-600';
            case 'WARN': return 'text-amber-600';
            case 'ERROR': return 'text-red-600';
            default: return 'text-slate-600';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <CommandLineIcon className="w-6 h-6 mr-2 text-indigo-500" />
                Recent Processing Logs
            </h3>
            <div className="font-mono text-xs bg-slate-100 p-4 rounded-md flex-grow overflow-y-auto h-72 md:h-96">
                {processingLogs.map((log, index) => (
                    <div key={index} className="flex">
                        <span className="text-slate-500 mr-3">{log.timestamp}</span>
                        <span className={`font-bold w-12 ${getLevelColor(log.level)}`}>[{log.level}]</span>
                        <p className="flex-1 whitespace-pre-wrap text-slate-700">{log.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessingLogs;

