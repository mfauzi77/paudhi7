import React, { useState, useMemo } from 'react';
import { ArrowPathIcon, HandThumbUpIcon, HandThumbDownIcon } from '../icons/Icons';
import FeedbackModal from './FeedbackModal';

const InsightContainer = ({
    title,
    icon,
    isLoading,
    content,
    error,
    onRegenerate,
    loadingText = "Generating insight...",
}) => {
    const [feedback, setFeedback] = useState(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    const parsedContent = useMemo(() => {
        if (!content) return { insight: '', justification: '' };
        const parts = content.split('### Dasar Analisis');
        return {
            insight: parts[0] || '',
            justification: parts[1] || '',
        };
    }, [content]);

    const handleFeedbackSubmit = (feedbackText) => {
        // In a real app, this feedbackText would be passed to the onRegenerate function
        console.log("Regenerating with feedback:", feedbackText);
        onRegenerate(feedbackText);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full w-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mr-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{loadingText}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-8">
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                    <button
                        onClick={() => onRegenerate()}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            );
        }

        if (!content) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Tidak ada insight tersedia</p>
                    <button
                        onClick={() => onRegenerate()}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors"
                    >
                        Generate Insight
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                    <div dangerouslySetInnerHTML={{ __html: parsedContent.insight.replace(/\n/g, '<br />') }} />
                </div>
                
                {parsedContent.justification && (
                    <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-white mb-2">Dasar Analisis</h4>
                        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400">
                            <div dangerouslySetInnerHTML={{ __html: parsedContent.justification.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                )}

                {/* Feedback Section */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Apakah insight ini membantu?</span>
                        <button
                            onClick={() => setFeedback('good')}
                            className={`p-1 rounded-full transition-colors ${
                                feedback === 'good' 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'text-slate-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                        >
                            <HandThumbUpIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setFeedback('bad')}
                            className={`p-1 rounded-full transition-colors ${
                                feedback === 'bad' 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                        >
                            <HandThumbDownIcon className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsFeedbackModalOpen(true)}
                            className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                        >
                            Berikan masukan
                        </button>
                        <button
                            onClick={() => onRegenerate()}
                            className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                        >
                            <ArrowPathIcon className="w-3 h-3 mr-1" />
                            Regenerate
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
                {icon}
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
            </div>
            
            <div className="min-h-[200px]">
                {renderContent()}
            </div>

            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                onSubmit={handleFeedbackSubmit}
                title="Berikan Masukan untuk Insight"
                placeholder="Apa yang bisa diperbaiki dari insight ini?"
            />
        </div>
    );
};

export default InsightContainer;


